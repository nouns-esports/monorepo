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
            <h1 class="text-white font-londrina text-6xl w-[500px] cursor-default">
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

              {/* <SocialIcon
                href="https://www.twitch.tv/nounsesports"
                src="twitch.svg"
                alt="Watch Nouns Esports on Twitch"
              />
              <SocialIcon
                href="https://twitter.com/nounsesports"
                src="twitter.svg"
                alt="Follow Nouns Esports on Twitter"
              />
              <SocialIcon
                href="https://www.youtube.com/@nounsesports"
                src="youtube.svg"
                alt="Watch Nouns Esports on YouTube"
              />
              <SocialIcon
                href="https://discord.gg/nounsesports"
                src="discord.svg"
                alt="Join the Nouns Esports Discord"
              /> */}
            </div>
          </div>

          <img
            src="graphic.svg"
            alt="Nouns Esports"
            class="w-[45vw] drop-shadow-2xl"
          />
        </div>
        <div class="h-[100vh]" />
        <Footer />
      </div>
    </div>
  );
}
