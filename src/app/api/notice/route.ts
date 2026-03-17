import prisma from "@/lib/prisma";
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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const onlyPublished = searchParams.get("published") === "true";

    const notices = await prisma.notice.findMany({
      where: onlyPublished ? { published: true } : undefined,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: notices.map(toApiNotice),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch notices",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
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

    const imageFile = formData.get("image");
    let imageUrl: string | null = null;

    if (imageFile instanceof File && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const result = await uploadtocloudinary(buffer, "notice");
      imageUrl = result.secure_url;
    }

    const created = await prisma.notice.create({
      data: {
        title: notice.title,
        content: notice.content,
        published: notice.published,
        imageUrl,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: toApiNotice(created),
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create notice",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
