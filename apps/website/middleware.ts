import { NextRequest, NextResponse, userAgent } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const { device } = userAgent(request);

  response.headers.set(
    "x-device-type",
    device.type === "mobile" ? "mobile" : "desktop"
  );

  return response;
}

// only apply this middleware to files in the app directory
export const config = {
  matcher: "/((?!api|static|.*\\..*|_next|frames|refresh).*)",
};
