import type { getArtist } from "@/server/queries/art";
import { Diamond } from "lucide-react";

export default function Attribution(props: {
  artist?: Awaited<ReturnType<typeof getArtist>>;
}) {
  return (
    <div className="rounded-md w-full h-full flex drop-shadow-lg overflow-hidden bg-gradient-to-br from-[#F3B5FD] to-[#F66FD0] group/tag text-white font-semibold items-center">
      {props.artist ? (
        <>
          <img
            src={props.artist.pfp}
            draggable={false}
            className="h-full select-none"
          />
          <p className="w-full h-full bg-transparent group-hover/tag:bg-black/15 transition-colors z-10 relative px-2 flex items-center">
            {props.artist.name}
          </p>
        </>
      ) : (
        <Diamond className="w-full h-full p-1.5" />
      )}
    </div>
  );
}
