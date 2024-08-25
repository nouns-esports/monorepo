import { twMerge } from "tailwind-merge";
import Link from "./Link";
import { Check, Timer } from "lucide-react";

export default function QuestCard(props: {
  id: string;
  name: string;
  description: string;
  image: string;
  community: {
    id: string;
    name: string;
    image: string;
  };
  completed?: boolean;
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        "relative flex flex-col bg-grey-800 hover:bg-grey-600 transition-colors rounded-xl overflow-hidden w-full group aspect-[5/6]",
        props.className
      )}
    >
      <Link
        href={`/quests/${props.id}`}
        className="absolute z-10 top-0 left-0 w-full h-full"
      />
      <div className="flex flex-shrink-0 w-full h-[40%] overflow-hidden">
        <img
          src={`${props.image}?img-height=200&img-onerror=redirect`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
      </div>
      <div className="flex flex-col p-4 gap-4 h-full">
        <div className="flex flex-col gap-4">
          <p className="text-white text-2xl leading-tight font-bebas-neue line-clamp-2 h-[2lh]">
            {props.name}
          </p>
        </div>
        <div className="flex flex-col h-full justify-between">
          {props.completed !== undefined ? (
            props.completed ? (
              <div className="text-green flex items-center gap-1 text-sm">
                <Check className="w-4 h-4" />
                Completed
              </div>
            ) : (
              <div className="text-yellow flex items-center gap-1 text-sm">
                <Timer className="w-4 h-4" />
                Not completed
              </div>
            )
          ) : (
            ""
          )}
          <Link
            href={`https://warpcast.com/~/channel/${props.community.id}`}
            newTab
            className="relative z-20 bg-grey-500 hover:bg-grey-400 transition-colors py-2 pl-2 pr-3 rounded-full flex text-white items-center gap-2 text-sm font-semibold w-fit whitespace-nowrap"
          >
            <img src={props.community.image} className="w-5 h-5 rounded-full" />
            {props.community.name}
          </Link>
        </div>
      </div>
    </div>
  );
}
