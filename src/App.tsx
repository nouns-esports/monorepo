import Background from "./components/Background";
import Button from "./components/Button";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Twitch, Twitter, Youtube, Discord } from "./components/Icons";

export default function App() {
  return (
    <div class="w-[100vw]">
      <Background />
      <div class="overflow-x-hidden relative">
        <Header />
        <div class="w-full h-[100vh] flex gap-16 items-center justify-center p-8">
          <div class="flex flex-col gap-8">
            <h1 class="text-white font-londrina text-6xl w-[500px] cursor-default select-none">
              Driving innovation at the intersection of{" "}
              <span class="text-red font-londrina">web3</span> and{" "}
              <span class="text-red font-londrina">gaming</span>
            </h1>
            <div class="flex gap-8 items-center">
              <Button href="">LEARN MORE</Button>
              <div class="flex items-center gap-4">
                <Twitch />
                <Twitter />
                <Youtube />
                <Discord />
              </div>
            </div>
          </div>

          <img
            src="graphic.svg"
            alt="Nouns Esports"
            draggable={false}
            class="w-[45vw]"
          />
        </div>
        <div
          id="teams"
          class="h-[100vh] flex items-center justify-center text-white font-londrina text-4xl"
        >
          Teams
        </div>
        <div
          id="schedule"
          class="h-[100vh] flex items-center justify-center text-white font-londrina text-4xl"
        >
          Schedule
        </div>
        <div
          id="about"
          class="h-[100vh] flex items-center justify-center text-white font-londrina text-4xl"
        >
          About
        </div>
        <div
          id="shop"
          class="h-[100vh] flex items-center justify-center text-white font-londrina text-4xl"
        >
          Shop
        </div>
        <Footer />
      </div>
    </div>
  );
}
