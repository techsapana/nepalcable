import prisma from "@/lib/prisma";
import { uploadtocloudinary } from "@/src/services/uploadtocloudinary";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type BrochurePayload = {
  name: string;
};

const toApiBrochure = (item: {
  id: number;
  name: string;
  fileUrl: string;
  createdAt: Date;
  updatedAt: Date;
}) => ({
  id: item.id,
  name: item.name,
  fileUrl: item.fileUrl,
  createdAt: item.createdAt,
  updatedAt: item.updatedAt,
});

const parseBrochurePayload = (
  rawValue: FormDataEntryValue | null,
): BrochurePayload => {
  if (typeof rawValue !== "string") {
    throw new Error("Invalid brochure payload");
  }

  const payload = JSON.parse(rawValue) as Partial<BrochurePayload>;

  return {
    name: (payload.name ?? "").trim(),
  };
};

const isAllowedBrochureFile = (file: File) => {
  const mimeType = file.type.toLowerCase();

  if (mimeType === "application/pdf") {
    return true;
  }

  return mimeType.startsWith("image/");
};

export async function GET() {
  try {
    const brochures = await prisma.brochure.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: brochures.map(toApiBrochure),
      },
      {
        headers: {
          "Cache-Control":
            "public, max-age=60, s-maxage=60, stale-while-revalidate=120",
        },
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch brochures",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const brochure = parseBrochurePayload(formData.get("brochure"));

    if (!brochure.name) {
      return NextResponse.json(
        {
          success: false,
          message: "Name is required",
        },
        { status: 400 },
      );
    }

    const file = formData.get("file");

    if (!(file instanceof File) || file.size <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Brochure file is required",
        },
        { status: 400 },
      );
    }

    if (!isAllowedBrochureFile(file)) {
      return NextResponse.json(
        {
          success: false,
          message: "Only PDF or image files are allowed",
        },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploaded = await uploadtocloudinary(buffer, "brochures");

    const created = await prisma.brochure.create({
      data: {
        name: brochure.name,
        fileUrl: uploaded.secure_url,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: toApiBrochure(created),
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create brochure",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
