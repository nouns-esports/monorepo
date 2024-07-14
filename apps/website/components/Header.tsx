import Link from "@/components/Link";
import { getAuthenticatedUser } from "@/server/queries/users";
import SignInButton from "./SignInButton";
import { Shapes, Users, ShoppingBag, ArrowRight } from "lucide-react";
import { twMerge } from "tailwind-merge";

const events = [
  { image: "", title: "Cody", type: "live" },
  { image: "", title: "Matcha Cup", type: "event" },
  { image: "", title: "Contributor Call", type: "event" },
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
                  className="group-hover:rotate-[14deg] w-12 max-sm:w-10 transition-transform duration-150"
                />
                <div className="text-white font-luckiest-guy text-4xl max-sm:text-3xl select-none">
                  Nouns
                </div>
              </Link>
              <ul className="relative group w-40 h-14">
                {events.map((event, index) => (
                  <li
                    className={twMerge(
                      "absolute bg-grey-800 rounded-lg w-full h-full border border-grey-500 transition-all pointer-events-auto",
                      index === 1 &&
                        "scale-95 top-1.5 -z-10 group-hover:top-16 group-hover:scale-100",
                      index === 2 &&
                        "scale-90 top-3 -z-20 group-hover:top-32 group-hover:scale-100"
                    )}
                  >
                    <Link href={""}></Link>
                  </li>
                ))}
              </ul>
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
