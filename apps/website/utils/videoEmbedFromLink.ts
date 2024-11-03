export function videoEmbedFromLink(link: string) {
  try {
    const url = new URL(link);

    // User Input: https://clips.twitch.tv/BlueExquisiteBaconHeyGuys-vynEsLJMItjIbj9m
    // Output: https://clips.twitch.tv/embed?clip=BlueExquisiteBaconHeyGuys-vynEsLJMItjIbj9m&parent=nouns.gg
    if (url.hostname.includes("clips.twitch.tv")) {
      if (url.pathname.length > 1)
        return `https://clips.twitch.tv/embed?clip=${url.pathname.replace("/", "")}`;
    }

    // User Input: https://www.youtube.com/watch?v=sqRntu1k6AE
    // Output: https://www.youtube.com/embed/sqRntu1k6AE
    if (url.hostname.includes("youtube.com")) {
      if (url.searchParams.get("v") !== null) {
        return `https://www.youtube.com/embed/${url.searchParams.get("v")}`;
      }
    }

    // User Input: https://drive.google.com/file/d/1obXK4mr1yTVS7ruAWba__6k6D5b_ORgs/view
    // Output: https://drive.google.com/file/d/1obXK4mr1yTVS7ruAWba__6k6D5b_ORgs/preview
    if (url.hostname.includes("drive.google.com")) {
      return link.replace("/view", "/preview").split("?")[0];
    }
  } catch {}
}
