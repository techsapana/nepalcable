import prisma from "@/lib/prisma";
import cloudinary from "@/src/services/cloudinary";
import { uploadtocloudinary } from "@/src/services/uploadtocloudinary";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type NoticePayload = {
  title: string;
  content: string;
  published: boolean;
};

const toApiNotice = (notice: {
  id: number;
  title: string;
  content: string;
  imageUrl: string | null;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}) => ({
  id: notice.id,
  title: notice.title,
  content: notice.content,
  imageUrl: notice.imageUrl,
  published: notice.published,
  createdAt: notice.createdAt,
  updatedAt: notice.updatedAt,
});

const parseId = (value: string) => {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error("Invalid notice id");
  }

  return parsed;
};

const parseNoticePayload = (
  rawValue: FormDataEntryValue | null,
): NoticePayload => {
  if (typeof rawValue !== "string") {
    throw new Error("Invalid notice payload");
  }

  const parsed = JSON.parse(rawValue) as Partial<NoticePayload>;

  return {
    title: (parsed.title ?? "").trim(),
    content: (parsed.content ?? "").trim(),
    published: Boolean(parsed.published),
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
    const noticeId = parseId(id);

    const notice = await prisma.notice.findUnique({
      where: { id: noticeId },
    });

    if (!notice) {
      return NextResponse.json(
        { success: false, message: "Notice not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: toApiNotice(notice),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch notice",
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
    const noticeId = parseId(id);
    const formData = await request.formData();
    const notice = parseNoticePayload(formData.get("notice"));

    if (!notice.title || !notice.content) {
      return NextResponse.json(
        {
          success: false,
          message: "Title and content are required",
        },
        { status: 400 },
      );
    }

    const existing = await prisma.notice.findUnique({
      where: { id: noticeId },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Notice not found" },
        { status: 404 },
      );
    }

    let nextImageUrl = existing.imageUrl;
    const imageFile = formData.get("image");

    if (imageFile instanceof File && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const result = await uploadtocloudinary(buffer, "notice");
      nextImageUrl = result.secure_url;
    }

    const updated = await prisma.notice.update({
      where: { id: noticeId },
      data: {
        title: notice.title,
        content: notice.content,
        published: notice.published,
        imageUrl: nextImageUrl,
      },
    });

    if (nextImageUrl !== existing.imageUrl && existing.imageUrl) {
      await deleteCloudinaryFile(existing.imageUrl);
    }

    return NextResponse.json({
      success: true,
      data: toApiNotice(updated),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update notice",
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
    const noticeId = parseId(id);

    const existing = await prisma.notice.findUnique({
      where: { id: noticeId },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Notice not found" },
        { status: 404 },
      );
    }

    await prisma.notice.delete({
      where: { id: noticeId },
    });

    if (existing.imageUrl) {
      await deleteCloudinaryFile(existing.imageUrl);
    }

    return NextResponse.json({
      success: true,
      message: "Notice deleted",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete notice",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
