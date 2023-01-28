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
              <Button href="">LEARN MORE</Button>
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
          class="flex h-[100vh] flex-col justify-center px-16 gap-6 max-lg:px-8"
        >
          <h2 class="text-white font-londrina text-6xl select-none">About</h2>
          <p class="text-grey selection:bg-red selection:text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
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
