import prisma from "@/lib/prisma";
import cloudinary from "@/src/services/cloudinary";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const parseId = (value: string) => {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error("Invalid brochure id");
  }

  return parsed;
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

  await Promise.allSettled([
    cloudinary.uploader.destroy(publicId),
    cloudinary.uploader.destroy(publicId, { resource_type: "raw" }),
  ]);
};

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const brochureId = parseId(id);

    const existing = await prisma.brochure.findUnique({
      where: { id: brochureId },
    });

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          message: "Brochure not found",
        },
        { status: 404 },
      );
    }

    await prisma.brochure.delete({
      where: { id: brochureId },
    });

    await deleteCloudinaryFile(existing.fileUrl);

    return NextResponse.json({
      success: true,
      message: "Brochure deleted",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete brochure",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
