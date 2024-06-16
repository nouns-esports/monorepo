"use client";

import {
  PersonSimple,
  Scroll,
  ShoppingCartSimple,
  Trophy,
  User,
} from "phosphor-react-sc";
import Link from "./Link";
import { usePathname } from "next/navigation";
import type { Channel } from "@neynar/nodejs-sdk/build/neynar-api/v2";

export default function Sidebar(props: { channels: Channel[] }) {
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
          route="/quests"
          icon={<Scroll className="w-5 h-5 text-white" weight="fill" />}
          newTab
        >
          Quests
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
        <Button
          route="/profile"
          icon={<User className="w-5 h-5 text-white" weight="fill" />}
          newTab
        >
          Profile
        </Button>
      </ul>
      <div className="flex flex-col gap-2 bg-grey-800 p-4 rounded-xl">
        <h2 className="font-bebas-neue text-xl text-white">Communities</h2>
        <ul className="flex flex-col gap-2">
          {props.channels.map((channel) => (
            <Button
              key={channel.id}
              route={`/chat/${channel.id}`}
              icon={channel.image_url}
            >
              {channel.name}
            </Button>
          ))}
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
