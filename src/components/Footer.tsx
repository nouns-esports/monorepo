import { JSX } from "solid-js/jsx-runtime";
import { Twitch, Twitter, Youtube, Discord } from "./Icons";
import Logo from "./Logo";
import { A } from "@solidjs/router";

export default function Footer() {
  return (
    <footer class="flex justify-between items-center p-8 bg-black border-t-4 border-red relative z-20">
      <div class="flex flex-col gap-4">
        <A
          href="/"
          draggable={false}
          class="flex w-fit items-center group cursor-pointer gap-3 text-white text-3xl font-londrina select-none"
        >
          <Logo size={40} />
          Nouns
        </A>
        <p class="w-48">
          Driving innovation at the intersection of web3 and gaming.
        </p>
      </div>
      <div class="flex gap-20">
        <Section name="EXPLORE">
          <Link href="/teams">Teams</Link>
          <Link href="/schedule">Schedule</Link>
          <Link href="/about">About</Link>
          <Link href="https://shop.nouns.gg">Shop</Link>
        </Section>
        <Section name="TEAMS">
          <Link href="/teams/dota">Dota</Link>
          <Link href="/teams/smash-melee">Smash Melee</Link>
          <Link href="/teams/pokemon-unite">Pokémon Unite</Link>
          <Link href="/teams/csgo">CSGO</Link>
        </Section>
        <Section name="NOUNS">
          <Link href="https://nouns.wtf">Nouns.wtf</Link>
          <Link href="https://nouns.wtf/proposals">Proposals</Link>
          <Link href="/pod">Pod</Link>
        </Section>
      </div>
      <div class="flex flex-col gap-4 justify-center text-white">
        <Twitch />
        <Twitter />
        <Youtube />
        <Discord />
      </div>
    </footer>
  );
}

function Section(props: { name: string; children: JSX.Element }) {
  return (
    <div class="flex flex-col gap-4">
      <h3 class="text-xl font-bebas">{props.name}</h3>
      <ul class="flex flex-col gap-2">{props.children}</ul>
    </div>
  );
}

function Link(props: { children: string; href: string }) {
  return (
    <li>
      <A
        href={props.href}
        draggable={false}
        class="text-grey hover:text-white cursor-pointer select-none"
      >
        {props.children}
      </A>
    </li>
  );
}
