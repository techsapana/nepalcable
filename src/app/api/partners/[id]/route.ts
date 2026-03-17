import prisma from "@/lib/prisma";
import cloudinary from "@/src/services/cloudinary";
import { uploadtocloudinary } from "@/src/services/uploadtocloudinary";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type PartnerPayload = {
  name: string;
};

const toApiPartner = (partner: {
  id: number;
  name: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}) => ({
  id: partner.id,
  name: partner.name,
  imageUrl: partner.imageUrl,
  createdAt: partner.createdAt,
  updatedAt: partner.updatedAt,
});

const parseId = (value: string) => {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error("Invalid partner id");
  }

  return parsed;
};

const parsePartnerPayload = (
  rawValue: FormDataEntryValue | null,
): PartnerPayload => {
  if (typeof rawValue !== "string") {
    throw new Error("Invalid partner payload");
  }

  const payload = JSON.parse(rawValue) as Partial<PartnerPayload>;

  return {
    name: (payload.name ?? "").trim(),
  };
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
    const partnerId = parseId(id);

    const partner = await prisma.partner.findUnique({
      where: { id: partnerId },
    });

    if (!partner) {
      return NextResponse.json(
        {
          success: false,
          message: "Partner not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: toApiPartner(partner),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch partner",
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
    const partnerId = parseId(id);

    const formData = await request.formData();
    const partner = parsePartnerPayload(formData.get("partner"));

    if (!partner.name) {
      return NextResponse.json(
        {
          success: false,
          message: "Name is required",
        },
        { status: 400 },
      );
    }

    const existing = await prisma.partner.findUnique({
      where: { id: partnerId },
    });

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          message: "Partner not found",
        },
        { status: 404 },
      );
    }

    let nextImageUrl = existing.imageUrl;
    const imageFile = formData.get("image");

    if (imageFile instanceof File && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const uploaded = await uploadtocloudinary(buffer, "partners");
      nextImageUrl = uploaded.secure_url;
    }

    const updated = await prisma.partner.update({
      where: { id: partnerId },
      data: {
        name: partner.name,
        imageUrl: nextImageUrl,
      },
    });

    if (nextImageUrl !== existing.imageUrl) {
      await deleteCloudinaryFile(existing.imageUrl);
    }

    return NextResponse.json({
      success: true,
      data: toApiPartner(updated),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update partner",
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
    const partnerId = parseId(id);

    const existing = await prisma.partner.findUnique({
      where: { id: partnerId },
    });

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          message: "Partner not found",
        },
        { status: 404 },
      );
    }

    await prisma.partner.delete({
      where: { id: partnerId },
    });

    await deleteCloudinaryFile(existing.imageUrl);

    return NextResponse.json({
      success: true,
      message: "Partner deleted",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete partner",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
