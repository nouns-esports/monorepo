"use client";

import { ShoppingCartSimple, Trophy } from "phosphor-react-sc";
import Link from "./Link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  return (
    <>
      <ul className="flex flex-col gap-2 bg-grey-800 p-4 rounded-xl">
        <Button
          route="/rounds"
          icon={<Trophy className="w-5 h-5 text-white" weight="fill" />}
        >
          Rounds
        </Button>
        <Button
          route="/nexus"
          icon={<img src="/nexus-logo.png" className="w-5 h-5" />}
        >
          Nexus
        </Button>
        <Button
          route="/shop"
          icon={
            <ShoppingCartSimple className="w-5 h-5 text-white" weight="fill" />
          }
          newTab
        >
          Shop
        </Button>
      </ul>
      <div className="flex flex-col gap-2 bg-grey-800 p-4 rounded-xl">
        <h2 className="font-bebas-neue text-xl text-white">Communities</h2>
        <ul className="flex flex-col gap-2">
          <Button
            route="https://warpcast.com/~/channel/nouns-esports"
            icon="/logo/logo.svg"
            newTab
          >
            Nouns Esports
          </Button>
          <Button
            route="https://warpcast.com/~/channel/nouns"
            icon="/nouns.png"
            newTab
          >
            Nouns
          </Button>
          <Button
            route="https://warpcast.com/~/channel/esports"
            icon="/esports.png"
            newTab
          >
            Esports
          </Button>
          <Button
            route="https://warpcast.com/~/channel/dota-2"
            icon="/games/icons/dota-2.png"
            newTab
          >
            Dota 2
          </Button>
          <Button
            route="https://warpcast.com/~/channel/rocket-legaue"
            icon="/games/icons/rocket-league.png"
            newTab
          >
            Rocket League
          </Button>
          <Button
            route="https://warpcast.com/~/channel/smash"
            icon="/games/icons/smash-melee.png"
            newTab
          >
            Smash
          </Button>
          <Button
            route="https://warpcast.com/~/channel/cs2"
            icon="/games/icons/cs2.png"
            newTab
          >
            CS 2
          </Button>
          <Button
            route="https://warpcast.com/~/channel/valorant"
            icon="/games/icons/valorant.png"
            newTab
          >
            Valorant
          </Button>
          <Button
            route="https://warpcast.com/~/channel/league"
            icon="/games/icons/league-of-legends.png"
            newTab
          >
            League of Legends
          </Button>
          <Button
            route="https://warpcast.com/~/channel/streetfighter"
            icon="/games/icons/street-fighter.png"
            newTab
          >
            Street Fighter
          </Button>
        </ul>
      </div>
    </>
  );
}

function Button(props: {
  icon?: React.ReactNode | string;
  route: string;
  children: React.ReactNode;
  newTab?: boolean;
}) {
  const pathname = usePathname();

  return (
    <Link href={props.route} newTab={props.newTab}>
      <li
        style={{
          backgroundColor: pathname.match(
            new RegExp(`^${props.route}(\\/.*)?$`)
          )
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
