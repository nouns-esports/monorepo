import { createSignal, onMount } from "solid-js";

const [currentTeam, setCurrentTeam] = createSignal("");

const observer = new IntersectionObserver(
  (entries) => {
    console.log(entries);

    const highestRatioEntry = entries.reduce((previousEntry, currentEntry) =>
      currentEntry.intersectionRatio > previousEntry.intersectionRatio
        ? currentEntry
        : previousEntry
    );

    if (highestRatioEntry.isIntersecting) {
      setCurrentTeam(highestRatioEntry.target.id);
    }
  },
  { rootMargin: "-50% 0% -50% 0%", threshold: 0 }
);

export default function TeamSection() {
  onMount(() => {
    observer.observe(document.getElementById("dota") as HTMLAnchorElement);
    observer.observe(document.getElementById("smash") as HTMLAnchorElement);
    observer.observe(document.getElementById("pokemon") as HTMLAnchorElement);
    observer.observe(document.getElementById("csgo") as HTMLAnchorElement);
  });

  return (
    <div class="flex max-lg:flex-col w-full h-[75vh] border-y-2 border-[#161616]">
      <a
        id="dota"
        href="/teams/dota"
        style={{
          filter:
            currentTeam() === "dota"
              ? "saturate(100%) brightness(100%)"
              : "saturate(0%) brightness(25%)",
        }}
        class="group flex items-center justify-center bg-[url('/dota.webp')] bg-cover bg-center flex-1 object-cover relative hover:flex-grow-[3] overflow-hidden cursor-pointer transition-all ease-in-out duration-500 saturate-0 brightness-[25%] hover:saturate-100 hover:brightness-100"
      >
        <p class="text-white max-md:text-5xl whitespace-nowrap font-luckiest-guy text-6xl drop-shadow-[0_16px_16px_rgba(0,0,0,1)]">
          Dota 2
        </p>
      </a>
      <a
        id="smash"
        href="/teams/smash-melee"
        style={{
          filter:
            currentTeam() === "smash"
              ? "saturate(100%) brightness(100%)"
              : "saturate(0%) brightness(15%)",
        }}
        class="group flex items-center justify-center bg-[url('/smash.webp')] bg-cover bg-center flex-1 object-cover relative hover:flex-grow-[3] overflow-hidden cursor-pointer transition-all ease-in-out duration-500 saturate-0 brightness-[15%] hover:saturate-100 hover:brightness-100"
      >
        <p class="text-white max-md:text-5xl whitespace-nowrap font-luckiest-guy text-6xl drop-shadow-[0_16px_16px_rgba(0,0,0,1)]">
          Smash Melee
        </p>
      </a>
      <a
        id="pokemon"
        href="/teams/pokemon-unite"
        style={{
          filter:
            currentTeam() === "pokemon"
              ? "saturate(100%) brightness(100%)"
              : "saturate(0%) brightness(10%)",
        }}
        class="group flex items-center justify-center bg-[url('/pokemon.webp')] bg-cover bg-center flex-1 object-cover relative hover:flex-grow-[3] overflow-hidden cursor-pointer transition-all ease-in-out duration-500 saturate-0 brightness-[10%] hover:saturate-100 hover:brightness-100"
      >
        <p class="text-white max-md:text-5xl whitespace-nowrap font-luckiest-guy text-6xl drop-shadow-[0_32px_32px_rgba(0,0,0,1)]">
          Pokemon Unite
        </p>
      </a>
      <a
        id="csgo"
        href="/teams/csgo"
        style={{
          filter:
            currentTeam() === "csgo"
              ? "saturate(100%) brightness(100%)"
              : "saturate(0%) brightness(20%)",
        }}
        class="group flex items-center justify-center bg-[url('/csgo.webp')] bg-cover bg-center flex-1 object-cover relative hover:flex-grow-[3] overflow-hidden cursor-pointer transition-all ease-in-out duration-500 saturate-0 brightness-[20%] hover:saturate-100 hover:brightness-100"
      >
        <p class="text-white max-md:text-5xl whitespace-nowrap font-luckiest-guy text-6xl drop-shadow-[0_32px_32px_rgba(0,0,0,1)]">
          CSGO
        </p>
      </a>
    </div>
  );
}
