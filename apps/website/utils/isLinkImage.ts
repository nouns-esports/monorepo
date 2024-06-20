export async function isLinkImage(link: string) {
  try {
    const response = await fetch(link, { method: "HEAD" });
    const contentType = response.headers.get("Content-Type");
    return contentType && contentType.startsWith("image/");
  } catch (error) {}

  return false;
}
