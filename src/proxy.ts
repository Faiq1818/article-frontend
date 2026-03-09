import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("session_token")?.value;

  try {
    const verifyResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Cookie: `session_token=${token}`,
        },
      },
    );

    if (!verifyResponse.ok) {
      const response = NextResponse.redirect(
        new URL("/auth/login", request.url),
      );
      response.cookies.delete("session_token");
      return response;
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
  }
}

export const config = {
  matcher: [
    "/admin/dashboard/article",
    "/admin/dashboard/article/addarticle",
    "/admin/dashboard/article/editarticle",
  ],
};
