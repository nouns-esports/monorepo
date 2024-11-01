import CastCard from "@/components/CastCard";
import { getCast } from "@/server/queries/farcaster";

export default async function Cast(props: { params: { cast: string } }) {
  const cast = await getCast({ hash: props.params.cast });

  return (
    <div className="flex flex-col items-center w-full pt-32 max-xl:pt-28 max-sm:pt-20 px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
      <div className="flex flex-col gap-8 max-w-3xl w-full">
        <CastCard cast={cast} />
      </div>
    </div>
  );
}
