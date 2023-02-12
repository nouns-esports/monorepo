import { A } from "@solidjs/router";

export default function TeamsWidget(props: { class: string }) {
  return (
    <div class={props.class}>
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
  );
}
