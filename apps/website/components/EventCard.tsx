import type { Event } from "~/packages/db/schema";
import Link from "@/components/Link";
import Button from "./Button";

export default function EventCard(props: {
  id: Event["id"];
  name: Event["name"];
  image: Event["image"];
  start: Event["start"];
  end: Event["end"];
}) {
  return (
    <div className="w-full h-min group relative flex flex-col gap-2 aspect-video rounded-xl overflow-hidden">
      <Link
        href={`/events/${props.id}`}
        className="absolute z-10 top-0 left-0 w-full h-full"
      />
      <img
        src={props.image}
        alt={props.name}
        className=" w-full rotate-[0.01deg] h-full object-cover /brightness-75 select-none group-hover:scale-105 transition-transform"
      />
      <div className="absolute z-10 top-0 left-0 p-4 flex flex-col justify-between h-full pointer-events-none">
        <div className="text-sm text-white bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 w-min">
          {new Date() < new Date(props.start) ? (
            `Starts on ${new Date(props.start).toLocaleDateString()}`
          ) : new Date() > new Date(props.end) ? (
            `Ended on ${new Date(props.end).toLocaleDateString()}`
          ) : (
            <div className="flex items-center gap-2 text-nowrap">
              <div className="w-2 h-2 bg-red rounded-full animate-pulse" />
              Happening now
            </div>
          )}
        </div>
        <div className="pointer-events-auto w-min">
          <Button href={`/events/${props.id}`}>{props.name}</Button>
        </div>
      </div>
    </div>
  );
}
