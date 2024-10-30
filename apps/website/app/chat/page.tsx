import CastCard from "@/components/CastCard";
import { getCommunities } from "@/server/queries/communities";
import { getFeed } from "@/server/queries/farcaster";
import Button from "@/components/Button";
import { ChevronDown } from "lucide-react";

export default async function Chat(props: {
  searchParams: { topic?: string };
}) {
  const communities = await getCommunities({
    ids: [
      "dota",
      "cs",
      "smash",
      "nouns-esports",
      "nounsfe",
      "pokemon",
      "rocketleague",
    ],
  });

  const topic = communities.find((c) => c.id === props.searchParams?.topic);

  const feed = await getFeed({
    channels: topic?.channels ?? communities.map((c) => c.channels).flat(),
  });

  return (
    <div className="flex flex-col items-center w-full pt-32 max-xl:pt-28 max-sm:pt-20 px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
      <div className="flex flex-col gap-8 max-w-3xl w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={
                topic?.image ??
                "https://ipfs.nouns.gg/ipfs/QmbzPe6hFtEwudcqBPfp1eTCGq5zSgR4Ch7KoEgCJHXudM"
              }
              className="w-12 h-12 rounded-lg"
            />
            <div className="flex items-center gap-0">
              <h1 className="text-4xl text-white font-semibold">
                {topic?.name ?? "Trending"}
              </h1>
              <ChevronDown className="w-12 h-12 text-white" />
            </div>
          </div>
          <Button href={`/chat/create`}>Create Post</Button>
        </div>
        <div className="flex flex-col gap-4">
          {await Promise.all([
            feed.map(async (cast) => (
              <CastCard
                key={cast.hash}
                cast={cast}
                topic={communities.find((c) =>
                  c.channels.includes(cast.channel?.id ?? "")
                )}
              />
            )),
          ])}
        </div>
      </div>
    </div>
  );
}
