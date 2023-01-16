import { JSX } from "solid-js/jsx-runtime";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer class="flex justify-between items-center p-8 bg-black border-t-4 border-red">
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-3 text-white text-3xl font-londrina">
          <Logo size={40} />
          Nouns
        </div>
        <p class="text-grey w-48">
          Driving innovation at the intersection of web3 and gaming.
        </p>
      </div>
      <div class="flex gap-20">
        <Section name="EXPLORE">
          <Link name="Teams" href="#teams" />
          <Link name="Schedule" href="#schedule" />
          <Link name="About" href="#about" />
          <Link name="Shop" href="#shop" />
        </Section>
        <Section name="TEAMS">
          <Link name="Dota" href="/teams/dota" />
          <Link name="Smash Melee" href="/teams/smash-melee" />
          <Link name="Pokémon Unite" href="/teams/pokemon-unite" />
          <Link name="CSGO" href="/teams/csgo" />
        </Section>
        <Section name="NOUNS">
          <Link name="Nouns.wtf" href="https://nouns.wtf" />
          <Link name="Proposals" href="https://nouns.wtf/proposals" />
          <Link name="Pod" href="/pod" />
        </Section>
      </div>
      <div class="flex flex-col gap-4 text-white">
        <p>Twitter</p>
        <p>Twitch</p>
        <p>Youtube</p>
        <p>TikTok</p>
      </div>
    </footer>
  );
}

function Section(props: { name: string; children: JSX.Element }) {
  return (
    <div class="flex flex-col gap-4">
      <h3 class="text-xl text-white font-bebas">{props.name}</h3>
      <ul class="flex flex-col gap-2">{props.children}</ul>
    </div>
  );
}

function Link(props: { name: string; href: string }) {
  return (
    <li>
      <a href={props.href} class="text-grey hover:text-white cursor-pointer">
        {props.name}
      </a>
    </li>
  );
}
