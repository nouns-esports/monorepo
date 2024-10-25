import { ArrowFatDown, ArrowFatUp } from "phosphor-react-sc";
import Link from "./Link";
import type { CastWithInteractions } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import { LinkIt } from "react-linkify-it";
import RichText from "./RichText";

export default async function CastCard(props: { cast: CastWithInteractions }) {
  let image = "";

  for (const embed of props.cast.embeds) {
    if ("url" in embed && "metadata" in embed) {
      if (embed.metadata?.content_type === "image/jpeg") {
        image = embed.url;
        break;
      }
    }
  }

  return (
    <div className="relative flex gap-4 bg-grey-800 group hover:bg-grey-600 transition-colors rounded-xl px-4 pt-4 h-28">
      <Link
        href={`https://warpcast.com/${props.cast.author.username}/${props.cast.hash.substring(0, 10)}`}
        newTab
        className="w-full h-full absolute top-0 left-0 z-10"
      />
      <div className="flex gap-4 z-20 relative pointer-events-none w-full">
        <div className="flex flex-col items-center gap-2 h-full justify-center pointer-events-auto">
          <ArrowFatUp
            className="w-[18px] text-grey-500 hover:text-red transition-colors"
            weight="fill"
          />
          {props.cast.reactions.likes_count}
          <ArrowFatDown
            className="w-[18px] text-grey-500 hover:text-red transition-colors mb-4"
            weight="fill"
          />
        </div>
        <div className="relative flex flex-col gap-2 w-full overflow-hidden">
          <Link
            href={`/users/${props.cast.author.username}`}
            className="flex gap-2 items-center w-min  pointer-events-auto"
          >
            <img
              src={props.cast.author.pfp_url}
              className="w-4 h-4 rounded-full"
            />
            <h2 className="text-white text-nowrap">
              {props.cast.author.display_name}
            </h2>
          </Link>
          <p className="text-grey-200 pointer-events-auto">
            <RichText>{props.cast.text}</RichText>
          </p>
          <div className="absolute w-full bg-gradient-to-t from-grey-800 group-hover:from-grey-600 to-transparent h-10 bottom-0" />
        </div>
        {image ? (
          <Link
            href={`https://warpcast.com/${props.cast.author.username}/${props.cast.hash.substring(0, 10)}`}
            className="relative h-[calc(100%_-_16px)] aspect-video rounded-lg overflow-hidden pointer-events-auto"
          >
            <img
              src={image}
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute w-full h-full top-0 left-0 bg-black opacity-0 hover:opacity-30 transition-opacity" />
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
