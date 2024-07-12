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
import type { Creator, Project } from "~/packages/db/schema";
import Date from "@/components/Date";
import { headers } from "next/headers";
import Image from "next/image";
import Prop from "@/public/prop.webp";
import Pokemon from "@/public/pokemon.webp";
import { getEvents, type Event } from "@/server/queries/events";
import { getGames } from "@/server/queries/games";
import { getCreators } from "@/server/queries/creators";
import { getPosts } from "@/server/queries/posts";
import Gallery from "@/components/Gallery";
import { getVideos } from "@/server/queries/youtube";

export default async function Home() {
  const videos = await getVideos();

  console.log(videos);

  return (
    <main className="flex flex-col gap-16 mb-16">
      <div className="flex max-[900px]:flex-col gap-4 h-min w-full">
        <Gallery />
        <div className="bg-grey-800 rounded-xl w-full">Discussion</div>
        <div className="bg-grey-800 rounded-xl w-64 flex-shrink-0 max-[1400px]:hidden">
          Activity
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="font-luckiest-guy text-white text-4xl">Vidoes</h2>
        <ul className="flex justify-between gap-4">
          {videos.map((video) => (
            <li key={video.id} className="w-full">
              <Link
                href={`https://youtube.com/watch?v=${video.id}`}
                className="flex flex-col gap-2"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="rounded-xl"
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
          <ExploreCard href="/shop" title="Shop" image="/artwork/1.png" />
          <ExploreCard
            href="/rosters"
            title="Our Rosters"
            image="/artwork/1.png"
          />
          <ExploreCard href="/events" title="Events" image="/artwork/1.png" />
          <ExploreCard
            href="/partners"
            title="Become a partner"
            image="/artwork/1.png"
          />
        </ul>
      </div>
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-white text-4xl font-luckiest-guy ">Partners</h3>
        <div className="flex justify-center items-center gap-10 w-full">
          <Link href="https://nouns.wtf">
            <img src="/nouns-partner-logo.png" className="h-10" />
          </Link>
          <Link href="/matcha">
            <img src="/matcha.svg" className="h-8" />
          </Link>
          <Link href="https://adidas.com">
            <img src="/adidas.svg" className="h-12" />
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
            <img src={image} className="h-full rounded-xl" />
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
            <img src={image} className="h-full rounded-xl" />
          ))}
        </div>
        <div className="relative">
          <div className="flex flex-col items-center pt-32 gap-8 bg-gradient-to-t from-[#171717] to-black">
            <h3 className="font-luckiest-guy text-4xl text-white">
              Explore our community of artists
            </h3>
            <Button href="/art" animate="bg">
              Explore
            </Button>
          </div>
          <Image
            src={Pokemon}
            sizes="100vw"
            alt="Pokemon wearing Nouns noggles"
            placeholder="blur"
            className="w-full select-none"
          />
          <div className="from-transparent to-black bg-gradient-to-b h-2/5 w-full bottom-0 absolute" />
        </div>
      </div>
    </main>
  );

  // return (
  //   <main className="flex flex-col">
  //     <div className="flex gap-4 h-min w-full">
  //       <div className="bg-grey-800 rounded-xl w-1/2 flex-shrink-0 aspect-[7/4]"></div>
  //       <div className="bg-grey-800 rounded-xl w-full">text</div>
  //       <div className="bg-grey-800 rounded-xl w-80 flex-shrink-0 max-2xl:hidden">
  //         text
  //       </div>
  //     </div>
  //   </main>
  // );

  // return (
  //   <main className="cursor-crosshair flex flex-col">
  //     <div className="relative h-screen bg-cover flex flex-col justify-center items-center gap-10 shadow-[inset_-80px_-80px_120px_black,inset_80px_80px_120px_black] max-sm:shadow-[inset_-40px_-40px_60px_black,inset_40px_40px_60px_black]">
  //       <video
  //         autoPlay
  //         muted
  //         loop
  //         playsInline
  //         className="absolute select-none w-full h-full object-cover object-top brightness-75 -z-10"
  //       >
  //         <source
  //           src={isMobile ? "/landing-mobile.webm" : "/landing.webm"}
  //           type="video/webm"
  //         />
  //         <source
  //           src={isMobile ? "/landing-mobile.mp4" : "/landing.mp4"}
  //           type="video/mp4"
  //         />
  //       </video>
  //       <h1 className="text-white text-6xl max-w-4xl w-1/2 text-center font-luckiest-guy max-lg:w-full max-lg:px-16 max-sm:px-8 max-md:text-5xl max-[450px]:text-4xl">
  //         Leading the revolution in <span className="text-red">community</span>{" "}
  //         driven <span className="text-red">esports</span>
  //       </h1>
  //       <div className="flex gap-8 max-md:flex-col items-center">
  //         <Button href="/rounds" animate="hover">
  //           Get Involved
  //         </Button>
  //         <Link
  //           href="https://www.youtube.com/watch?v=SAXzMQ8pPvE"
  //           className="text-white select-none hover:text-white/60 transition-colors group font-cabin flex gap-2 items-center"
  //         >
  //           <PlayCircle
  //             weight="bold"
  //             className="w-7 h-7 text-white transition-colors group-hover:text-white/60"
  //           />
  //           Watch Video
  //         </Link>
  //       </div>
  //       <div className="flex gap-4 items-center">
  //         <Link href="/discord">
  //           <DiscordLogo
  //             className="w-10 h-10 text-white hover:text-white/60 cursor-pointer transition-colors"
  //             weight="fill"
  //           />
  //         </Link>
  //         <Link href="/instagram">
  //           <InstagramLogo
  //             className="w-10 h-10 text-white hover:text-white/60 cursor-pointer transition-colors"
  //             weight="fill"
  //           />
  //         </Link>
  //         <Link href="/twitter">
  //           <TwitterLogo
  //             className="w-10 h-10 text-white hover:text-white/60 cursor-pointer transition-colors"
  //             weight="fill"
  //           />
  //         </Link>
  //         <Link href="/youtube">
  //           <YoutubeLogo
  //             className="w-10 h-10 text-white hover:text-white/60 cursor-pointer transition-colors"
  //             weight="fill"
  //           />
  //         </Link>
  //       </div>
  //     </div>
  //     <div className="bg-[url('/marquee.png')] bg-repeat-x bg-center bg-red h-8 w-full animate-marquee" />
  //     <div
  //       id="rosters"
  //       className="px-16 max-sm:px-0 py-32 max-sm:py-16 text-center text-white text-5xl font-luckiest-guy flex flex-col gap-20 max-sm:gap-10 items-center"
  //     >
  //       Our Rosters
  //       <div className="flex flex-wrap max-sm:flex-nowrap max-sm:overflow-x-scroll max-sm:justify-start justify-center max-w-[1920px] gap-16 w-full max-2xl:gap-8">
  //         {games.map((game) => (
  //           <GameCard
  //             key={game.id}
  //             id={game.id}
  //             image={game.image}
  //             name={game.name}
  //           />
  //         ))}
  //       </div>
  //     </div>
  //     <div
  //       id="creators"
  //       className="px-16 max-sm:px-0 pb-32 max-sm:py-16 text-center text-white text-5xl font-luckiest-guy flex flex-col gap-20 max-sm:gap-10 items-center"
  //     >
  //       Our Creators
  //       <div className="flex flex-wrap max-sm:flex-nowrap max-sm:overflow-x-scroll justify-center max-w-[1920px] gap-16 w-full max-2xl:gap-8">
  //         {creators.map((creator) => (
  //           <CreatorCard key={creator.id} creator={creator} />
  //         ))}
  //       </div>
  //     </div>
  //     <div className="relative py-32 max-sm:py-20">
  //       <Image
  //         src={Prop}
  //         alt="2024 proposal background image"
  //         sizes="100vw"
  //         placeholder="blur"
  //         className="absolute -z-10 top-0 w-full h-full select-none object-cover object-center brightness-[50%]"
  //       />
  //       <div className="relative z-10 grid place-items-center gap-10 max-sm:gap-6 px-16 max-sm:px-8">
  //         <h2 className="text-white font-luckiest-guy text-5xl max-sm:text-3xl text-center">
  //           Welcome to the Nexus!
  //         </h2>
  //         <p className="max-w-[600px] px-8 text-center text-grey-200 text-lg max-sm:text-base leading-tight [text-shadow:black_0_0_50px]">
  //           We're offering a unique opportunity for esports enthusiasts to
  //           directly influence our major decisions. You'll be given the power to
  //           vote on key organizational decisions, making you an active
  //           participant in shaping our future.
  //         </p>
  //         <Button href="/nexus" animate="hover">
  //           Get Started
  //         </Button>
  //       </div>
  //       <div className="from-black to-transparent bg-gradient-to-b h-64 w-full top-0 absolute" />
  //       <div className="from-transparent to-black bg-gradient-to-b h-64 w-full bottom-0 absolute" />
  //     </div>

  //     <div
  //       id="events"
  //       className="px-16 max-sm:px-0 py-32 max-sm:py-16 text-white text-5xl text-center font-luckiest-guy flex flex-col gap-20 max-sm:gap-10 items-center"
  //     >
  //       Upcoming Events
  //       <div className="flex flex-wrap max-sm:flex-nowrap max-sm:overflow-x-scroll max-sm:justify-start justify-center max-w-[1920px] gap-16 w-full max-2xl:gap-8">
  //         {events.map((event) => (
  //           <ScheduleCard key={event.id} event={event} />
  //         ))}
  //       </div>
  //     </div>
  //     <div
  //       id="publications"
  //       className="px-16 max-sm:px-0 pb-32 max-sm:py-16 text-white text-5xl text-center font-luckiest-guy flex flex-col gap-20 max-sm:gap-10 items-center"
  //     >
  //       Publications
  //       <div className="flex flex-wrap max-sm:flex-nowrap max-sm:overflow-x-scroll max-sm:justify-start justify-center max-w-[1920px] gap-16 w-full max-2xl:gap-8">
  //         {posts.map((post) => (
  //           <PostCard key={post.id} post={post} />
  //         ))}
  //       </div>
  //     </div>
  //     <div className="px-16 max-sm:px-0 pb-32 max-sm:pb-16 text-white text-5xl font-luckiest-guy flex flex-col gap-12 max-sm:gap-6 items-center">
  //       Partners
  //       <div className="flex justify-center items-center max-w-[1920px] gap-20 w-full max-2xl:gap-10">
  //         <Link href="https://nouns.wtf">
  //           <img src="/nouns-partner-logo.png" className="h-10" />
  //         </Link>
  //         <Link href="/matcha">
  //           <img src="/matcha.svg" className="h-8" />
  //         </Link>
  //         <Link href="https://adidas.com">
  //           <img src="/adidas.svg" className="h-12" />
  //         </Link>
  //       </div>
  //     </div>
  //     <div className="flex items-center justify-center">
  //       <h2 className="text-white text-5xl font-luckiest-guy z-10 relative  text-center leading-normal px-16 max-sm:text-4xl max-sm:leading-relaxed">
  //         Lets{" "}
  //         <span className="relative text-green">
  //           redefine{" "}
  //           <svg
  //             viewBox="0 0 40 4"
  //             fill="none"
  //             xmlns="http://www.w3.org/2000/svg"
  //             className="absolute -bottom-3 -left-1.5 max-sm:-bottom-2 max-sm:-left-0.5 w-full"
  //           >
  //             <path
  //               d="M1.2417 2.61258C3.04409 2.49947 4.8292 2.15267 6.62401 1.97369C13.6525 1.27281 20.7035 1.11258 27.7814 1.11258C31.5762 1.11258 35.371 1.11258 39.1657 1.11258"
  //               strokeLinecap="round"
  //               stroke="#51D06D"
  //             />
  //           </svg>
  //         </span>{" "}
  //         esports together!
  //       </h2>
  //     </div>
  //     <div className="relative mb-8">
  //       <Image
  //         src={Pokemon}
  //         sizes="100vw"
  //         alt="Pokemon wearing Nouns noggles"
  //         placeholder="blur"
  //         className="w-full select-none"
  //       />
  //       <div className="from-black via-black/70 to-transparent bg-gradient-to-b h-2/5 w-full top-0 absolute"></div>
  //       <div className="from-transparent to-black bg-gradient-to-b h-2/5 w-full bottom-0 absolute"></div>
  //     </div>
  //   </main>
  // );
}

function ExploreCard(props: { image: string; title: string; href: string }) {
  return (
    <li className="relative w-full aspect-[3/4] flex items-end flex-col rounded-xl overflow-hidden">
      <img
        src={props.image}
        alt={props.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-4 left-4 z-10">
        <Button href={props.href} animate="bg">
          {props.title}
        </Button>
      </div>
    </li>
  );
}
