"use client";

import {
  HouseSimple,
  ShoppingCartSimple,
  Trophy,
  User,
} from "phosphor-react-sc";
import Link from "./Link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  return (
    <div className="fixed left-0 flex justify-center w-full">
      <div className="flex justify-between w-full max-w-[1920px] px-16 max-2xl:px-8 max-sm:px-4">
        <aside className="flex flex-col gap-4 w-60">
          <ul className="flex flex-col gap-2 bg-darkgrey p-4 rounded-xl">
            <Button
              route="/dashboard"
              icon={
                <HouseSimple className="w-5 h-5 text-white" weight="fill" />
              }
            >
              Home
            </Button>
            <Button
              route="/vote"
              icon={<Trophy className="w-5 h-5 text-white" weight="fill" />}
            >
              Rounds
            </Button>
            <Button
              route="/shop"
              icon={
                <ShoppingCartSimple
                  className="w-5 h-5 text-white"
                  weight="fill"
                />
              }
            >
              Shop
            </Button>
            <Button
              route="/profile"
              icon={<User className="w-5 h-5 text-white" weight="fill" />}
            >
              Profile
            </Button>
          </ul>
          <div className="flex flex-col gap-2 bg-darkgrey p-4 rounded-xl">
            <h2 className="font-bebas-neue text-xl text-white">Discussion</h2>
            <ul className="flex flex-col gap-2">
              <Button route="/chat/nouns-esports" icon="/logo/logo.svg">
                Nouns Esports
              </Button>
              <Button route="/chat/nouns" icon="/nouns.png">
                Nouns
              </Button>
              <Button route="/chat/esports" icon="/esports.png">
                Esports
              </Button>
              <Button route="/chat/dota-2" icon="/games/icons/dota-2.png">
                Dota 2
              </Button>
              <Button
                route="/chat/rocket-legaue"
                icon="/games/icons/rocket-league.png"
              >
                Rocket League
              </Button>
              <Button route="/chat/smash" icon="/games/icons/smash-melee.png">
                Smash
              </Button>
              <Button route="/chat/cs2" icon="/games/icons/cs2.png">
                CS 2
              </Button>
              <Button route="/chat/valorant" icon="/games/icons/valorant.png">
                Valorant
              </Button>
              <Button
                route="/chat/league"
                icon="/games/icons/league-of-legends.png"
              >
                League of Legends
              </Button>
              <Button
                route="/chat/streetfighter"
                icon="/games/icons/street-fighter.png"
              >
                Street Fighter
              </Button>
            </ul>
          </div>
        </aside>
        <aside className="flex flex-col gap-4 max-xl:hidden">
          <div className="flex flex-col gap-4 h-60 w-80 bg-purple/20 p-4 rounded-xl border-4 border-purple/35" />
          <Link href="/discord">
            <img
              src="https://cdn2.unrealengine.com/what-is-discord-1920x1080-c3d90ca45f57.jpg"
              className="flex flex-col gap-4 h-40 w-80 bg-darkgrey rounded-xl"
            />
          </Link>
        </aside>
      </div>
    </div>
  );
}

function Button(props: {
  icon?: React.ReactNode | string;
  route: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Link href={props.route}>
      <li
        style={{
          backgroundColor: pathname.includes(props.route)
            ? "#E93737"
            : undefined,
        }}
        className="hover:bg-white/5 text-white rounded-lg px-2 py-1 flex items-center gap-3"
      >
        {props.icon ? (
          typeof props.icon === "string" ? (
            <img src={props.icon} className="w-5 h-5 rounded-full" />
          ) : (
            props.icon
          )
        ) : (
          ""
        )}
        <p>{props.children}</p>
      </li>
    </Link>
  );
}
