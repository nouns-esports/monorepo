import { i18nRouter } from "next-i18n-router";
import i18nConfig from "./i18nConfig";
import { NextRequest, userAgent } from "next/server";

export function middleware(request: NextRequest) {
  const { device } = userAgent(request);

  const viewport = device.type === "mobile" ? "mobile" : "desktop";

  const response = i18nRouter(request, i18nConfig);

  response.headers.set("x-device-type", viewport);

  return response;
}

// only apply this middleware to files in the app directory
// export const config = {
//   matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
// };
