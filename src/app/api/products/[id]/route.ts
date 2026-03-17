import prisma from "@/lib/prisma";
import cloudinary from "@/src/services/cloudinary";
import { uploadtocloudinary } from "@/src/services/uploadtocloudinary";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ProductPayload = {
  name: string;
  description: string;
  price: number;
};

const toApiProduct = (product: {
  id: number;
  name: string;
  description: string;
  price: number;
  images: Array<{ id: number; url: string; productId: number }>;
  createdAt: Date;
  updatedAt: Date;
}) => ({
  id: product.id,
  name: product.name,
  description: product.description,
  price: product.price,
  images: product.images,
  createdAt: product.createdAt,
  updatedAt: product.updatedAt,
});

const parseId = (value: string) => {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error("Invalid product id");
  }

  return parsed;
};

const parseProductPayload = (
  rawValue: FormDataEntryValue | null,
): ProductPayload => {
  if (typeof rawValue !== "string") {
    throw new Error("Invalid product payload");
  }

  const parsed = JSON.parse(rawValue) as Partial<ProductPayload>;

  return {
    name: (parsed.name ?? "").trim(),
    description: (parsed.description ?? "").trim(),
    price: Number(parsed.price ?? 0),
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

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const productId = parseId(id);

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        images: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: toApiProduct(product),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch product",
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
    const productId = parseId(id);

    const formData = await request.formData();
    const product = parseProductPayload(formData.get("product"));
    const imageFiles = extractImageFiles(formData);

    if (!product.name || !product.description) {
      return NextResponse.json(
        {
          success: false,
          message: "Name and description are required",
        },
        { status: 400 },
      );
    }

    if (!Number.isFinite(product.price) || product.price < 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Valid price is required",
        },
        { status: 400 },
      );
    }

    const existing = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        images: true,
      },
    });

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 },
      );
    }

    let uploadedImageUrls: string[] = [];

    if (imageFiles.length > 0) {
      const uploadResults = await Promise.all(
        imageFiles.map(async (file) => {
          const buffer = Buffer.from(await file.arrayBuffer());
          return uploadtocloudinary(buffer, "products");
        }),
      );

      uploadedImageUrls = uploadResults.map((item) => item.secure_url);
    }

    const updated = await prisma.product.update({
      where: { id: productId },
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
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

    return NextResponse.json({
      success: true,
      data: toApiProduct(updated),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update product",
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
    const productId = parseId(id);

    const existing = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        images: true,
      },
    });

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 },
      );
    }

    await prisma.product.delete({
      where: { id: productId },
    });

    await Promise.all(
      existing.images.map((image) => deleteCloudinaryFile(image.url)),
    );

    return NextResponse.json({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete product",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
