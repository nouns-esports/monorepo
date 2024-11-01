import type { CastWithInteractions } from "@neynar/nodejs-sdk/build/neynar-api/v2";

type ImageEmbed = { url: string; width: number; height: number };
type VideoEmbed = {
  url: string;
  duration: number;
};
type WebsiteEmbed = {
  url: string;
  image: string;
  title: string;
};
type FrameEmbed = { url: string; image: string };

type CastEmbed = {
  cast: CastWithInteractions;
  embeds: {
    image: ImageEmbed;
    video: VideoEmbed;
    website: WebsiteEmbed;
    frame: FrameEmbed;
  };
};

export default function parseCastEmbed(embeds: CastWithInteractions["embeds"]) {
  let image: ImageEmbed | undefined;
  let video: VideoEmbed | undefined;
  let website: WebsiteEmbed | undefined;
  let frame: FrameEmbed | undefined;
  let cast: CastEmbed | undefined;

  for (const embed of embeds) {
    if ("url" in embed) {
      if (embed.metadata) {
        if (embed.metadata.image) {
          image = {
            url: embed.url,
            width: embed.metadata.image.width_px ?? 0,
            height: embed.metadata.image.height_px ?? 0,
          };
        }

        if (embed.metadata.video) {
          video = {
            url: embed.url,
            duration: embed.metadata.video.duration_s ?? 0,
          };
        }

        if (
          embed.metadata.html &&
          embed.metadata.html.ogTitle &&
          embed.metadata.html.ogImage
        ) {
          website = {
            url: embed.url,
            image: embed.metadata.html.ogImage[0].url,
            title: embed.metadata.html.ogTitle,
          };
        }
      }
    }
  }

  return { image, video, website, frame };
}
