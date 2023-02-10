import { For } from "solid-js";
import type { Event } from "../types";

export default function EventCard(props: {
  event: Event;
  first?: boolean;
  last: boolean;
}) {
  const description = () => {
    return props.event.description;
  };

  const tags = () => {
    return ["Melee", "Aklo"];
  };

  return (
    <a
      href={props.event.location || props.event.htmlLink}
      target="_blank"
      rel="noopener noreferrer"
      draggable={false}
      class="relative snap-start"
      style={{
        "margin-left": props.first ? "4rem" : 0,
        "margin-right": props.last ? "4rem" : 0,
      }}
    >
      <div class="absolute w-full h-full bg-red rounded-xl" />
      <div class="relative hover:translate-x-1 hover:-translate-y-1 duration-300 rounded-xl bg-black border-[#161616] overflow-hidden border-2 w-[375px] h-[450px]">
        <img
          src="smash.png"
          alt={props.event.summary}
          draggable={false}
          class="h-40 object-cover select-none"
        />
        <div class="flex flex-col gap-2 p-4">
          <h3 class="font-bebas text-2xl select-none">{props.event.summary}</h3>
          <p class="text-grey text-base leading-normal overflow-ellipsis overflow-hidden select-none">
            {description()}
          </p>
          <ul class="flex gap-2">
            <For each={tags()}>
              {(tag) => (
                <li class="bg-red font-semibold px-2 py-0.5 rounded-lg text-sm w-fit select-none cursor-pointer">
                  {tag}
                </li>
              )}
            </For>
          </ul>
        </div>
      </div>
    </a>
  );
}
