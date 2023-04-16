import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import crypto from "crypto";

export default async function downloadImage(url: string) {
  if (process.env.NODE_ENV === "development") return url;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to download image: ${response.status} ${response.statusText}`
    );
  }

  const urlObject = new URL(url);

  const filename = crypto
    .createHash("sha256")
    .update(urlObject.pathname)
    .digest("hex");

  const extension = urlObject.pathname.split(".").pop();

  const buffer = await response.buffer();

  fs.writeFileSync(
    path.join(process.cwd(), "dist", `${filename}.${extension}`),
    buffer
  );

  return `${filename}.${extension}`;
}
