import {
  ArrowFatDown,
  ArrowFatUp,
  CornersIn,
  CornersOut,
  Pause,
  Play,
  SpeakerHigh,
  SpeakerSimpleHigh,
  SpeakerSimpleX,
} from "phosphor-react-sc";
import Link from "./Link";
import type { CastWithInteractions } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import { LinkIt } from "react-linkify-it";
import RichText from "./RichText";
import type { Community } from "~/packages/db/schema";
import {
  ExternalLink,
  MessageSquare,
  MoreHorizontal,
  RefreshCcw,
} from "lucide-react";
import parseCastEmbed from "@/utils/parseCast";
import * as Player from "@livepeer/react/player";
import Spinner from "./Spinner";

export default async function CastCard(props: {
  cast: CastWithInteractions;
  topic?: Community;
}) {
  const embeds = parseCastEmbed(props.cast.embeds);
  return (
    <div className="relative flex gap-3 bg-grey-800 rounded-xl pl-2 pr-4 py-4">
      {/* <Link
        href={`/chat/${props.cast.hash.substring(0, 10)}`}
        className="w-full h-full absolute top-0 left-0 z-10"
      /> */}
      <Link
        href={`/users/${props.cast.author.username}`}
        className="ml-2 w-12 h-12 flex-shrink-0"
      >
        <img
          src={props.cast.author.pfp_url}
          className="w-full h-full rounded-full object-cover object-center"
        />
      </Link>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Link
              href={`/users/${props.cast.author.username}`}
              className="flex gap-2 items-center w-min hover:opacity-70 transition-opacity"
            >
              <h2 className="text-white text-nowrap">
                {props.cast.author.display_name}
              </h2>
            </Link>
            {props.topic ? (
              <>
                <span className="text-grey-400 font-semibold text-sm">in</span>
                <Link
                  href={`/chat?topic=${props.topic.id.substring(0, 10)}`}
                  className="flex items-center gap-1 bg-grey-600 hover:bg-grey-500 transition-colors rounded-full px-2 py-1"
                >
                  <img
                    src={props.topic.image}
                    className="w-4 h-4 rounded-full object-cover object-center"
                  />
                  <h2 className="text-white text-nowrap text-sm">
                    {props.topic.name}
                  </h2>
                </Link>
              </>
            ) : null}
          </div>
          <MoreHorizontal className="w-5 h-5 text-grey-400 hover:text-white transition-colors mr-2" />
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-white/85 w-fit">
            <RichText>
              {embeds.website
                ? props.cast.text.replace(embeds.website.url, "")
                : props.cast.text}
            </RichText>
          </p>
          {embeds.image ? (
            <div className="relative flex items-center justify-center mb-1 w-full max-h-[400px] overflow-hidden rounded-xl">
              <img
                src={embeds.image.url}
                className="blur-2xl brightness-[25%] absolute top-0 left-0 w-full object-cover h-full"
              />
              <img
                src={embeds.image.url}
                className="relative z-10 object-contain h-full"
              />
            </div>
          ) : (
            ""
          )}
          {embeds.website ? (
            <Link
              href={embeds.website.url}
              newTab
              className="relative aspect-video bg-black flex flex-col rounded-xl overflow-hidden group"
            >
              <img
                src={embeds.website.image}
                className="w-full group-hover:brightness-75 object-cover object-center transition-all"
              />
              <p className="flex items-center gap-2 pointer-events-none absolute bottom-2 left-2 text-white text-sm bg-black/70 rounded-md py-1 px-2">
                {embeds.website.title}
                <ExternalLink className="w-4 h-4" />
              </p>
            </Link>
          ) : null}
          {embeds.video ? (
            <Player.Root
              src={[
                {
                  type: "hls",
                  src: embeds.video.url as `${string}m3u8`,
                  mime: null,
                  width: null,
                  height: null,
                },
              ]}
              volume={0}
            >
              <Player.Container className="bg-[black] rounded-xl group overflow-hidden">
                <Player.Video title="Agent 327" className="w-full h-full" />
                <Player.LoadingIndicator className="w-full h-full flex items-center justify-center">
                  <Spinner className="text-white" />
                </Player.LoadingIndicator>
                <Player.Controls
                  className="pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 transition-opacity duration-150"
                  autoHide={0}
                >
                  <div className="absolute left-4 bottom-4 flex flex-col gap-2 w-[calc(100%_-_32px)]">
                    <Player.Seek className="h-5 flex items-center gap-2.5 select-none touch-none">
                      <Player.Track className="bg-white/70 relative flex-grow rounded-full h-1">
                        <Player.SeekBuffer className="absolute bg-black/50 rounded-full h-full" />
                        <Player.Range className="absolute bg-white rounded-full h-full" />
                      </Player.Track>
                      <Player.Thumb className="block w-3 h-3 bg-white rounded-full" />
                    </Player.Seek>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Player.PlayPauseTrigger>
                          <Player.PlayingIndicator asChild matcher={false}>
                            <Play
                              className="text-white h-6 w-6"
                              weight="fill"
                            />
                          </Player.PlayingIndicator>
                          <Player.PlayingIndicator asChild>
                            <Pause
                              className="text-white h-6 w-6"
                              weight="fill"
                            />
                          </Player.PlayingIndicator>
                        </Player.PlayPauseTrigger>
                        <Player.MuteTrigger className="w-6 h-6">
                          <Player.VolumeIndicator asChild matcher={false}>
                            <SpeakerSimpleX
                              className="text-white h-6 w-6"
                              weight="fill"
                            />
                          </Player.VolumeIndicator>
                          <Player.VolumeIndicator asChild matcher={true}>
                            <SpeakerSimpleHigh
                              className="text-white h-6 w-6"
                              weight="fill"
                            />
                          </Player.VolumeIndicator>
                        </Player.MuteTrigger>
                        <Player.Volume className="relative flex flex-grow h-5 items-center max-w-24 w-24 touch-none select-none">
                          <Player.Track className="bg-white/70 relative flex-grow rounded-full h-1">
                            <Player.Range className="absolute bg-white rounded-full h-full" />
                          </Player.Track>
                          <Player.Thumb className="block w-3 h-3 bg-white rounded-full" />
                        </Player.Volume>
                      </div>
                      <Player.FullscreenTrigger>
                        <Player.FullscreenIndicator asChild matcher={false}>
                          <CornersOut
                            className="text-white h-7 w-7"
                            weight="bold"
                          />
                        </Player.FullscreenIndicator>
                        <Player.FullscreenIndicator asChild>
                          <CornersIn
                            className="text-white h-7 w-7"
                            weight="bold"
                          />
                        </Player.FullscreenIndicator>
                      </Player.FullscreenTrigger>
                    </div>
                  </div>
                </Player.Controls>
              </Player.Container>
            </Player.Root>
          ) : null}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-grey-200 hover:text-white transition-colors  " />
              <RefreshCcw className="w-5 h-5 text-grey-200 hover:text-white transition-colors" />
              <ArrowFatUp className="w-5 h-5 text-grey-200 hover:text-red transition-colors" />
            </div>
            <div className="flex items-center gap-2 text-sm text-grey-200">
              <p>{props.cast.replies.count} comments</p>
              <p>{props.cast.reactions.likes_count} upvotes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="relative flex gap-4 bg-grey-800 group hover:bg-grey-600 transition-colors rounded-xl px-4 pt-4 h-28">
  //     <Link
  //       href={`/chat/${props.cast.hash.substring(0, 10)}`}
  //       className="w-full h-full absolute top-0 left-0 z-10"
  //     />
  //     <div className="flex gap-4 z-20 relative pointer-events-none w-full">
  //       <div className="flex flex-col items-center gap-2 h-full justify-center pointer-events-auto">
  //         <ArrowFatUp
  //           className="w-[18px] text-grey-500 hover:text-red transition-colors"
  //           weight="fill"
  //         />
  //         {props.cast.reactions.likes_count}
  //         <ArrowFatDown
  //           className="w-[18px] text-grey-500 hover:text-red transition-colors mb-4"
  //           weight="fill"
  //         />
  //       </div>
  //       <div className="relative flex flex-col gap-2 w-full overflow-hidden">
  //         <Link
  //           href={`/users/${props.cast.author.username}`}
  //           className="flex gap-2 items-center w-min pointer-events-auto"
  //         >
  //           <img
  //             src={props.cast.author.pfp_url}
  //             className="w-4 h-4 rounded-full"
  //           />
  //           <h2 className="text-white text-nowrap">
  //             {props.cast.author.display_name}
  //           </h2>
  //         </Link>
  //         <p className="text-grey-200 pointer-events-auto w-fit">
  //           <RichText>{props.cast.text}</RichText>
  //         </p>
  //         <div className="absolute w-full bg-gradient-to-t from-grey-800 group-hover:from-grey-600 to-transparent h-10 bottom-0" />
  //       </div>
  //       {image ? (
  //         <Link
  //           href={`https://warpcast.com/${props.cast.author.username}/${props.cast.hash.substring(0, 10)}`}
  //           className="relative h-[calc(100%_-_16px)] aspect-video rounded-lg overflow-hidden pointer-events-auto"
  //         >
  //           <img
  //             src={image}
  //             className="h-full w-full object-cover object-center"
  //           />
  //           <div className="absolute w-full h-full top-0 left-0 bg-black opacity-0 hover:opacity-30 transition-opacity" />
  //         </Link>
  //       ) : (
  //         ""
  //       )}
  //     </div>
  //   </div>
  // );
}
