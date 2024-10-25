import CastCard from "@/components/CastCard";
import { getFeed } from "@/server/queries/farcaster";
import { getCommunity } from "@/server/queries/communities";
import { notFound } from "next/navigation";

export default async function Community(props: {
  params: { community: string };
}) {
  const community = await getCommunity({ id: props.params.community });

  if (!community) return notFound();

  const feed = await getFeed({ channels: community.channels });

  return (
    <div className="flex flex-col gap-4 w-full pt-32 max-xl:pt-28 max-sm:pt-20 px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
      <div className="flex flex-col gap-4 bg-grey-800 rounded-xl p-6">
        <div className="flex gap-4 items-center">
          <img src={community.image} className="rounded-full w-10 h-10" />
          <h1 className="text-white text-2xl font-luckiest-guy">
            {community.name}
          </h1>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {await Promise.all([
          feed.map(async (cast) => <CastCard cast={cast} />),
        ])}
      </div>
    </div>
  );
}
