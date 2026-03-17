import prisma from "@/lib/prisma";
import cloudinary from "@/src/services/cloudinary";
import { uploadtocloudinary } from "@/src/services/uploadtocloudinary";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type GalleryPayload = {
  id?: number;
  title: string;
};

const parseGalleryPayload = (
  rawValue: FormDataEntryValue | null,
): GalleryPayload => {
  if (typeof rawValue !== "string") {
    throw new Error("Invalid gallery payload");
  }

  const parsed = JSON.parse(rawValue) as Partial<GalleryPayload>;

  return {
    id: parsed.id,
    title: (parsed.title ?? "").trim(),
  };
};

const extractImageFiles = (formData: FormData) => {
  const values = formData.getAll("images");
  return values.filter(
    (value): value is File => value instanceof File && value.size > 0,
  );
};

const extractPublicIdFromUrl = (fileUrl: string) => {
  const marker = "/upload/";
  const markerIndex = fileUrl.indexOf(marker);

  if (markerIndex === -1) {
    return null;
  }

  const pathWithVersion = fileUrl.slice(markerIndex + marker.length);
  const cleaned = pathWithVersion.replace(/^v\d+\//, "");
  const dotIndex = cleaned.lastIndexOf(".");

  if (dotIndex === -1) {
    return cleaned;
  }

  return cleaned.slice(0, dotIndex);
};

const deleteCloudinaryFile = async (fileUrl: string) => {
  const publicId = extractPublicIdFromUrl(fileUrl);

  if (!publicId) {
    return;
  }

  try {
    await cloudinary.uploader.destroy(publicId);
  } catch {
    // Ignore Cloudinary delete failures.
  }
};

export async function GET() {
  try {
    const galleries = await prisma.gallery.findMany({
      include: {
        images: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(galleries);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch galleries",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const gallery = parseGalleryPayload(formData.get("gallery"));
    const imageFiles = extractImageFiles(formData);

    if (!gallery.title) {
      return NextResponse.json(
        {
          success: false,
          message: "Title is required",
        },
        { status: 400 },
      );
    }

    if (imageFiles.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "At least one image is required",
        },
        { status: 400 },
      );
    }

    const uploadResults = await Promise.all(
      imageFiles.map(async (file) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        return uploadtocloudinary(buffer, "gallery");
      }),
    );

    const created = await prisma.gallery.create({
      data: {
        title: gallery.title,
        images: {
          create: uploadResults.map((item) => ({ url: item.secure_url })),
        },
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create gallery",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const formData = await request.formData();
    const gallery = parseGalleryPayload(formData.get("gallery"));
    const imageFiles = extractImageFiles(formData);

    const galleryId = Number(gallery.id);

    if (!Number.isInteger(galleryId) || galleryId <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Valid gallery id is required",
        },
        { status: 400 },
      );
    }

    if (!gallery.title) {
      return NextResponse.json(
        {
          success: false,
          message: "Title is required",
        },
        { status: 400 },
      );
    }

    const existing = await prisma.gallery.findUnique({
      where: { id: galleryId },
      include: { images: true },
    });

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          message: "Gallery not found",
        },
        { status: 404 },
      );
    }

    let uploadedImageUrls: string[] = [];

    if (imageFiles.length > 0) {
      const uploadResults = await Promise.all(
        imageFiles.map(async (file) => {
          const buffer = Buffer.from(await file.arrayBuffer());
          return uploadtocloudinary(buffer, "gallery");
        }),
      );

      uploadedImageUrls = uploadResults.map((item) => item.secure_url);
    }

    const updated = await prisma.gallery.update({
      where: { id: galleryId },
      data: {
        title: gallery.title,
        images:
          uploadedImageUrls.length > 0
            ? {
                create: uploadedImageUrls.map((url) => ({ url })),
              }
            : undefined,
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update gallery",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));

    if (!Number.isInteger(id) || id <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Valid id query parameter is required",
        },
        { status: 400 },
      );
    }

    const existing = await prisma.gallery.findUnique({
      where: { id },
      include: {
        images: true,
      },
    });

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          message: "Gallery not found",
        },
        { status: 404 },
      );
    }

    await prisma.gallery.delete({
      where: { id },
    });

    await Promise.all(
      existing.images.map((image) => deleteCloudinaryFile(image.url)),
    );

    return NextResponse.json({
      success: true,
      message: "Gallery deleted",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete gallery",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
