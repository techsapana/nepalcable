import prisma from "@/lib/prisma";
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

export async function GET() {
  try {
    const partners = await prisma.partner.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: partners.map(toApiPartner),
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
        message: "Failed to fetch partners",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
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

    const imageFile = formData.get("image");

    if (!(imageFile instanceof File) || imageFile.size <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Image is required",
        },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const uploaded = await uploadtocloudinary(buffer, "partners");

    const created = await prisma.partner.create({
      data: {
        name: partner.name,
        imageUrl: uploaded.secure_url,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: toApiPartner(created),
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create partner",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
