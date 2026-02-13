import { verify } from "@/api/authentication";
import { type NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Token is required" }, { status: 400 });
  }

  try {
    const res = await verify({ token: token });
  } catch (error) {
    return NextResponse.json(
      // @ts-ignore
      { error: error?.message || "Internal Server Error" },
      { status: 500 },
    );
  }
  redirect("/verify/successful");
}
