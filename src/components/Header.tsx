import { createSignal, onMount } from "solid-js";
import Button from "./Button";
import Logo from "./Logo";
import { A, useLocation } from "@solidjs/router";

const [currentSection, setCurrentSection] = createSignal("");

export const observer = new IntersectionObserver(
  (entries) => {
    const highestRatioEntry = entries.reduce((previousEntry, currentEntry) =>
      currentEntry.intersectionRatio > previousEntry.intersectionRatio
        ? currentEntry
        : previousEntry
    );

    if (highestRatioEntry.isIntersecting) {
      setCurrentSection(highestRatioEntry.target.id);
    }
  },
  { threshold: 0.5 }
);

export default function Header() {
  const location = useLocation();

  onMount(() => {
    if (location.pathname === "/") {
      document.addEventListener("scroll", () => {
        if (
          window.scrollY <
          document.getElementById("teams").getBoundingClientRect().top / 2
        ) {
          setCurrentSection("");
        }
      });
    }
  });

  return (
    <header class="fixed w-full flex items-center justify-between p-8 z-20">
      <A
        href="/"
        draggable={false}
        class="flex gap-3 group items-center cursor-pointer select-none"
      >
        <Logo size={40} />
        <p class="text-white font-londrina text-3xl select-none max-[300px]:hidden">
          Nouns
        </p>
      </A>
      <div class="flex gap-8">
        <nav class="flex items-center gap-6  max-md:hidden">
          <Link name="Teams" />
          <Link name="Schedule" />
          <Link name="About" />
          <Link name="Shop" />
        </nav>
        <Button href="https://discord.gg/nounsesports">JOIN</Button>
      </div>
    </header>
  );
}

function Link(props: { name: string }) {
  const location = useLocation();

  const isHome = () => location.pathname === "/";
  const isShop = () => props.name.toLowerCase() === "shop";

  const href = () => {
    if (isHome()) return `#${props.name.toLowerCase()}`;
    if (isShop()) return "https://shop.nouns.gg";

    return `/${props.name.toLowerCase()}`;
  };

  onMount(() => {
    if (location.pathname === "/") {
      observer.observe(document.getElementById(props.name.toLowerCase()));
    }
  });

  return (
    <a
      href={href()}
      target={isShop() && !isHome() ? "_blank" : ""}
      rel={isShop() && !isHome() ? "noopener noreferrer" : ""}
      draggable={false}
      class={`${
        currentSection() === props.name.toLowerCase() ||
        location.pathname === `/${props.name.toLowerCase()}`
          ? "text-white"
          : "text-grey"
      } text-[17px] cursor-pointer hover:text-white select-none transition-colors duration-300`}
    >
      {props.name}
    </a>
  );
}
