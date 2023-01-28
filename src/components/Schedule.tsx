import { createQuery } from "@tanstack/solid-query";
import { createEffect, createSignal, For, JSX, onMount, Show } from "solid-js";

type Event = {
  id: string;
  status: string;
  htmlLink: string;
  location: string;
  summary: string;
  description: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
};

type Events = {
  items: Array<Event>;
};

export default function Schedule() {
  let events: HTMLDivElement;

  const query = createQuery<Events>(
    () => ["events"],
    async () => {
      const events = await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/2gl6iku9kcb2qjdrtgdthgng3s@group.calendar.google.com/events?" +
          new URLSearchParams({
            // q: "dota",
            singleEvents: "true",
            orderBy: "startTime",
            timeMin: new Date().toISOString(),
            maxResults: "10",
            key: import.meta.env.VITE_GOOGLE,
          })
      );
      return events.json();
    }
  );

  const [canScrollLeft, setCanScrollLeft] = createSignal(false);
  const [canScrollRight, setCanScrollRight] = createSignal(true);

  onMount(() =>
    events.addEventListener("scroll", () => {
      if (events.scrollLeft === 0 && canScrollLeft()) {
        return setCanScrollLeft(false);
      }

      if (events.scrollLeft > 0 && !canScrollLeft()) {
        return setCanScrollLeft(true);
      }

      if (
        events.scrollWidth - events.scrollLeft - window.innerWidth === 0 &&
        canScrollRight()
      ) {
        return setCanScrollRight(false);
      }

      if (events.scrollWidth - events.scrollLeft - window.innerWidth > 0) {
        return setCanScrollRight(true);
      }
    })
  );

  return (
    <div
      id="schedule"
      class="h-[100vh] flex flex-col justify-center text-white font-londrina text-lg gap-8"
    >
      <div class="flex items-center justify-between px-16 max-lg:px-8">
        <h2 class="font-londrina text-6xl select-none">Schedule</h2>
        <div class="flex gap-4 max-md:gap-2">
          <Show when={query.isSuccess}>
            <img
              style={{
                opacity: canScrollLeft() ? "80%" : "20%",
                cursor: canScrollLeft() ? "pointer" : "default",
              }}
              class="w-10 rotate-180 cursor-pointer hover:opacity-100 transition-opacity duration-300 max-lg:opacity-100"
              src="arrow.svg"
              draggable={false}
              onClick={() =>
                events.scrollBy({ left: -375, behavior: "smooth" })
              }
            />
            <img
              style={{
                opacity: canScrollRight() ? "80%" : "20%",
                cursor: canScrollRight() ? "pointer" : "default",
              }}
              class="w-10 cursor-pointer opacity-[85%] hover:opacity-100 transition-opacity duration-300 max-lg:opacity-100"
              src="arrow.svg"
              draggable={false}
              onClick={() => events.scrollBy({ left: 375, behavior: "smooth" })}
            />
          </Show>
        </div>
      </div>

      <div
        ref={events}
        style={{
          "overflow-x": query.isSuccess ? "scroll" : "hidden",
        }}
        class="flex flex-row gap-6 snap-x scroll-px-16 max-lg:scroll-px-16 scrollbar-hidden"
      >
        <Show
          when={query.isSuccess}
          fallback={
            <For each={new Array(8)}>
              {() => (
                <div class="rounded-xl bg-black border-[#161616] border-2 min-w-[375px] h-[450px] overflow-hidden">
                  <div class="w-full h-full animate-pulse bg-white/10 duration-300" />
                </div>
              )}
            </For>
          }
        >
          <For each={query.data.items}>
            {(event, index) => (
              <Card
                event={event}
                first={index() === 0}
                last={index() === query.data.items.length - 1}
              />
            )}
          </For>
        </Show>
      </div>
    </div>
  );
}

function Card(props: { event: Event; first?: boolean; last: boolean }) {
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
      class="relative snap-start w-fit h-fit overflow-y-visible"
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
          class="h-40 object-cover"
        />
        <div class="flex flex-col gap-2 p-4">
          <h3 class="font-bebas text-2xl">{props.event.summary}</h3>
          <p class="text-grey text-base leading-normal overflow-ellipsis overflow-hidden selection:bg-red selection:text-white">
            {description()}
          </p>
          <ul class="flex gap-2">
            <For each={tags()}>{(tag) => <Tag>{tag}</Tag>}</For>
          </ul>
        </div>
      </div>
    </a>
  );
}

function Tag(props: { children: string }) {
  return (
    <li class="bg-red font-semibold px-2 py-0.5 rounded-lg text-sm w-fit select-none cursor-pointer">
      {props.children}
    </li>
  );
}
