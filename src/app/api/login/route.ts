import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type LoginBody = {
  username: string;
  password: string;
};

const parseLoginBody = async (request: Request): Promise<LoginBody> => {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/x-www-form-urlencoded")) {
    const body = await request.text();
    const params = new URLSearchParams(body);

    return {
      username: (params.get("username") ?? "").trim(),
      password: (params.get("password") ?? "").trim(),
    };
  }

  const parsed = (await request.json()) as Partial<LoginBody>;

  return {
    username: (parsed.username ?? "").trim(),
    password: (parsed.password ?? "").trim(),
  };
};

export async function POST(request: Request) {
  try {
    const { username, password } = await parseLoginBody(request);
    console.log(password);

    if (!username || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Username and password are required",
        },
        { status: 400 },
      );
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing JWT_SECRET env value",
        },
        { status: 500 },
      );
    }

    const loginRecord = await prisma.login.findUnique({
      where: { username },
    });

    if (!loginRecord) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials",
        },
        { status: 401 },
      );
    }

    const validPassword = await bcrypt.compare(
      password,
      loginRecord.passwordHash,
    );

    if (!validPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials",
        },
        { status: 401 },
      );
    }

    const token = jwt.sign({ sub: username, role: "admin" }, jwtSecret, {
      algorithm: "HS256",
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      data: token,
    });

    response.cookies.set({
      name: "adminToken",
      value: token,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to login",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
