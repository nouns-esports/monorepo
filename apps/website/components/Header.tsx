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
} from "lucide-react";
import { twMerge } from "tailwind-merge";

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

  return (
    <>
      <Link
        newTab
        href="/rounds"
        className="bg-red relative z-30 h-9 hover:brightness-[85%] transition-all text-white text-sm font-semibold w-full whitespace-nowrap flex items-center justify-center"
      >
        <div className="flex items-center justify-center">
          Explore rounds, vote for your favorite proposals, and more!
          <ArrowRight className="w-4 h-4 ml-1.5" />
        </div>
      </Link>
      <header className="sticky top-0 w-full z-[60] flex justify-center">
        <div className="relative w-full max-w-[1920px]">
          <div className="pointer-events-none absolute top-0 w-full flex items-center justify-between px-16 h-32 max-xl:h-28 max-xl:px-8 max-sm:px-4 max-sm:h-20 z-40">
            <div className="flex gap-8 items-center">
              <Link
                href="/"
                className="pointer-events-auto flex gap-4 max-sm:gap-3 group items-center cursor-pointer select-none"
              >
                <img
                  src="/logo/logo.svg"
                  draggable={false}
                  className="group-hover:rotate-[14deg] w-12 max-sm:w-10 transition-transform duration-150 select-none"
                />
                <div className="text-white font-luckiest-guy text-4xl max-sm:text-3xl select-none">
                  Nouns
                </div>
              </Link>
              <div className="h-14">
                <ul className="relative group w-48 hover:h-40 pointer-events-auto">
                  {events.map((event, index) => (
                    <li
                      key={index}
                      className={twMerge(
                        "absolute bg-grey-800 rounded-lg w-full transition-all h-14 border border-grey-600 z-50",
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
              </div>
            </div>
            <nav className="pointer-events-auto flex items-center gap-8">
              <ul className="flex gap-6 items-center text-white">
                <Group title="About Us" image="/logo/logo-white.svg">
                  About Us
                </Group>
                <Group
                  title="Get Involved"
                  icon={<Shapes className="w-5 h-5" />}
                >
                  About Us
                </Group>
                <Group title="Communities" icon={<Users className="w-5 h-5" />}>
                  About Us
                </Group>
                <Link href="/shop">
                  <li className="flex gap-2 items-center opacity-100 hover:opacity-80 transition-opacity">
                    <ShoppingBag className="w-5 h-5" />
                    Shop
                  </li>
                </Link>
              </ul>
              <SignInButton user={user} />
            </nav>
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
    <li className="relative group cursor-pointer opacity-100 hover:opacity-80 transition-opacity font-semibold flex justify-center gap-2 items-center">
      {"icon" in props ? props.icon : ""}
      {"image" in props ? (
        <img src={props.image} className="w-5 h-5 rounded-full" />
      ) : (
        ""
      )}
      {props.title}
      <div className="absolute top-8 pt-8 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
        {props.children}
      </div>
    </li>
  );
}
