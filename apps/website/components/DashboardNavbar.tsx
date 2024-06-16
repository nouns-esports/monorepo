"use client";

import { CaretDown } from "phosphor-react-sc";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "./Link";
import type { Channel } from "@neynar/nodejs-sdk/build/neynar-api/v2";

export default function DashboardNavigation(props: { channels: Channel[] }) {
  return (
    <NavigationMenu.Root className="relative z-50 max-lg:flex hidden">
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="border border-grey-800 bg-black rounded-lg h-10 text-white flex w-[calc(100vw_-_64px)] max-sm:w-[calc(100vw_-_32px)] justify-between items-center px-4">
            Dashboard
            <CaretDown className="w-5 h-5 text-white" />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="border border-grey-800 bg-black rounded-lg absolute left-0 w-[calc(100vw_-_32px)] mt-2 flex flex-col gap-4 p-4">
            <ul className="flex flex-col gap-1">
              <NavItem href="/rounds">Rounds</NavItem>
              <NavItem href="/nexus">Nexus</NavItem>
              <NavItem href="/shop" newTab>
                Shop
              </NavItem>
            </ul>
            <div className="flex flex-col gap-2">
              <h2 className="text-white font-bebas-neue text-xl">Discussion</h2>
              <ul className="grid grid-cols-10 max-sm:grid-cols-6 gap-2">
                {props.channels.map((channel) => (
                  <GameIcon
                    key={channel.id}
                    src={channel.image_url ?? ""}
                    href={`/chat/${channel.id}`}
                  />
                ))}
              </ul>
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

function NavItem(props: { children: string; href: string; newTab?: boolean }) {
  return (
    <NavigationMenu.Link className="group" asChild>
      <Link
        href={props.href}
        newTab={props.newTab}
        className="group-hover:text-white flex items-center gap-3 text-white/30 text-nowrap transition-colors"
      >
        {props.children}
      </Link>
    </NavigationMenu.Link>
  );
}

function GameIcon(props: { src: string; href: string }) {
  return (
    <NavigationMenu.Link className="group" asChild>
      <Link
        href={props.href}
        newTab
        className="w-full aspect-square rounded-lg p-1 border border-grey-600"
      >
        <img
          className="w-full h-full object-cover object-center rounded-full"
          src={props.src}
        />
      </Link>
    </NavigationMenu.Link>
  );
}
