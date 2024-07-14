import Button from "@/components/Button";
import {
  TwitchLogo,
  TwitterLogo,
  YoutubeLogo,
  TiktokLogo,
  DiscordLogo,
  PlayCircle,
  InstagramLogo,
} from "phosphor-react-sc";
import Link from "@/components/Link";
import Image from "next/image";
import Pokemon from "@/public/pokemon.webp";
import Gallery from "@/components/Gallery";
import { getVideos } from "@/server/queries/youtube";
import Attribution from "@/components/Attribution";
import { getLatestActivity } from "@/server/queries/activity";
import { History } from "lucide-react";

export default async function Home() {
  const videos = await getVideos();

  const latestActivity = await getLatestActivity();

  return (
    <main className="flex flex-col gap-16 mb-16">
      <div className="flex max-[900px]:flex-col gap-4 h-96 w-full">
        <Gallery />
        <div className="bg-grey-800 rounded-xl w-full p-4 px-5 animate-in fade-in-15 zoom-in-90 delay-100">
          <div className="flex items-center text-2xl font-luckiest-guy gap-3 text-white">
            <img
              src="/farcaster.svg"
              draggable={false}
              className="w-6 h-6 select-none"
            />
            Discussion
          </div>
        </div>
        <div className="bg-grey-800 rounded-xl w-80 flex-shrink-0 max-[1400px]:hidden px-4 pt-3 flex flex-col gap-4 h-full animate-in fade-in-15 zoom-in-90 delay-200">
          <div className="flex items-center text-2xl font-luckiest-guy gap-2 text-white">
            <History className="w-6 h-6" />
            Activity
          </div>
          <ul className="flex flex-col gap-2 overflow-hidden">
            {latestActivity.map((activity, index) => (
              <li key={index} className="flex gap-2">
                <Link href={""} className="flex items-center gap-2 text-white">
                  <img
                    src={activity.user.pfp}
                    draggable={false}
                    className="w-5 h-5 rounded-full select-none"
                  />
                  {activity.user.name}
                </Link>
                {activity.type === "vote" ? "voted on" : "proposed in"}
                <Link href={""} className="flex items-center gap-2 text-white">
                  <img
                    src={activity.round.image}
                    draggable={false}
                    className="w-5 h-5 rounded-md select-none"
                  />
                  {activity.round.id}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="font-luckiest-guy text-white text-4xl">Videos</h2>
        <ul className="flex justify-between">
          {videos.map((video) => (
            <li
              key={video.id}
              className="w-full bg-transparent hover:bg-grey-800 hover:scale-[95%] transition-all rounded-xl overflow-hidden p-2 h-min hover:drop-shadow-2xl"
            >
              <Link
                href={`https://youtube.com/watch?v=${video.id}`}
                className="flex flex-col gap-2"
                newTab
              >
                <img
                  draggable={false}
                  src={video.thumbnail}
                  alt={video.title}
                  className="rounded-xl select-none"
                />
                <h3>{video.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="font-luckiest-guy text-white text-4xl">Explore</h2>
        <ul className="flex justify-between gap-4">
          <ExploreCard href="/shop" title="Shop" image="/explore-shop.png" />
          <ExploreCard
            href="/rosters"
            title="Our Rosters"
            image="/explore-rosters.png"
          />
          <ExploreCard
            href="/events"
            title="Events"
            image="/explore-events.png"
          />
          <ExploreCard
            href="/partners"
            title="Become a partner"
            image="/explore-partners.png"
          />
        </ul>
      </div>
      <div className="flex flex-col items-center gap-4 py-16">
        <h3 className="text-white text-4xl font-luckiest-guy ">Partners</h3>
        <div className="flex justify-center items-center gap-10 w-full">
          <Link href="https://nouns.wtf">
            <img
              draggable={false}
              src="/nouns-partner-logo.png"
              className="h-10 select-none"
            />
          </Link>
          <Link href="/matcha">
            <img
              draggable={false}
              src="/matcha.svg"
              className="h-8 select-none"
            />
          </Link>
          <Link href="https://adidas.com">
            <img
              draggable={false}
              src="/adidas.svg"
              className="h-12 select-none"
            />
          </Link>
        </div>
      </div>
      <div className="-mx-32 flex flex-col gap-4">
        <div className="flex gap-4 h-60 animate-scroll">
          {[
            "https://ipfs.nouns.gg/ipfs/QmUMouSSMHhmuPrEs3QUSUjNvfssPoe5k9iXj2dqtXQQ8v",
            "https://ipfs.nouns.gg/ipfs/QmU11vkWikFLWxipJ9Nu1RKnfjzpyPGnjhBhrhn6GJcFz9",
            "https://ipfs.nouns.gg/ipfs/QmVtrefNQxvgDkwZz8yr6L8mqUuWMnCcL6fbVW7GLK345d",
            "https://ipfs.nouns.gg/ipfs/QmYerHVfTANfCmMNvWZdRMJDt5cjotuexaTG5DQgHqFmCn",
            "https://ipfs.nouns.gg/ipfs/QmXP7Yq4j4bqiKzgsynfF8AgKZ3vM6Ldq5aCKRGmNh2ScA",
            "https://ipfs.nouns.gg/ipfs/QmYeLkcYghV4qkRBeMY12Z352EoLJwzbLWK8JsvbREHfo3",
            "/projects/noggles-cup.webp",
            "https://ipfs.nouns.gg/ipfs/QmUMouSSMHhmuPrEs3QUSUjNvfssPoe5k9iXj2dqtXQQ8v",
            "https://ipfs.nouns.gg/ipfs/QmU11vkWikFLWxipJ9Nu1RKnfjzpyPGnjhBhrhn6GJcFz9",
            "https://ipfs.nouns.gg/ipfs/QmVtrefNQxvgDkwZz8yr6L8mqUuWMnCcL6fbVW7GLK345d",
            "https://ipfs.nouns.gg/ipfs/QmYerHVfTANfCmMNvWZdRMJDt5cjotuexaTG5DQgHqFmCn",
            "https://ipfs.nouns.gg/ipfs/QmXP7Yq4j4bqiKzgsynfF8AgKZ3vM6Ldq5aCKRGmNh2ScA",
            "https://ipfs.nouns.gg/ipfs/QmYeLkcYghV4qkRBeMY12Z352EoLJwzbLWK8JsvbREHfo3",
            "/projects/noggles-cup.webp",
          ].map((image) => (
            <Link key={image} href={image} className="relative h-full group">
              <img
                src={image}
                draggable={false}
                className="h-full max-w-none object-cover rounded-xl select-none"
              />
              <div className="absolute top-3 right-3 h-7 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
                <Attribution />
              </div>
            </Link>
          ))}
        </div>
        <div className="flex flex-row-reverse gap-4 h-60 animate-scroll-reverse">
          {[
            "/artwork/7.png",
            "https://ipfs.nouns.gg/ipfs/QmPnd7ayCPYp5VYrmfyYLkjeA9wJtQAXkS46wBiY1VAhta",
            "https://ipfs.nouns.gg/ipfs/QmTrfSzw8q5weZRmApCkC2Te3e6Vn87fN2s49G9Kbj9Wkd",
            "/contributor.webp",
            "https://ipfs.nouns.gg/ipfs/QmbKGhDNHSujAJeqJtURW29DuDWtKoFcfx1Eprkjk1movp",
            "https://ipfs.nouns.gg/ipfs/QmUE853Ad1yns6UAUCbYjK6iBtxx5e5EihJfCFAAUh5aYb",
            "/artwork/7.png",
            "https://ipfs.nouns.gg/ipfs/QmPnd7ayCPYp5VYrmfyYLkjeA9wJtQAXkS46wBiY1VAhta",
            "https://ipfs.nouns.gg/ipfs/QmTrfSzw8q5weZRmApCkC2Te3e6Vn87fN2s49G9Kbj9Wkd",
            "/contributor.webp",
            "https://ipfs.nouns.gg/ipfs/QmbKGhDNHSujAJeqJtURW29DuDWtKoFcfx1Eprkjk1movp",
            "https://ipfs.nouns.gg/ipfs/QmUE853Ad1yns6UAUCbYjK6iBtxx5e5EihJfCFAAUh5aYb",
          ].map((image) => (
            <Link key={image} href={image} className="relative h-full group">
              <img
                src={image}
                draggable={false}
                className="h-full max-w-none object-cover rounded-xl select-none"
              />
              <div className="absolute top-3 right-3 h-7 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
                <Attribution />
              </div>
            </Link>
          ))}
        </div>
        <div className="relative">
          <div className="flex flex-col items-center pt-32 gap-8 bg-gradient-to-t from-[#171717] to-black">
            <h3 className="font-luckiest-guy text-4xl text-white">
              Explore our community of artists
            </h3>
            <Button href="/art">Explore</Button>
          </div>
          <Link href={""} className="relative group">
            <Image
              src={Pokemon}
              sizes="100vw"
              alt="Pokemon wearing Nouns noggles"
              placeholder="blur"
              draggable={false}
              className="w-full select-none"
            />
            <div className="absolute z-10 top-8 right-16 h-8 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
              <Attribution />
            </div>
          </Link>
          <div className="from-transparent to-black bg-gradient-to-b h-2/5 w-full bottom-0 absolute pointer-events-none" />
        </div>
      </div>
    </main>
  );
}

function ExploreCard(props: { image: string; title: string; href: string }) {
  return (
    <li className="w-full group">
      <Link
        href={props.href}
        className="relative aspect-[3/4] flex items-end flex-col rounded-xl overflow-hidden"
      >
        <img
          src={props.image}
          alt={props.title}
          draggable={false}
          className="w-full h-full object-cover group-hover:scale-105 scale-100 transition-transform select-none"
        />
        <div className="absolute bottom-4 left-4 z-10">
          <Button href={props.href}>{props.title}</Button>
        </div>
      </Link>
    </li>
  );
}
