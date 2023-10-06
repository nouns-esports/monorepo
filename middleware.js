import { userAgent } from "next/server";
import { i18nRouter } from "next-i18n-router";
import i18nConfig from "./i18nConfig";

export function middleware(request) {
  let i18nRequest = i18nRouter(request, i18nConfig);

  // Get the device type
  const device = getDevice(request);
  i18nRequest.headers.set("x-device-type", device);

  return i18nRequest;
}

// only apply this middleware to files in the app directory
export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};

function getDevice(request) {
  const { device } = userAgent(request);

  return device.type === "mobile" ? "mobile" : "desktop";
}
