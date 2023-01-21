import { createSignal, onMount } from "solid-js";
import Button from "./Button";
import Logo from "./Logo";

const [currentSection, setCurrentSection] = createSignal("");

export const observer = new IntersectionObserver(
  (entries) => {
    const highestRatioEntry = entries.reduce((previousEntry, currentEntry) =>
      currentEntry.intersectionRatio > previousEntry.intersectionRatio
        ? currentEntry
        : previousEntry
    );

    setCurrentSection(highestRatioEntry.target.id);
  },
  { threshold: 0.5 }
);

export default function Header() {
  onMount(() => {
    document.addEventListener("scroll", () => {
      if (
        window.scrollY <
        document.getElementById("teams").getBoundingClientRect().top / 2
      ) {
        setCurrentSection("");
      }
    });
  });

  return (
    <header class="fixed w-full flex items-center justify-between p-8 z-10">
      <div class="flex gap-3 items-center text-white font-londrina text-3xl pointer-events-auto cursor-default select-none">
        <Logo size={40} />
        Nouns
      </div>
      <div class="flex gap-8">
        <nav class="flex items-center gap-6 pointer-events-auto">
          <Link name="Teams" href="#teams" />
          <Link name="Schedule" href="#schedule" />
          <Link name="About" href="#about" />
          <Link name="Shop" href="#shop" />
        </nav>
        <Button href="https://discord.gg/nounsesports">JOIN</Button>
      </div>
    </header>
  );
}

function Link(props: { name: string; href: string }) {
  onMount(() => {
    observer.observe(document.getElementById(props.name.toLowerCase()));
  });

  return (
    <a
      href={props.href}
      draggable={false}
      class={`${
        currentSection() === props.name.toLowerCase()
          ? "text-white"
          : "text-grey"
      } text-[17px] cursor-pointer hover:text-white select-none transition-colors duration-300`}
    >
      {props.name}
    </a>
  );
}
