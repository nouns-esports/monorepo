import { env } from "~/env";
import { unstable_cache as cache } from "next/cache";

export type Video = {
  snippet: any;
};

export const getVideos = cache(
  async () => {
    const response = await fetch(
      "https://www.googleapis.com/youtube/v3/playlistItems?" +
        new URLSearchParams({
          key: env.GOOGLE_API_KEY,
          playlistId: "PL1TvZNBv-He36ROcHf1PP4G15KdIq8s_K",
          part: "snippet",
        })
    );

    const videos = (await response.json()).items as Video[];

    return videos.map((video) => ({
      id: video.snippet.resourceId.videoId,
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails.medium.url,
      publishedAt: video.snippet.publishedAt,
    }));
  },
  ["videos"],
  { revalidate: 60 * 10 }
);
