import prisma from "@/lib/prisma";
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

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: blogs.map(toApiBlog),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch blogs",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
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

    const imageFile = getFirstImageFile(formData);

    if (!imageFile) {
      return NextResponse.json(
        {
          success: false,
          message: "Image is required",
        },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const result = await uploadtocloudinary(buffer, "blogs");

    const created = await prisma.blog.create({
      data: {
        title: blog.title,
        description: blog.description,
        content: blog.content,
        imageUrl: result.secure_url,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: toApiBlog(created),
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create blog",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
