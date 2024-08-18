import Link from "@/components/Link";
import { getCreation } from "@/server/queries/creations";
import { defaultProfileImage } from "@/utils/defaultProfileImage";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { TwitterLogo } from "phosphor-react-sc";
import { twMerge } from "tailwind-merge";

export default async function Creation(props: { params: { id: string } }) {
  const creation = await getCreation({ id: props.params.id });

  if (!creation) {
    notFound();
  }

  return (
    <div className="flex items-center justify-center relative h-screen w-full mb-8 max-sm:mb-0 overflow-hidden">
      <div className="absolute z-10 -bottom-72 left-0 h-72 w-[calc(100vw_+_8rem)] bg-gradient-to-b from-transparent to-black -mx-32 max-2xl:-mx-16 max-xl:-mx-8 max-sm:-mx-4" />
      <img
        src={`https://ipfs.nouns.gg/ipfs/${creation.id}`}
        draggable={false}
        className="w-full fixed top-0 left-0 blur-2xl h-full brightness-75 select-none object-cover bg-black"
      />
      <div className="flex flex-col justify-center items-center gap-12 max-sm:gap-8 relative z-10 h-[60%] px-32 max-xl:px-16 max-sm:px-8">
        {creation.creator ? (
          <div className="flex flex-col gap-4">
            <h1 className="font-luckiest-guy text-white text-5xl text-center max-sm:text-4xl">
              {creation.title ?? "Untitled"}
            </h1>
            <div className="text-white flex items-center justify-center gap-4 font-semibold text-xl max-sm:text-lg">
              <p>by</p>
              <div className="flex items-center gap-2">
                <img
                  src={
                    creation.creator.image ??
                    defaultProfileImage(creation.creator.id)
                  }
                  className="w-8 h-8 rounded-full"
                />
                {creation.creator.name}
              </div>
              <div className="flex gap-3 items-center">
                {creation.creator.twitter ? (
                  <Link
                    href={`https://twitter.com/${creation.creator.twitter.username}`}
                    newTab
                  >
                    <TwitterLogo
                      className="w-6 h-6 text-white hover:opacity-80 transition-opacity"
                      weight="fill"
                    />
                  </Link>
                ) : (
                  ""
                )}
                {creation.creator.farcaster ? (
                  <Link
                    href={`https://warpcast.com/${creation.creator.farcaster.username}`}
                    newTab
                  >
                    <img
                      src="/farcaster.svg"
                      className="w-5 h-5  hover:opacity-80 transition-opacity"
                    />
                  </Link>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <img
          src={`https://ipfs.nouns.gg/ipfs/${creation.id}`}
          draggable={false}
          className={twMerge(
            "rounded-xl hover:scale-105 transition-transform max-sm:w-full max-sm:h-auto",
            creation.width / creation.height > 1.3 ? "w-full" : "h-full"
          )}
        />
        {!creation.creator ? (
          <div className="flex w-full justify-center">
            <Link
              newTab
              href="/discord"
              className="flex items-center gap-1 group text-white hover:text-white/60 transition-colors"
            >
              <button className="font-sm font-semibold">
                Claim this art piece
              </button>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
