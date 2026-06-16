import prisma from "@/lib/prisma";
import cloudinary from "@/src/services/cloudinary";
import { uploadtocloudinary } from "@/src/services/uploadtocloudinary";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type BlogPayload = {
  title: string;
  description: string;
  content: string;
};

const toApiBlog = (blog: {
  id: number;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}) => ({
  id: blog.id,
  title: blog.title,
  description: blog.description,
  content: blog.content,
  imageUrl: blog.imageUrl,
  image: blog.imageUrl,
  images: blog.imageUrl ? [blog.imageUrl] : [],
  createdAt: blog.createdAt,
  updatedAt: blog.updatedAt,
});

const parseId = (value: string) => {
  const rawId = value.trim();

  if (!rawId) {
    throw new Error("Invalid blog id");
  }

  const id = Number(rawId);

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid blog id");
  }

  return id;
};

const parseBlogPayload = (rawValue: FormDataEntryValue | null): BlogPayload => {
  if (typeof rawValue !== "string") {
    throw new Error("Invalid blog payload");
  }

  const parsed = JSON.parse(rawValue) as Partial<BlogPayload>;

  return {
    title: (parsed.title ?? "").trim(),
    description: (parsed.description ?? "").trim(),
    content: (parsed.content ?? "").trim(),
  };
};

const getFirstImageFile = (formData: FormData) => {
  const files = formData.getAll("images");

  for (const value of files) {
    if (value instanceof File && value.size > 0) {
      return value;
    }
  }

  const singleImage = formData.get("image");
  if (singleImage instanceof File && singleImage.size > 0) {
    return singleImage;
  }

  return null;
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

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const blogId = parseId(id);

    const blog = await prisma.blog.findUnique({
      where: { id: blogId },
    });

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: toApiBlog(blog),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch blog",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const blogId = parseId(id);
    const formData = await request.formData();
    const blog = parseBlogPayload(formData.get("blog"));

    if (!blog.title || !blog.description || !blog.content) {
      return NextResponse.json(
        {
          success: false,
          message: "Title, description and content are required",
        },
        { status: 400 },
      );
    }

    const existing = await prisma.blog.findUnique({
      where: { id: blogId },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 },
      );
    }

    let nextImageUrl = existing.imageUrl;
    const imageFile = getFirstImageFile(formData);

    if (imageFile) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const result = await uploadtocloudinary(buffer, "blogs");
      nextImageUrl = result.secure_url;
    }

    const updated = await prisma.blog.update({
      where: { id: blogId },
      data: {
        title: blog.title,
        description: blog.description,
        content: blog.content,
        imageUrl: nextImageUrl,
      },
    });

    if (nextImageUrl !== existing.imageUrl) {
      await deleteCloudinaryFile(existing.imageUrl);
    }

    return NextResponse.json({
      success: true,
      data: toApiBlog(updated),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update blog",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const blogId = parseId(id);

    const existing = await prisma.blog.findUnique({
      where: { id: blogId },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 },
      );
    }

    await prisma.blog.delete({
      where: { id: blogId },
    });

    await deleteCloudinaryFile(existing.imageUrl);

    return NextResponse.json({
      success: true,
      message: "Blog deleted",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete blog",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
