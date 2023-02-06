import { createSignal, onMount } from "solid-js";
import Background from "./components/Background";
import Button from "./components/Button";
import Footer from "./components/Footer";
import Graphic from "./components/Graphic";
import Header from "./components/Header";
import { Twitch, Twitter, Youtube, Discord } from "./components/Icons";
import Schedule from "./components/Schedule";

const [scrollOffset, setScrollOffset] = createSignal(0);
export { scrollOffset, setScrollOffset };

export default function App() {
  onMount(() => {
    document.addEventListener("scroll", () => {
      setScrollOffset(window.scrollY);
    });
  });

  return (
    <div class="w-[100vw]">
      <Background />
      <Graphic />
      <div class="overflow-x-hidden relative">
        <Header />
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

          {/* <img
            src="graphic.svg"
            alt="Nouns Esports"
            draggable={false}
            class="w-[45vw]"
          /> */}
        </div>
        <div
          id="teams"
          class="h-[100vh] flex items-center justify-center text-white font-londrina text-4xl"
        >
          Teams
        </div>
        <Schedule />
        <div
          id="about"
          class="flex h-[100vh] flex-col justify-center px-16 gap-12 max-lg:px-8 max-md:items-center"
        >
          <h2 class="text-white font-londrina text-6xl select-none">
            Our Mission
          </h2>
          <ul class="flex gap-8  text-grey selection:bg-red selection:text-white ">
            <li class="flex flex-col gap-2 w-full ">
              <strong class="text-white text-2xl font-londrina">
                Help players create fond memories
              </strong>
              <p>
                Nouns are here to do good, we offer premium care and compassion
                to our favorite players in our favorite games.
              </p>
            </li>
            <li class="flex flex-col gap-2 w-full">
              <strong class="text-white text-2xl font-londrina">
                Create entry-level opportunities for contributors
              </strong>
              <p>
                Not everyone can quit their job and work in esports full-time,
                nor should they. We aim to enable contributors to work on what
                interests them and develop our organization organically.
              </p>
            </li>
            <li class="flex flex-col gap-2 w-full">
              <strong class="text-white text-2xl font-londrina">
                Build in the open
              </strong>
              <p>
                Nouns believe that building in the open enables collaboration
                and protects us from corruption. Meetings, proposals, assets,
                and finances are all publicly available for anyone who has taken
                an interest in our project.
              </p>
            </li>
          </ul>
          <div class="max-w-fit">
            <Button href="/about">Learn more</Button>
          </div>
        </div>
        <div
          id="shop"
          class="h-[100vh] flex flex-col gap-8 items-center justify-center "
        >
          <h2 class="text-white font-londrina text-6xl">Apparel</h2>
          <Button href="https://shop.nouns.gg">Shop</Button>
        </div>
        <Footer />
      </div>
    </div>
  );
}
