import Button from "@/components/Button";
import Link from "@/components/Link";
import Image from "next/image";
import PokemonImage from "@/public/pokemon3.jpg";
import NounsPartnerImage from "@/public/partners/nouns/wordmark.png";
import MatchaPartnerImage from "@/public/partners/matcha/wordmark.svg";
import AdidasPartnerImage from "@/public/partners/adidas/wordmark.svg";
import Gallery from "@/components/Gallery";
import { getVideos } from "@/server/queries/youtube";
import Attribution from "@/components/Attribution";
import { getTrendingPosts } from "@/server/queries/discussion";
import { ArrowRight, ChevronUp } from "lucide-react";
import { roundState } from "@/utils/roundState";
import { getRounds } from "@/server/queries/rounds";
import { twMerge } from "tailwind-merge";
import { getUser } from "@/server/queries/users";
import { userToProfile } from "@/utils/userToProfile";
import { getCreator } from "@/server/queries/creations";

export default async function Home() {
  const videos = await getVideos();

  const trendingPosts = await getTrendingPosts();

  const rounds = await getRounds({ limit: 4 });

  return (
    <div className="flex flex-col gap-16 mb-16 max-sm:mb-8 max-lg:gap-12 pt-32 max-xl:pt-28 max-sm:pt-20">
      <div className="flex gap-4 h-[30vw] max-h-[600px] max-lg:h-auto max-lg:max-h-none w-full px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4 max-lg:flex-col">
        <Gallery />
        <div className="flex flex-col gap-2 bg-gradient-to-b from-[#8A63D2] to-[#473072] rounded-xl overflow-hidden w-full h-full max-lg:hidden">
          <div className="flex items-center justify-between px-4 pt-3">
            <div className="flex items-center text-2xl font-luckiest-guy gap-3 text-white ">
              <img
                src="/farcaster.svg"
                draggable={false}
                className="w-6 h-6 select-none"
              />
              Discussion
            </div>
            <Link
              href="https://warpcast.com/~/channel/nouns-esports"
              className="flex text-white font-semibold gap-1 items-center group hover:opacity-70 transition-opacity"
            >
              View All
              <ArrowRight className="w-[1.15rem] h-[1.15rem] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <ul className="relative flex flex-col h-full overflow-hidden px-2">
            {trendingPosts.map((post) => (
              <li key={post.hash}>
                <Link
                  newTab
                  href={`https://warpcast.com/${post.author.username}/${post.hash.substring(0, 10)}`}
                  className="flex justify-between w-full h-14 hover:bg-black/10 transition-colors rounded-xl pl-2 py-2 pr-4"
                >
                  <div className="flex gap-2">
                    <img
                      src={post.author.pfp_url}
                      alt={post.author.display_name}
                      className="h-full aspect-square rounded-full"
                    />
                    <div className="flex flex-col h-full w-full">
                      <p className="text-white font-semibold text-sm">
                        {post.author.display_name}
                      </p>
                      <p className="text-white text-sm overflow-hidden">
                        {post.text}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1 items-center text-white">
                    <ChevronUp className="w-5 h-5" />
                    {post.reactions.likes_count}
                  </div>
                </Link>
              </li>
            ))}
            <div className="-mx-2 from-transparent to-[#473072] bg-gradient-to-b h-16 w-full bottom-0 absolute pointer-events-none" />
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-4 px-32 max-2xl:px-16 max-xl:px-8 max-lg:px-0">
        <div className="flex justify-between items-center max-lg:px-8 max-sm:px-4">
          <h2 className="font-luckiest-guy text-white text-4xl max-sm:text-3xl">
            Rounds
          </h2>
          <Link
            href="/rounds"
            className="text-red flex gap-1 items-center group"
          >
            View All
            <ArrowRight className="w-[1.15rem] h-[1.15rem] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <ul className="flex gap-4 justify-between max-lg:w-full max-lg:overflow-x-scroll max-lg:px-8 max-sm:px-4 max-lg:scrollbar-hidden">
          {rounds.map((round) => {
            const state = roundState(round);

            return (
              <li
                className="flex p-4 w-full bg-grey-800 rounded-xl hover:bg-grey-600 transition-colors min-h-56 max-2xl:min-h-[auto] max-lg:aspect-[14/9] max-lg:w-auto max-lg:h-52"
                key={round.id}
              >
                <Link
                  href={`/rounds/${round.id}`}
                  className="flex gap-8 flex-col w-full"
                >
                  <div className="flex justify-between items-center">
                    <img
                      src={round.image}
                      className="w-14 h-14 max-2xl:w-12 max-2xl:h-12 rounded-lg object-cover"
                    />
                    <p
                      className={twMerge(
                        "bg-red rounded-full px-3 py-1 text-[0.95rem] max-2xl:text-sm text-white font-semibold",
                        state === "Proposing" && "bg-blue-700",
                        state === "Voting" && "bg-purple"
                      )}
                    >
                      {state}
                    </p>
                  </div>
                  <div className="flex justify-center flex-col gap-1">
                    <h3 className="text-2xl max-2xl:text-[1.4rem] max-2xl:leading-7 font-bebas-neue text-white line-clamp-1">
                      {round.name}
                    </h3>
                    <p className="text-[1.05rem] leading-snug max-2xl:text-[0.95rem] line-clamp-2">
                      {round.description}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex flex-col gap-4 px-32 max-2xl:px-16 max-xl:px-8 max-lg:px-0">
        <div className="flex justify-between items-center max-lg:px-8 max-sm:px-4">
          <h2 className="font-luckiest-guy text-white text-4xl max-sm:text-3xl">
            Videos
          </h2>
          <Link
            href="/youtube"
            className="text-red flex gap-1 items-center group"
          >
            View All
            <ArrowRight className="w-[1.15rem] h-[1.15rem] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <ul className="flex gap-4 justify-between max-lg:w-full max-lg:overflow-x-scroll max-lg:px-8 max-sm:px-4 max-lg:scrollbar-hidden">
          {videos.map((video) => (
            <li key={video.id} className="w-full h-min group">
              <Link
                href={`https://youtube.com/watch?v=${video.id}`}
                className="flex flex-col gap-2 w-full"
                newTab
              >
                <div className="rounded-xl overflow-hidden w-full rotate-[0.01deg] aspect-video max-lg:w-[300px]">
                  <Image
                    draggable={false}
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="rounded-xl select-none group-hover:scale-105 transition-transform"
                  />
                </div>
                <h3 className="group-hover:text-white transition-colors">
                  {video.title}
                </h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-4 px-32 max-2xl:px-16 max-xl:px-8 max-lg:px-0">
        <h2 className="font-luckiest-guy text-white text-4xl max-lg:pl-8 max-sm:pl-4 max-sm:text-3xl">
          Explore
        </h2>
        <ul className="flex gap-4 rotate-[0.01deg] max-lg:overflow-x-scroll max-lg:px-8 max-sm:px-4 max-lg:scrollbar-hidden">
          <ExploreCard href="/shop" title="Shop" image="/explore/shop.png" />
          <ExploreCard
            href="/rosters"
            title="Our Rosters"
            image="/explore/rosters.png"
          />
          <ExploreCard
            href="/events"
            title="Events"
            image="/explore/events.png"
          />
          <ExploreCard
            href="/partners"
            title="Become a partner"
            image="/explore/partners.png"
          />
        </ul>
      </div>
      <div className="flex flex-col items-center gap-4 py-16 max-sm:py-8 max-[450px]:gap-8">
        <h3 className="text-white text-4xl font-luckiest-guy max-sm:text-3xl">
          Partners
        </h3>
        <div className="flex justify-center items-center gap-10 w-full max-[450px]:gap-6">
          <Link href="https://nouns.wtf">
            <Image
              draggable={false}
              alt="NounsDAO"
              src={NounsPartnerImage}
              className="h-10 max-sm:h-8 max-[450px]:h-6 select-none hover:opacity-70 transition-opacity w-auto"
            />
          </Link>
          <Link href="/matcha">
            <Image
              alt="Matcha"
              draggable={false}
              src={MatchaPartnerImage}
              className="h-8 max-sm:h-6 max-[450px]:h-5 select-none hover:opacity-70 transition-opacity w-auto"
            />
          </Link>
          <Link href="https://adidas.com">
            <Image
              alt="Adidas"
              draggable={false}
              src={AdidasPartnerImage}
              className="h-12 max-sm:h-10 max-[450px]:h-8 select-none hover:opacity-70 transition-opacity w-auto"
            />
          </Link>
        </div>
      </div>
      <div className="relative flex flex-col gap-4 w-full overflow-hidden">
        <div className="flex gap-4 w-full h-60 max-sm:h-40 animate-art-marquee-top">
          {await Promise.all(
            [
              "QmUMouSSMHhmuPrEs3QUSUjNvfssPoe5k9iXj2dqtXQQ8v",
              "QmU11vkWikFLWxipJ9Nu1RKnfjzpyPGnjhBhrhn6GJcFz9",
              "QmVtrefNQxvgDkwZz8yr6L8mqUuWMnCcL6fbVW7GLK345d",
              "QmYerHVfTANfCmMNvWZdRMJDt5cjotuexaTG5DQgHqFmCn",
              "QmXP7Yq4j4bqiKzgsynfF8AgKZ3vM6Ldq5aCKRGmNh2ScA",
              "QmYeLkcYghV4qkRBeMY12Z352EoLJwzbLWK8JsvbREHfo3",
              "QmdiWQoQpy3D5wpi9pSn6n2uJXyugwcv8rvQoaZnWhotKz",
              "QmUMouSSMHhmuPrEs3QUSUjNvfssPoe5k9iXj2dqtXQQ8v",
              "QmU11vkWikFLWxipJ9Nu1RKnfjzpyPGnjhBhrhn6GJcFz9",
              "QmVtrefNQxvgDkwZz8yr6L8mqUuWMnCcL6fbVW7GLK345d",
              "QmYerHVfTANfCmMNvWZdRMJDt5cjotuexaTG5DQgHqFmCn",
              "QmXP7Yq4j4bqiKzgsynfF8AgKZ3vM6Ldq5aCKRGmNh2ScA",
              "QmYeLkcYghV4qkRBeMY12Z352EoLJwzbLWK8JsvbREHfo3",
              "QmdiWQoQpy3D5wpi9pSn6n2uJXyugwcv8rvQoaZnWhotKz",
            ].map(async (image) => {
              const creator = await getCreator({ creationId: image });

              return (
                <Link
                  key={image}
                  href={`/creations/${image.substring(0, 10)}`}
                  className="relative h-full w-auto group"
                >
                  <img
                    alt="Artwork"
                    src={`https://ipfs.nouns.gg/ipfs/${image}`}
                    draggable={false}
                    className="h-full max-w-none object-cover rounded-xl select-none"
                  />
                  <div className="absolute top-3 right-3 h-7 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
                    <Attribution id={image} creator={creator} />
                  </div>
                </Link>
              );
            })
          )}
        </div>
        <div className="flex flex-row-reverse gap-4 h-60 max-sm:h-40 animate-art-marquee-bottom">
          {await Promise.all(
            [
              "QmYfT8Wh7o5YtsfpjYmzWeVpuNVkz2UGYPMti2aEBoMFWs",
              "QmPnd7ayCPYp5VYrmfyYLkjeA9wJtQAXkS46wBiY1VAhta",
              "QmTrfSzw8q5weZRmApCkC2Te3e6Vn87fN2s49G9Kbj9Wkd",
              "QmUTghthVwuidV6v7sJnKrbci8Ro2HQRx8huSgpxZz2G3g",
              "QmbKGhDNHSujAJeqJtURW29DuDWtKoFcfx1Eprkjk1movp",
              "QmUE853Ad1yns6UAUCbYjK6iBtxx5e5EihJfCFAAUh5aYb",
              "QmYfT8Wh7o5YtsfpjYmzWeVpuNVkz2UGYPMti2aEBoMFWs",
              "QmPnd7ayCPYp5VYrmfyYLkjeA9wJtQAXkS46wBiY1VAhta",
              "QmTrfSzw8q5weZRmApCkC2Te3e6Vn87fN2s49G9Kbj9Wkd",
              "QmUTghthVwuidV6v7sJnKrbci8Ro2HQRx8huSgpxZz2G3g",
              "QmbKGhDNHSujAJeqJtURW29DuDWtKoFcfx1Eprkjk1movp",
              "QmUE853Ad1yns6UAUCbYjK6iBtxx5e5EihJfCFAAUh5aYb",
            ].map(async (image) => {
              const creator = await getCreator({ creationId: image });

              return (
                <Link
                  key={image}
                  href={`/creations/${image.substring(0, 10)}`}
                  className="relative h-full w-auto group"
                >
                  <img
                    alt="Artwork"
                    src={`https://ipfs.nouns.gg/ipfs/${image}`}
                    draggable={false}
                    className="h-full max-w-none object-cover rounded-xl select-none"
                  />
                  <div className="absolute top-3 right-3 h-7 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
                    <Attribution id={image} creator={creator} />
                  </div>
                </Link>
              );
            })
          )}
        </div>
        <div className="relative">
          <div className="flex flex-col items-center pt-32 max-sm:pt-16 gap-8 bg-gradient-to-t from-[#171717] to-black px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
            <h3 className="font-luckiest-guy text-4xl max-sm:text-3xl text-white text-center">
              Explore our community of creators
            </h3>
            <Button href="/creations">Explore</Button>
          </div>
          <Link href="/creations/QmV83sDpdb" className="relative group">
            <img
              src="https://ipfs.nouns.gg/ipfs/QmV83sDpdbU2E23txL1hY7F6W81SjD4Egz41yCB5YQibQg"
              alt="Pokemon wearing Nouns noggles"
              draggable={false}
              className="w-full select-none max-md:w-auto max-md:h-80 max-md:object-cover"
            />
            <div className="absolute z-10 top-8 right-16 h-8 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
              <Attribution id="QmV83sDpdb" />
            </div>
          </Link>
          <div className="from-transparent to-black bg-gradient-to-b h-2/5 w-full bottom-0 absolute pointer-events-none" />
        </div>
        <div className="from-transparent to-black bg-gradient-to-r w-32 h-full right-0 bottom-0 absolute pointer-events-none max-[1920px]:hidden flex" />
        <div className="from-transparent to-black bg-gradient-to-l w-32 h-full left-0 bottom-0 absolute pointer-events-none max-[1920px]:hidden flex" />
      </div>
    </div>
  );
}

function ExploreCard(props: { image: string; title: string; href: string }) {
  return (
    <li className="w-full group relative aspect-[3/4] rounded-xl overflow-hidden max-lg:min-w-[300px]">
      <Link href={props.href} className="flex h-full items-end flex-col">
        <Image
          src={props.image}
          alt={props.title}
          draggable={false}
          quality={100}
          fill
          className="object-cover group-hover:scale-105 scale-100 transition-transform select-none"
        />
        <div className="absolute bottom-4 left-4 z-10">
          <Button href={props.href}>{props.title}</Button>
        </div>
      </Link>
    </li>
  );
}
