import Link from "@/components/Link";
import { getAuthenticatedUser } from "@/server/queries/users";
import SignInButton from "./SignInButton";
import {
  Shapes,
  Users,
  ShoppingBag,
  ArrowRight,
  Dot,
  ChevronRight,
  Trophy,
} from "lucide-react";
import Banner from "./Banner";
import { getCommunities } from "@/server/queries/communities";
import Image from "next/image";
import { getRosters } from "@/server/queries/rosters";
import Menu from "./Menu";

const events = [
  {
    image:
      "https://pbs.twimg.com/profile_images/1499195152639926276/t4_WbYMx_400x400.jpg",
    title: "Cody",
    type: "live",
  },
  {
    image:
      "https://pbs.twimg.com/profile_images/1661386831986929666/7rLLJevv_400x400.jpg",
    title: "Matcha Cup",
    type: "event",
  },
  {
    image:
      "https://pbs.twimg.com/profile_images/1747421219639476224/Y3tlMuWt_400x400.jpg",
    title: "Contributor Call",
    type: "event",
  },
];

export default async function Header() {
  const user = await getAuthenticatedUser(true);

  const communities = await getCommunities();

  const rosters = await getRosters({ limit: 4 });

  return (
    <>
      <Banner />
      <header className="sticky top-0 w-full z-[60] flex justify-center">
        <div className="relative w-full max-w-[1920px]">
          <div className="pointer-events-none absolute top-0 w-full flex items-center justify-between px-16 h-32 max-xl:h-28 max-xl:px-8 max-sm:px-4 max-sm:h-20 z-40">
            <div className="flex gap-16 max-xl:gap-8 max-[430px]:gap-4 items-center">
              <Link
                href="/"
                className="pointer-events-auto flex gap-4 h-12 max-sm:h-10 max-sm:gap-3 group items-center cursor-pointer select-none"
              >
                <img
                  src="/logo/logo.svg"
                  draggable={false}
                  className="group-hover:rotate-[14deg] h-full transition-transform duration-150 select-none relative z-[60]"
                />
                <div className="text-white font-luckiest-guy text-4xl max-sm:text-3xl select-none max-xl:hidden">
                  Nouns
                </div>
              </Link>
              <nav className="pointer-events-auto flex items-center gap-8">
                <Menu />
                <ul className="flex gap-6 items-center text-white max-md:gap-0">
                  <Group title="Esports" icon={<Trophy className="w-5 h-5" />}>
                    <div className="flex flex-col gap-0">
                      <Link
                        href="/about"
                        className="text-nowrap hover:bg-grey-500 transition-colors py-3 px-3 rounded-lg"
                      >
                        <p className="font-bebas-neue text-lg">Our Story</p>
                        <p className="text-grey-200">
                          Learn more about our mission
                        </p>
                      </Link>
                      <Link
                        href="/partners"
                        className="text-nowrap hover:bg-grey-500 transition-colors py-3 px-3 rounded-lg"
                      >
                        <p className="font-bebas-neue text-lg">Partners</p>
                        <p className="text-grey-200">Partner with us</p>
                      </Link>

                      <div className="text-nowrap gap-2 flex flex-col py-3">
                        <div className="flex justify-between items-center px-3">
                          <p className="font-bebas-neue text-lg">Rosters</p>
                          <Link
                            href="/rosters"
                            className="text-red text-sm flex gap-1 items-center group/rosters"
                          >
                            View All
                            <ArrowRight className="w-4 h-4 group-hover/rosters:translate-x-0.5 transition-transform" />
                          </Link>
                        </div>
                        <div className="px-1.5 grid grid-cols-2 w-80">
                          {rosters.map((roster) => (
                            <Link
                              key={roster.id}
                              href={`/rosters/${roster.id}`}
                              className="flex items-center gap-2 rounded-lg px-2 py-2 hover:bg-grey-500 transition-colors w-full"
                            >
                              <img
                                src={roster.community.image}
                                alt={`Our ${roster.name} roster`}
                                className="w-6 h-6 rounded-md object-cover"
                              />
                              <p className="text-nowrap">{roster.name}</p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Group>
                  <Group
                    title="Get Involved"
                    icon={<Shapes className="w-5 h-5" />}
                  >
                    <ul className="flex flex-col gap-0">
                      <li className="text-nowrap hover:bg-grey-500 transition-colors py-3 px-3 rounded-lg">
                        <Link href="/rounds">
                          <p className="font-bebas-neue text-lg">Rounds</p>
                          <p className="text-grey-200">
                            Govern who and what we fund
                          </p>
                        </Link>
                      </li>
                      <li className="text-nowrap hover:bg-grey-500 transition-colors py-3 px-3 rounded-lg">
                        <Link href="/discord">
                          <p className="font-bebas-neue text-lg">Discord</p>
                          <p className="text-grey-200">
                            Join the Discord server
                          </p>
                        </Link>
                      </li>
                      <li className="text-nowrap hover:bg-grey-500 transition-colors py-3 px-3 rounded-lg">
                        <Link href="/creations">
                          <p className="font-bebas-neue text-lg">Creations</p>
                          <p className="text-grey-200">
                            Explore our community of creators
                          </p>
                        </Link>
                      </li>
                    </ul>
                  </Group>
                  <Group
                    title="Communities"
                    icon={<Users className="w-5 h-5" />}
                  >
                    <div className="grid grid-cols-2 w-[22rem]">
                      {communities.map((community) => (
                        <Link
                          key={community.name}
                          href={`https://warpcast.com/~/${community.channels[0]}`}
                          className="flex items-center gap-2 rounded-lg px-2 py-2 hover:bg-grey-500 transition-colors w-full"
                        >
                          <img
                            src={community.image}
                            alt={community.name}
                            className="w-6 h-6 rounded-md object-cover"
                          />
                          <p className="text-nowrap">{community.name}</p>
                        </Link>
                      ))}
                    </div>
                  </Group>
                  <Link href="/shop">
                    <li className="flex gap-2 items-center opacity-100 hover:opacity-80 transition-opacity max-[430px]:hidden relative z-[60]">
                      <ShoppingBag className="w-5 h-5" />
                      Shop
                    </li>
                  </Link>
                </ul>
              </nav>
              {/* <div className="h-14">
                <ul className="relative group w-48 hover:h-40 pointer-events-auto">
                  {events.map((event, index) => (
                    <li
                      key={index}
                      className={twMerge(
                        "absolute bg-grey-800 rounded-lg w-full transition-all h-14 border border-grey-600 z-50 hover:bg-grey-600",
                        index === 1 &&
                          "scale-95 top-1.5 -z-10 group-hover:top-16 group-hover:scale-100 group-hover:z-40",
                        index === 2 &&
                          "scale-90 top-3 -z-20 group-hover:top-32 group-hover:scale-100 group-hover:z-30"
                      )}
                    >
                      <Link
                        href={`/events/${event.title}`}
                        className="flex items-center justify-between h-full pl-2 py-2 pr-1"
                      >
                        <div className="flex gap-2 items-center h-full">
                          <img
                            src={event.image}
                            alt={`${event.title} is ${event.type === "live" ? "live" : "happening now"}`}
                            className="h-full rounded-full"
                          />
                          <div className="flex flex-col gap-0.5">
                            <p className="text-sm text-white font-semibold">
                              {event.title}
                            </p>
                            <p className="text-xs text-red flex items-center gap-1">
                              <span className="w-1.5 h-1.5 bg-red rounded-full animate-pulse" />
                              Live
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="h-6" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div> */}
            </div>

            <div className="pointer-events-auto flex items-center relative z-[60]">
              <SignInButton user={user} />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

function Group(
  props: { title: string; children: React.ReactNode } & (
    | { icon?: React.ReactNode }
    | { image?: string }
  )
) {
  return (
    <li className="relative group flex">
      <div className="cursor-pointer opacity-100 hover:opacity-80 transition-opacity font-semibold flex justify-center gap-2 items-center max-md:hidden">
        {"icon" in props ? props.icon : ""}
        {"image" in props ? (
          <img src={props.image} className="w-5 h-5 rounded-full" />
        ) : (
          ""
        )}
        {props.title}
      </div>
      <div className="absolute top-6 -left-8 pt-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
        <div className="bg-grey-600 rounded-xl p-3 flex gap-2">
          {props.children}
        </div>
      </div>
    </li>
  );
}
