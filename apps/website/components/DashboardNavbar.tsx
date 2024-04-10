"use client";

import { useState } from "react";
import { CaretDown } from "phosphor-react-sc";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "./Link";

export default function DashboardNavigation() {
  return (
    <NavigationMenu.Root className="sticky top-28 max-sm:top-20 max-lg:flex hidden">
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="border border-darkgrey bg-black rounded-lg h-10 text-white flex w-[calc(100vw_-_64px)] max-sm:w-[calc(100vw_-_32px)] justify-between items-center px-4">
            Dashboard
            <CaretDown className="w-5 h-5 text-white" />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="border border-darkgrey bg-black rounded-lg absolute left-0 w-[calc(100vw_-_32px)] mt-2 flex flex-col gap-4 p-4">
            <ul className="flex flex-col gap-1">
              {/* <NavItem href="/dashboard">Dashboard</NavItem> */}
              <NavItem href="/rounds">Rounds</NavItem>
              <NavItem href="/shop">Shop</NavItem>
              <NavItem href="/profile">Profile</NavItem>
            </ul>
            <div className="flex flex-col gap-2">
              <h2 className="text-white font-bebas-neue text-xl">Discussion</h2>
              <ul className="grid grid-cols-10 gap-2">
                <GameIcon src="/logo/logo.svg" href="/chat/nouns-esports" />
                <GameIcon src="/nouns.png" href="/chat/nouns" />
                <GameIcon src="/esports.png" href="/chat/esports" />
                <GameIcon src="/games/icons/dota-2.png" href="/chat/dota-2" />
                <GameIcon
                  src="/games/icons/rocket-league.png"
                  href="/chat/rocket-league"
                />
                <GameIcon
                  src="/games/icons/smash-melee.png"
                  href="/chat/smash"
                />
                <GameIcon src="/games/icons/cs2.png" href="/chat/cs2" />
                <GameIcon
                  src="/games/icons/valorant.png"
                  href="/chat/valorant"
                />
                <GameIcon
                  src="/games/icons/league-of-legends.png"
                  href="/chat/league"
                />
                <GameIcon
                  src="/games/icons/street-fighter.png"
                  href="/chat/streetfighter"
                />
              </ul>
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

function NavItem(props: { children: string; href: string }) {
  return (
    <NavigationMenu.Link className="group" asChild>
      <Link
        href={props.href}
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
        className="w-full aspect-square rounded-lg p-1 border border-grey"
      >
        <img
          className="w-full h-full object-cover object-center rounded-full"
          src={props.src}
        />
      </Link>
    </NavigationMenu.Link>
  );
}
