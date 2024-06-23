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
import { getProjects } from "@/server/queries/projects";

export default async function Home() {
  const events = await getEvents();

  const games = await getGames();

  const projects = await getProjects();

  const creators = await getCreators();

  const isMobile = headers().get("x-device-type") === "mobile";

  const posts = await getPosts();

  return (
    <main className="cursor-crosshair flex flex-col">
      <div className="relative h-screen bg-cover flex flex-col justify-center items-center gap-10 shadow-[inset_-80px_-80px_120px_black,inset_80px_80px_120px_black] max-sm:shadow-[inset_-40px_-40px_60px_black,inset_40px_40px_60px_black]">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute select-none w-full h-full object-cover object-top brightness-75 -z-10"
        >
          <source
            src={isMobile ? "/landing-mobile.webm" : "/landing.webm"}
            type="video/webm"
          />
          <source
            src={isMobile ? "/landing-mobile.mp4" : "/landing.mp4"}
            type="video/mp4"
          />
        </video>
        <h1 className="text-white text-6xl max-w-4xl w-1/2 text-center font-luckiest-guy max-lg:w-full max-lg:px-16 max-sm:px-8 max-md:text-5xl max-[450px]:text-4xl">
          Leading the revolution in <span className="text-red">community</span>{" "}
          driven <span className="text-red">esports</span>
        </h1>
        <div className="flex gap-8 max-md:flex-col items-center">
          <Button href="/rounds" animate="hover">
            Get Involved
          </Button>
          <Link
            href="https://www.youtube.com/watch?v=SAXzMQ8pPvE"
            className="text-white select-none hover:text-white/60 transition-colors group font-cabin flex gap-2 items-center"
          >
            <PlayCircle
              weight="bold"
              className="w-7 h-7 text-white transition-colors group-hover:text-white/60"
            />
            Watch Video
          </Link>
        </div>
        <div className="flex gap-4 items-center">
          <Link href="/discord">
            <DiscordLogo
              className="w-10 h-10 text-white hover:text-white/60 cursor-pointer transition-colors"
              weight="fill"
            />
          </Link>
          <Link href="/instagram">
            <InstagramLogo
              className="w-10 h-10 text-white hover:text-white/60 cursor-pointer transition-colors"
              weight="fill"
            />
          </Link>
          <Link href="/twitter">
            <TwitterLogo
              className="w-10 h-10 text-white hover:text-white/60 cursor-pointer transition-colors"
              weight="fill"
            />
          </Link>
          <Link href="/youtube">
            <YoutubeLogo
              className="w-10 h-10 text-white hover:text-white/60 cursor-pointer transition-colors"
              weight="fill"
            />
          </Link>
        </div>
      </div>
      <div className="bg-[url('/marquee.png')] bg-repeat-x bg-center bg-red h-8 w-full animate-marquee" />
      <div
        id="rosters"
        className="px-16 max-sm:px-0 py-32 max-sm:py-16 text-center text-white text-5xl font-luckiest-guy flex flex-col gap-20 max-sm:gap-10 items-center"
      >
        Our Rosters
        <div className="flex flex-wrap max-sm:flex-nowrap max-sm:overflow-x-scroll max-sm:justify-start justify-center max-w-[1920px] gap-16 w-full max-2xl:gap-8">
          {games.map((game) => (
            <GameCard
              key={game.id}
              id={game.id}
              image={game.image}
              name={game.name}
            />
          ))}
        </div>
      </div>
      <div
        id="creators"
        className="px-16 max-sm:px-0 pb-32 max-sm:py-16 text-center text-white text-5xl font-luckiest-guy flex flex-col gap-20 max-sm:gap-10 items-center"
      >
        Our Creators
        <div className="flex flex-wrap max-sm:flex-nowrap max-sm:overflow-x-scroll justify-center max-w-[1920px] gap-16 w-full max-2xl:gap-8">
          {creators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      </div>
      <div className="relative py-32 max-sm:py-20">
        <Image
          src={Prop}
          alt="2024 proposal background image"
          sizes="100vw"
          placeholder="blur"
          className="absolute -z-10 top-0 w-full h-full select-none object-cover object-center brightness-[50%]"
        />
        <div className="relative z-10 grid place-items-center gap-10 max-sm:gap-6 px-16 max-sm:px-8">
          <h2 className="text-white font-luckiest-guy text-5xl max-sm:text-3xl text-center">
            Welcome to the Nexus!
          </h2>
          <p className="max-w-[600px] px-8 text-center text-grey-200 text-lg max-sm:text-base leading-tight [text-shadow:black_0_0_50px]">
            We're offering a unique opportunity for esports enthusiasts to
            directly influence our major decisions. You'll be given the power to
            vote on key organizational decisions, making you an active
            participant in shaping our future.
          </p>
          <Button href="/nexus" animate="hover">
            Get Started
          </Button>
        </div>
        <div className="from-black to-transparent bg-gradient-to-b h-64 w-full top-0 absolute" />
        <div className="from-transparent to-black bg-gradient-to-b h-64 w-full bottom-0 absolute" />
      </div>

      <div
        id="events"
        className="px-16 max-sm:px-0 py-32 max-sm:py-16 text-white text-5xl text-center font-luckiest-guy flex flex-col gap-20 max-sm:gap-10 items-center"
      >
        Upcoming Events
        <div className="flex flex-wrap max-sm:flex-nowrap max-sm:overflow-x-scroll max-sm:justify-start justify-center max-w-[1920px] gap-16 w-full max-2xl:gap-8">
          {events.map((event) => (
            <ScheduleCard key={event.id} event={event} />
          ))}
        </div>
      </div>
      <div
        id="publications"
        className="px-16 max-sm:px-0 pb-32 max-sm:py-16 text-white text-5xl text-center font-luckiest-guy flex flex-col gap-20 max-sm:gap-10 items-center"
      >
        Publications
        <div className="flex flex-wrap max-sm:flex-nowrap max-sm:overflow-x-scroll max-sm:justify-start justify-center max-w-[1920px] gap-16 w-full max-2xl:gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
      <div className="px-16 max-sm:px-0 pb-32 max-sm:pb-16 text-white text-5xl font-luckiest-guy flex flex-col gap-12 max-sm:gap-6 items-center">
        Partners
        <div className="flex justify-center items-center max-w-[1920px] gap-20 w-full max-2xl:gap-10">
          <Link href="https://nouns.wtf">
            <img src="/nouns-partner-logo.png" className="h-10" />
          </Link>
          <Link href="/matcha">
            <img src="/matcha.svg" className="h-8" />
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <h2 className="text-white text-5xl font-luckiest-guy z-10 relative  text-center leading-normal px-16 max-sm:text-4xl max-sm:leading-relaxed">
          Lets{" "}
          <span className="relative text-green">
            redefine{" "}
            <svg
              viewBox="0 0 40 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute -bottom-3 -left-1.5 max-sm:-bottom-2 max-sm:-left-0.5 w-full"
            >
              <path
                d="M1.2417 2.61258C3.04409 2.49947 4.8292 2.15267 6.62401 1.97369C13.6525 1.27281 20.7035 1.11258 27.7814 1.11258C31.5762 1.11258 35.371 1.11258 39.1657 1.11258"
                strokeLinecap="round"
                stroke="#51D06D"
              />
            </svg>
          </span>{" "}
          esports together!
        </h2>
      </div>
      <div className="relative mb-8">
        <Image
          src={Pokemon}
          sizes="100vw"
          alt="Pokemon wearing Nouns noggles"
          placeholder="blur"
          className="w-full select-none"
        />
        <div className="from-black via-black/70 to-transparent bg-gradient-to-b h-2/5 w-full top-0 absolute"></div>
        <div className="from-transparent to-black bg-gradient-to-b h-2/5 w-full bottom-0 absolute"></div>
      </div>
    </main>
  );
}

function GameCard(props: { id: string; image: string; name: string }) {
  return (
    <Link
      href={`/rosters/${props.id}`}
      style={{ backgroundImage: `url(${props.image})` }}
      className="relative w-[calc(25%_-_3rem)] max-xl:w-[calc(25%_-_1.5rem)] max-sm:first:ml-8 max-sm:last:mr-8 max-sm:min-w-[calc(100%_-_6rem)] min-w-[12rem] rounded-xl select-none aspect-square group overflow-hidden"
    >
      <Image
        src={props.image}
        alt={props.name}
        width={400}
        height={400}
        className="object-cover object-center absolute w-full top-0 h-full brightness-[85%] group-hover:scale-110 transition-transform"
      />
      <div className="relative z-10 w-full h-full grid place-items-center shadow-[inset_-20px_-20px_80px_black,inset_20px_20px_80px_black]">
        <h3 className="drop-shadow-2xl text-center p-4 text-5xl max-2xl:text-4xl max-sm:text-3xl font-bebas-neue [text-shadow:black_0_0_30px]">
          {props.name}
        </h3>
      </div>
    </Link>
  );
}

function CreatorCard(props: { creator: Creator }) {
  return (
    <Link
      href={props.creator.twitter ?? ""}
      className="relative w-[calc(18%_-_3rem)] max-xl:w-[calc(18%_-_1.5rem)] //max-sm:first:ml-8 //max-sm:last:mr-8 max-sm:min-w-[calc(100%_-_10rem)] min-w-[12rem] rounded-xl select-none aspect-[21/30] group overflow-hidden"
    >
      <Image
        src={props.creator.image}
        alt={props.creator.name}
        width={400}
        height={400}
        className="object-cover object-center absolute w-full top-0 h-full brightness-[85%] group-hover:scale-110 transition-transform"
      />
      <div className="relative z-10 w-full h-full flex items-end justify-center shadow-[inset_-20px_-20px_80px_black,inset_20px_20px_80px_black]">
        <h3 className="drop-shadow-2xl text-center p-8 text-5xl max-2xl:text-4xl max-sm:text-3xl font-bebas-neue [text-shadow:black_0_0_30px]">
          {props.creator.name}
        </h3>
      </div>
    </Link>
  );
}

async function ScheduleCard(props: { event: Event }) {
  const type = props.event.summary?.split("]")[0].replace("[", "");

  const game = (await getGames()).find(
    (game) =>
      game.name.toLowerCase().includes(type.toLowerCase()) ||
      game.id.toLowerCase().includes(type.toLowerCase())
  );

  return (
    <Link
      href={props.event.htmlLink}
      className="relative w-[calc(33.33%_-_2.67rem)] max-xl:w-[calc(33.33%_-_2.67rem)] max-sm:first:ml-8 max-sm:last:mr-8 max-sm:min-w-[calc(100%_-_6rem)] min-w-[24rem] overflow-hidden select-none aspect-video text-left rounded-xl group drop-shadow-2xl"
    >
      <Image
        src={game?.image ?? "/contributor.webp"}
        width={800}
        height={450}
        alt={props.event.summary}
        className="object-cover object-center group-hover:scale-110 transition-transform absolute top-0 w-full h-full"
      />
      <div className="relative z-10 flex flex-col-reverse py-4 px-6 max-sm:py-3.5 max-sm:px-5 w-full h-full shadow-[inset_-20px_-20px_80px_black,inset_20px_20px_80px_black]">
        <p className="text-white text-base font-cabin">
          <Date timestamp={props.event.start.dateTime} />
        </p>
        <h3 className="drop-shadow-2xl text-4xl font-bebas-neue max-[500px]:text-2xl max-[350px]:text-xl">
          {props.event.summary?.replace(`[${type}]`, "")}
        </h3>
        <div className="text-xs font-cabin font-semibold px-2 py-1 bg-red rounded-full w-min mb-2 max-[500px]:mb-1 whitespace-nowrap">
          {type}
        </div>
      </div>
    </Link>
  );
}

function PostCard(props: {
  post: Awaited<ReturnType<typeof getPosts>>[number];
}) {
  return (
    <Link
      href={`/posts/${props.post.slug}`}
      className="relative w-[calc(33.33%_-_2.67rem)] max-xl:w-[calc(33.33%_-_2.67rem)] max-sm:first:ml-8 max-sm:last:mr-8 max-sm:min-w-[calc(100%_-_6rem)] min-w-[24rem] overflow-hidden select-none aspect-video text-left rounded-xl group drop-shadow-2xl"
    >
      <Image
        src={props.post.image}
        alt={props.post.title}
        fill
        className="object-cover object-center group-hover:scale-110 brightness-[85%] transition-transform absolute top-0 w-full h-full"
      />
      <div className="relative z-10 flex items-end w-full h-full shadow-[inset_-20px_-20px_80px_black,inset_20px_20px_80px_black]">
        <h3 className="text-2xl font-bebas-neue p-4 [text-shadow:black_0_0_30px]">
          {props.post.title}
        </h3>
      </div>
    </Link>
  );
}

function ProjectCard(props: { project: Project }) {
  return (
    <Link
      href={props.project.url}
      className="relative w-[calc(25%_-_3rem)] max-xl:w-[calc(25%_-_1.5rem)] max-sm:first:ml-8 max-sm:last:mr-8 max-sm:min-w-[calc(100%_-_6rem)] min-w-[20rem] overflow-hidden select-none aspect-video rounded-xl group drop-shadow-2xl"
    >
      <Image
        src={props.project.image}
        alt={props.project.name}
        width={400}
        height={225}
        className="object-cover object-center group-hover:scale-110 brightness-[85%] transition-transform absolute top-0 w-full h-full"
      />
      <div className="relative z-10 grid place-items-center w-full h-full shadow-[inset_-20px_-20px_80px_black,inset_20px_20px_80px_black]">
        <h3 className="text-4xl font-bebas-neue [text-shadow:black_0_0_30px]">
          {props.project.name}
        </h3>
      </div>
    </Link>
  );
}
