import { Diamond } from "lucide-react";
import Link from "./Link";
import type { userToProfile } from "@/utils/userToProfile";

export default function Attribution(props: {
  id: string;
  creator?: Awaited<ReturnType<typeof userToProfile>>;
}) {
  return (
    <Link
      href={`/creations/${props.id}`}
      className="relative rounded-md w-full h-full flex drop-shadow-lg overflow-hidden bg-gradient-to-br from-[#F3B5FD] to-[#F66FD0] group/tag text-white font-semibold items-center"
    >
      {props.creator ? (
        <>
          <img
            src={props.creator.pfp}
            draggable={false}
            className="h-full select-none"
          />
          <p className="w-full h-full z-10 relative px-2 flex items-center">
            {props.creator.name}
          </p>
        </>
      ) : (
        <Diamond className="w-full h-full p-1.5" />
      )}
      <div className="absolute top-0 left-0 w-full h-full bg-transparent group-hover/tag:bg-black/15 transition-colors z-10"></div>
    </Link>
  );
}
