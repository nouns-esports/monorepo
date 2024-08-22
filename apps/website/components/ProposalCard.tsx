import { twMerge } from "tailwind-merge";
import { ToggleModal } from "./Modal";
import { ChartBarHorizontal } from "phosphor-react-sc";
import Link from "./Link";

export default function ProposalCard(
  props: {
    id: string;
    title: string;
    user: {
      id: string;
      image: string;
      name: string;
    };
    votes: number;
    className?: string;
  } & (
    | {
        type: "markdown";
        preview?: string;
        content: string;
        description?: string;
      }
    | { type: "video"; src: string; caption: string }
    | { type: "image"; src: string; caption: string }
  )
) {
  return (
    <ToggleModal
      key={props.id}
      id={`proposal-${props.id}`}
      value={props.id}
      className={twMerge(
        "flex flex-col gap-4 bg-grey-800 hover:bg-grey-600 transition-colors rounded-xl overflow-hidden aspect-square w-full h-full group p-4",
        props.type === "video" && "aspect-auto",
        props.className
      )}
    >
      {props.type === "markdown" && (
        <p className="text-white font-bebas-neue text-2xl line-clamp-2 flex-shrink-0 leading-[1.15] /h-[2lh]">
          {props.title}
        </p>
      )}

      {props.type === "markdown" && !props.preview ? (
        <div className="relative w-full h-full overflow-hidden">
          <p className="text-grey-200 h-full">{props.description}</p>
          <div
            className={twMerge(
              "absolute left-0 w-full group-hover:opacity-0 opacity-100 transition-opacity bg-gradient-to-t from-grey-800 to-transparent h-10 bottom-0 z-10"
            )}
          />
          <div
            className={twMerge(
              "absolute left-0 w-full group-hover:opacity-100 opacity-0 transition-opacity bg-gradient-to-t from-grey-600 to-transparent h-20 bottom-0 z-10"
            )}
          />
        </div>
      ) : (
        <img
          src={props.type === "markdown" ? props.preview : props.src}
          className={twMerge(
            "flex w-full h-full object-cover overflow-hidden rounded-xl",
            props.type === "video" && "aspect-video h-auto"
          )}
        />
      )}
      <div className="flex justify-between items-center flex-shrink-0">
        <Link href="" className="flex gap-2 items-center">
          <img src={props.user.image} className="h-6 w-6 rounded-full" />
          {props.user.name}
        </Link>
        <div className="text-grey-200 flex items-center gap-2">
          <ChartBarHorizontal
            className={twMerge("w-5 h-5 text-grey-200 -rotate-90")}
            weight="fill"
          />
          {props.votes}
        </div>
      </div>
    </ToggleModal>
  );
}
