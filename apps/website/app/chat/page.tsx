import CastCard from "@/components/CastCard";
import { getCommunity } from "@/server/queries/communities";
import { getFeed } from "@/server/queries/farcaster";
import { notFound } from "next/navigation";

export default async function Chat() {
  const community = await getCommunity({ id: "nouns-esports" });

  if (!community) return notFound();

  const feed = await getFeed({ channels: community.channels });

  return (
    <div className="flex flex-col gap-4 w-full pt-32 max-xl:pt-28 max-sm:pt-20 px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
      <div className="flex flex-col gap-4">
        {await Promise.all([
          feed.map(async (cast) => <CastCard cast={cast} />),
        ])}
      </div>
    </div>
  );
}
