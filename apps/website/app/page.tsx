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
import PokemonImage from "@/public/pokemon.webp";
import NounsPartnerImage from "@/public/nouns-partner-logo.png";
import MatchaPartnerImage from "@/public/matcha.svg";
import AdidasPartnerImage from "@/public/adidas.svg";
import Gallery from "@/components/Gallery";
import { getVideos } from "@/server/queries/youtube";
import Attribution from "@/components/Attribution";
import { getTrendingPosts } from "@/server/queries/discussion";
import { ArrowUpWideNarrow, ChevronUp } from "lucide-react";
import { getArtist } from "@/server/queries/art";

export default async function Home() {
  const videos = await getVideos();

  const trendingPosts = await getTrendingPosts();

  return (
    <div className="flex flex-col gap-16 mb-16 max-lg:gap-12">
      <div className="flex gap-4 h-[30vw] max-h-[600px] max-lg:h-auto max-lg:max-h-none w-full px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4 max-lg:flex-col">
        <Gallery />
        <div className="flex flex-col gap-2 bg-gradient-to-b from-[#8A63D2] to-[#473072] rounded-xl overflow-hidden w-full h-full max-lg:hidden">
          <div className="flex items-center text-2xl font-luckiest-guy gap-3 text-white px-4 pt-3">
            <img
              src="/farcaster.svg"
              draggable={false}
              className="w-6 h-6 select-none"
            />
            Discussion
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
        <h2 className="font-luckiest-guy text-white text-4xl max-lg:pl-8 max-sm:pl-4">
          Videos
        </h2>
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
        <h2 className="font-luckiest-guy text-white text-4xl max-lg:pl-8 max-sm:pl-4">
          Explore
        </h2>
        <ul className="flex gap-4 rotate-[0.01deg] max-lg:overflow-x-scroll max-lg:px-8 max-sm:px-4 max-lg:scrollbar-hidden">
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
            <Image
              draggable={false}
              alt="NounsDAO"
              src={NounsPartnerImage}
              className="h-10 max-sm:h-8 select-none hover:opacity-70 transition-opacity w-auto"
            />
          </Link>
          <Link href="/matcha">
            <Image
              alt="Matcha"
              draggable={false}
              src={MatchaPartnerImage}
              className="h-8 max-sm:h-6 select-none hover:opacity-70 transition-opacity w-auto"
            />
          </Link>
          <Link href="https://adidas.com">
            <Image
              alt="Adidas"
              draggable={false}
              src={AdidasPartnerImage}
              className="h-12 max-sm:h-10 select-none hover:opacity-70 transition-opacity w-auto"
            />
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full overflow-hidden">
        <div className="flex gap-4 w-full h-60 animate-art-marquee-top">
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
              const artist = await getArtist({ art: image.substring(0, 10) });

              return (
                <Link
                  key={image}
                  href={`/art/${image.substring(0, 10)}`}
                  className="relative h-full w-auto group"
                >
                  <img
                    alt="Artwork"
                    src={`https://ipfs.nouns.gg/ipfs/${image}`}
                    draggable={false}
                    className="h-full max-w-none object-cover rounded-xl select-none"
                  />
                  <div className="absolute top-3 right-3 h-7 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
                    <Attribution artist={artist} />
                  </div>
                </Link>
              );
            })
          )}
        </div>
        <div className="flex flex-row-reverse gap-4 h-60 animate-art-marquee-bottom">
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
              const artist = await getArtist({ art: image.substring(0, 10) });

              return (
                <Link
                  key={image}
                  href={`/art/${image.substring(0, 10)}`}
                  className="relative h-full w-auto group"
                >
                  <img
                    alt="Artwork"
                    src={`https://ipfs.nouns.gg/ipfs/${image}`}
                    draggable={false}
                    className="h-full max-w-none object-cover rounded-xl select-none"
                  />
                  <div className="absolute top-3 right-3 h-7 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
                    <Attribution artist={artist} />
                  </div>
                </Link>
              );
            })
          )}
        </div>
        <div className="relative">
          <div className="flex flex-col items-center pt-32 gap-8 bg-gradient-to-t from-[#171717] to-black px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
            <h3 className="font-luckiest-guy text-4xl text-white text-center">
              Explore our community of artists
            </h3>
            <Button href="/art">Explore</Button>
          </div>
          <Link href={""} className="relative group">
            <Image
              src={PokemonImage}
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
