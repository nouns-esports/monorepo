import Button from "@/components/Button";
import Link from "@/components/Link";
import { getArtist, getArtPiece } from "@/server/queries/art";
import { getUser } from "@/server/queries/users";
import { userToProfile } from "@/utils/userToProfile";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";

export default async function ArtPiece(props: { params: { id: string } }) {
  const art = await getArtPiece({ id: props.params.id });

  if (!art) {
    notFound();
  }

  const artist = art.artist ? await getUser({ id: art.artist }) : undefined;

  const artistProfile = artist ? userToProfile(artist) : undefined;

  return (
    <div className="flex items-center justify-center relative h-screen w-full mb-8 max-sm:mb-0">
      <div className="absolute z-10 -bottom-72 left-0 h-72 w-full bg-gradient-to-b from-transparent to-black" />
      <img
        src={`https://ipfs.nouns.gg/ipfs/${art.id}`}
        draggable={false}
        className="w-full fixed top-0 left-0 blur-2xl h-full brightness-75 select-none object-cover bg-black"
      />

      <div className="flex flex-col justify-center items-center gap-12 max-sm:gap-8 relative z-10 h-[60%] px-32 max-xl:px-16 max-sm:px-8">
        {artistProfile ? (
          <div className="flex flex-col gap-4">
            <h1 className="font-luckiest-guy text-white text-5xl text-center max-sm:text-4xl">
              {art.title ?? "Untitled"}
            </h1>
            <div className="text-white flex items-center justify-center gap-4 font-semibold text-xl max-sm:text-lg">
              <p>by</p>
              <div className="flex items-center gap-2">
                <img src={artistProfile.pfp} className="w-8 h-8 rounded-full" />
                {artistProfile.name}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <img
          src={`https://ipfs.nouns.gg/ipfs/${art.id}`}
          draggable={false}
          className="h-full rounded-xl hover:scale-105 transition-transform max-sm:w-full max-sm:h-auto"
        />
        {!artist ? (
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
