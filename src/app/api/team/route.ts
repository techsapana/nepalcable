import prisma from "@/lib/prisma";
import { uploadtocloudinary } from "@/src/services/uploadtocloudinary";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type TeamPayload = {
  name: string;
  post: string;
  description: string;
};

const toApiMember = (member: {
  id: number;
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}) => ({
  id: member.id,
  name: member.name,
  post: member.role,
  description: member.description,
  image: member.imageUrl,
  createdAt: member.createdAt,
  updatedAt: member.updatedAt,
});

const parseMemberPayload = (
  rawValue: FormDataEntryValue | null,
): TeamPayload => {
  if (typeof rawValue !== "string") {
    throw new Error("Invalid member payload");
  }

  const parsed = JSON.parse(rawValue) as Partial<TeamPayload>;

  return {
    name: (parsed.name ?? "").trim(),
    post: (parsed.post ?? "").trim(),
    description: (parsed.description ?? "").trim(),
  };
};

export async function GET() {
  try {
    const members = await prisma.teamMember.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: members.map(toApiMember),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch team members",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const member = parseMemberPayload(formData.get("member"));

    if (!member.name || !member.post || !member.description) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, post and description are required",
        },
        { status: 400 },
      );
    }

    const imageFile = formData.get("image");
    let imageUrl = "";

    if (imageFile instanceof File && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const result = await uploadtocloudinary(buffer, "team");
      imageUrl = result.secure_url;
    }

    const created = await prisma.teamMember.create({
      data: {
        name: member.name,
        role: member.post,
        description: member.description,
        imageUrl,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: toApiMember(created),
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create team member",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
