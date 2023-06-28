import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import crypto from "crypto";

export default async function downloadImage(url: string) {
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

  // Make sure the cache/images directory exists
  const directory = path.join(process.cwd(), "cache", "images");
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  fs.writeFileSync(path.join(directory, `${filename}.${extension}`), buffer);

  return `/cache/images/${filename}.${extension}`;
}
