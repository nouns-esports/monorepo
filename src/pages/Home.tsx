import { For, Show, createSignal, onMount } from "solid-js";
import Button from "../components/Button";
import { Twitch, Twitter, Youtube, Discord } from "../components/Icons";
import { createQuery } from "@tanstack/solid-query";
import type { Events } from "../types";
import EventCard from "../components/EventCard";
import Graphic from "../components/Graphic";
import { A } from "@solidjs/router";

export default function Home() {
  return (
    <div class="relative w-full">
      <Graphic />
      <div class="w-full relative z-10">
        <Landing />
        <Teams />
        <Schedule />
        <About />
        <Shop />
      </div>
    </div>
  );
}

function Landing() {
  return (
    <div class="w-[50vw] max-lg:w-full h-[100vh] flex items-center justify-center p-8">
      <div class="flex flex-col gap-8">
        <h1 class="text-white font-londrina text-6xl w-[500px] max-[600px]:w-auto max-[600px]:text-5xl max-[450px]:text-4xl cursor-default select-none max-lg:text-center">
          Driving innovation at the intersection of{" "}
          <span class="text-red font-londrina">web3</span> and{" "}
          <span class="text-red font-londrina">gaming</span>
        </h1>
        <div class="flex gap-8 items-center max-lg:justify-center max-[450px]:flex-col">
          <Button href="/about">LEARN MORE</Button>
          <div class="flex items-center gap-4">
            <Twitch />
            <Twitter />
            <Youtube />
            <Discord />
          </div>
        </div>
      </div>
    </div>
  );
}

function Teams() {
  return (
    <div id="teams" class="w-full flex h-screen items-center">
      <div class="flex w-full h-3/4">
        <A
          href="/teams/dota"
          class="group flex items-center justify-center bg-[url('/dota.png')] bg-cover bg-center flex-1 object-cover relative hover:flex-grow-[3] overflow-hidden cursor-pointer transition-all ease-in-out duration-500 saturate-0 brightness-[20%] hover:saturate-100 hover:brightness-100"
        >
          <img
            src="dota-logo.png"
            class="w-[50%] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        </A>
        <A
          href="/teams/melee"
          class="group flex items-center justify-center bg-[url('/melee.png')] bg-cover bg-center flex-1 object-cover relative hover:flex-grow-[3] overflow-hidden cursor-pointer transition-all ease-in-out duration-500 saturate-0 brightness-[15%] hover:saturate-100 hover:brightness-100"
        >
          <img
            src="melee-logo.webp"
            class="w-[50%] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        </A>
        <A
          href="/teams/pokemon"
          class="group flex items-center justify-center bg-[url('/pokemon-unite.png')] bg-cover bg-center flex-1 object-cover relative hover:flex-grow-[3] overflow-hidden cursor-pointer transition-all ease-in-out duration-500 saturate-0 brightness-[10%] hover:saturate-100 hover:brightness-100"
        >
          <img
            src="pokemon-unite-logo.png"
            class="w-[50%] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        </A>
        <A
          href="/teams/csgo"
          class="group flex items-center justify-center bg-[url('/csgo.png')] bg-cover bg-center flex-1 object-cover relative hover:flex-grow-[3] overflow-hidden cursor-pointer transition-all ease-in-out duration-500 saturate-0 brightness-[30%] hover:saturate-100 hover:brightness-100"
        >
          <img
            src="csgo-logo.png"
            class="w-[50%] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        </A>
      </div>
    </div>
  );
}

function Schedule() {
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
      class="h-[100vh] flex flex-col justify-center text-white font-londrina text-lg gap-12"
    >
      <div class="flex items-center justify-between px-16 max-lg:px-8">
        <h2 class="font-londrina text-6xl select-none">Upcoming Events</h2>
        <div class="flex gap-4 max-md:gap-2">
          <Show when={query.isSuccess}>
            <img
              style={{
                opacity: canScrollLeft()
                  ? window.innerWidth < 1000
                    ? "100%"
                    : "80%"
                  : "20%",
                cursor: canScrollLeft() ? "pointer" : "default",
              }}
              class="w-10 rotate-180 cursor-pointer hover:opacity-100 transition-opacity duration-300 select-none"
              src="arrow.svg"
              draggable={false}
              onClick={() =>
                events.scrollBy({ left: -375, behavior: "smooth" })
              }
            />
            <img
              style={{
                opacity: canScrollRight()
                  ? window.innerWidth < 1000
                    ? "100%"
                    : "80%"
                  : "20%",
                cursor: canScrollRight() ? "pointer" : "default",
              }}
              class="w-10 cursor-pointer opacity-[85%] hover:opacity-100 transition-opacity duration-300 max-lg:opacity-100 select-none"
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
        class="flex flex-row gap-6 snap-x scroll-px-16 max-lg:scroll-px-16 scrollbar-hidden pt-1"
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
              <EventCard
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

function About() {
  return (
    <div
      id="about"
      class="flex h-[100vh] flex-col justify-center px-16 gap-12 max-lg:px-8 max-md:items-center"
    >
      <h2 class="text-white font-londrina text-6xl select-none">Our Mission</h2>
      <ul class="flex gap-8  text-grey selection:bg-red selection:text-white">
        <li class="flex flex-col gap-2 w-full">
          <strong class="text-white text-2xl font-londrina">
            Help players create fond memories
          </strong>
          <p>
            Nouns are here to do good, we offer premium care and compassion to
            our favorite players in our favorite games.
          </p>
        </li>
        <li class="flex flex-col gap-2 w-full">
          <strong class="text-white text-2xl font-londrina">
            Create entry-level opportunities for contributors
          </strong>
          <p>
            Not everyone can quit their job and work in esports full-time, nor
            should they. We aim to enable contributors to work on what interests
            them and develop our organization organically.
          </p>
        </li>
        <li class="flex flex-col gap-2 w-full">
          <strong class="text-white text-2xl font-londrina">
            Build in the open
          </strong>
          <p>
            Nouns believe that building in the open enables collaboration and
            protects us from corruption. Meetings, proposals, assets, and
            finances are all publicly available for anyone who has taken an
            interest in our project.
          </p>
        </li>
      </ul>
      <div class="max-w-fit">
        <Button href="/about">Learn more</Button>
      </div>
    </div>
  );
}

function Shop() {
  return (
    <div
      id="shop"
      class="h-[100vh] flex flex-col gap-8 items-center justify-center "
    >
      <h2 class="text-white font-londrina text-6xl">Apparel</h2>
      <Button href="https://shop.nouns.gg">Shop</Button>
    </div>
  );
}
