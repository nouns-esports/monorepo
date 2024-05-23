import { NextRequest, NextResponse, userAgent } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.url === "/") {
    const { device } = userAgent(request);

    return NextResponse.next({
      headers: {
        "x-device-type": device.type === "mobile" ? "mobile" : "desktop",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next|frames).*)",
};
