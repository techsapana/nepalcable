import prisma from "@/lib/prisma";
import { uploadtocloudinary } from "@/src/services/uploadtocloudinary";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type CertificationPayload = {
  name: string;
};

const toApiCertification = (item: {
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

const parseCertificationPayload = (
  rawValue: FormDataEntryValue | null,
): CertificationPayload => {
  if (typeof rawValue !== "string") {
    throw new Error("Invalid certificate payload");
  }

  const payload = JSON.parse(rawValue) as Partial<CertificationPayload>;

  return {
    name: (payload.name ?? "").trim(),
  };
};

const isAllowedCertificateFile = (file: File) => {
  const mimeType = file.type.toLowerCase();

  if (mimeType === "application/pdf") {
    return true;
  }

  return mimeType.startsWith("image/");
};

export async function GET() {
  try {
    const certifications = await prisma.certifications.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: certifications.map(toApiCertification),
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
        message: "Failed to fetch certificates",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const certificate = parseCertificationPayload(formData.get("certificate"));

    if (!certificate.name) {
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
          message: "Certificate file is required",
        },
        { status: 400 },
      );
    }

    if (!isAllowedCertificateFile(file)) {
      return NextResponse.json(
        {
          success: false,
          message: "Only PDF or image files are allowed",
        },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploaded = await uploadtocloudinary(buffer, "certificates");

    const created = await prisma.certifications.create({
      data: {
        name: certificate.name,
        fileUrl: uploaded.secure_url,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: toApiCertification(created),
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create certificate",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
