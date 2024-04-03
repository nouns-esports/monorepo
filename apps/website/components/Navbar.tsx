"use client";

import { List, X } from "phosphor-react-sc";
import SignInButton from "@/components/SignInButton";
import Link from "./Link";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { useEffect, useState } from "react";
import {
  TwitchLogo,
  TwitterLogo,
  YoutubeLogo,
  TiktokLogo,
  DiscordLogo,
  InstagramLogo,
} from "phosphor-react-sc";
import { usePathname, useParams } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();
  const params = useParams();

  useEffect(() => {
    setOpen(false);
  }, [params]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <NavigationMenu.Root>
        <NavigationMenu.List className="flex items-center bg-black border-darkgrey border rounded-full p-1.5 max-sm:p-1 z-50">
          <NavGroup title="Explore">
            <NavGroupItem href={`/${params.locale}/#events`} icon="📅">
              Events
            </NavGroupItem>
            <NavGroupItem href="/shop" icon="🛒">
              Shop
            </NavGroupItem>
            <NavGroupItem href={`/${params.locale}/#projects`} icon="🛠️">
              Projects
            </NavGroupItem>
            <NavGroupItem href={`/${params.locale}/partners`} icon="🤝">
              Partners
            </NavGroupItem>
          </NavGroup>
          <NavGroup title="Rosters">
            <NavGroupItem
              href={`/${params.locale}/rosters/cs2`}
              icon="/games/icons/cs2.png"
            >
              CS2
            </NavGroupItem>
            <NavGroupItem
              href={`/${params.locale}/rosters/dota-2`}
              icon="/games/icons/dota-2.png"
            >
              Dota 2
            </NavGroupItem>
            <NavGroupItem
              href={`/${params.locale}/rosters/smash-melee`}
              icon="/games/icons/smash-melee.png"
            >
              Smash Melee
            </NavGroupItem>
          </NavGroup>
          <div className="w-4 max-sm:hidden"></div>
          {/* <NavItem href={`/${params.locale}/pass`} icon="/logo/logo-white.svg">
            Pass
          </NavItem> */}
          <SignInButton />
          <div onClick={() => setOpen(!open)} className="max-sm:flex hidden">
            {open ? (
              <X className="w-6 h-6 mx-2" />
            ) : (
              <List className="w-6 h-6 mx-2" />
            )}
          </div>
          <NavigationMenu.Indicator className="flex items-center justify-center h-2">
            <div className="absolute top-1 w-2 h-2 bg-black rounded-sm rotate-45" />
          </NavigationMenu.Indicator>
        </NavigationMenu.List>
      </NavigationMenu.Root>
      <div
        style={{
          opacity: open ? "100%" : "0",
          pointerEvents: open ? "all" : "none",
        }}
        // onClick={() => setOpen(!open)}
        className="bg-black left-0 top-0 w-full h-screen absolute -z-10 pt-24 p-4 flex flex-col gap-8"
      >
        {/* <Link
          className="bg-darkgrey rounded-lg w-full min-h-40 overflow-hidden relative"
          href="/pass"
        >
          <img src="/pass.webp" alt="" className="w-full h-full object-cover" />
          <p className="text-white font-luckiest-guy text-4xl text-center flex items-center justify-center absolute top-0 w-full h-40">
            Become a pass member
          </p>
        </Link> */}
        <MenuGroup title="Explore">
          <MenuGroupItem href={`/${params.locale}/#events`} icon="📅">
            Events
          </MenuGroupItem>
          <MenuGroupItem href="/shop" icon="🛒">
            Shop
          </MenuGroupItem>
          <MenuGroupItem href={`/${params.locale}/#projects`} icon="🛠️">
            Projects
          </MenuGroupItem>
          <MenuGroupItem href={`/${params.locale}/partners`} icon="🤝">
            Partners
          </MenuGroupItem>
        </MenuGroup>
        <MenuGroup title="Rosters">
          <MenuGroupItem
            href={`/${params.locale}/rosters/cs2`}
            icon="/games/icons/cs2.png"
          >
            CS2
          </MenuGroupItem>
          <MenuGroupItem
            href={`/${params.locale}/rosters/dota-2`}
            icon="/games/icons/dota-2.png"
          >
            Dota 2
          </MenuGroupItem>
          <MenuGroupItem
            href={`/${params.locale}/rosters/smash-melee`}
            icon="/games/icons/smash-melee.png"
          >
            Smash Melee
          </MenuGroupItem>
        </MenuGroup>
        <div className="flex items-center gap-4 w-full h-full justify-center">
          <Link href="/discord">
            <DiscordLogo
              className="w-7 h-7 text-white hover:text-white/60 cursor-pointer transition-colors"
              weight="fill"
            />
          </Link>
          <Link href="/instagram">
            <InstagramLogo
              className="w-7 h-7 text-white hover:text-white/60 cursor-pointer transition-colors"
              weight="fill"
            />
          </Link>
          <Link href="/twitter">
            <TwitterLogo
              className="w-7 h-7 text-white hover:text-white/60 cursor-pointer transition-colors"
              weight="fill"
            />
          </Link>
          <Link href="/youtube">
            <YoutubeLogo
              className="w-7 h-7 text-white hover:text-white/60 cursor-pointer transition-colors"
              weight="fill"
            />
          </Link>
        </div>
      </div>
    </>
  );
}

function NavItem(props: { href: string; icon: string; children: string }) {
  return (
    <NavigationMenu.Item className="max-sm:hidden flex items-center mr-4 justify-center text-white/30 hover:bg-white/5 px-4 rounded-full hover:text-white h-10 transition-colors">
      <Link href={props.href} className="flex items-center gap-1.5 text-white">
        <img className="w-4 h-4" src={props.icon} />
        {props.children}
      </Link>
    </NavigationMenu.Item>
  );
}

function NavGroup(props: { title: string; children: React.ReactNode }) {
  return (
    <NavigationMenu.Item className="flex justify-center h-10 max-sm:hidden">
      <NavigationMenu.Trigger className=" hover:bg-white/5  text-white/30 px-4 rounded-full hover:text-white h-full transition-colors">
        {props.title}
      </NavigationMenu.Trigger>
      <NavigationMenu.Content className="absolute top-[60px] bg-black drop-shadow-lg border border-darkgrey rounded-xl py-4 px-6">
        <NavigationMenu.Sub>
          <NavigationMenu.List className="flex flex-col gap-2">
            {props.children}
          </NavigationMenu.List>
        </NavigationMenu.Sub>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  );
}

function NavGroupItem(props: { children: string; href: string; icon: string }) {
  return (
    <NavigationMenu.Item key={props.children}>
      <NavigationMenu.Link
        href={props.href}
        className="group flex items-center gap-3"
      >
        {props.icon.includes("/") ? (
          <img className="w-4 h-4 rounded-sm" src={props.icon} />
        ) : (
          <p>{props.icon}</p>
        )}
        <p className="group-hover:text-white text-white/30 text-nowrap transition-colors">
          {props.children}
        </p>
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  );
}

function MenuGroup(props: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-white text-2xl font-bebas-neue">{props.title}</p>
      <ul className="flex flex-col gap-2">{props.children}</ul>
    </div>
  );
}

function MenuGroupItem(props: {
  children: string;
  href: string;
  icon: string;
}) {
  return (
    <li>
      <Link href={props.href} className="flex items-center gap-2 text-lg">
        {props.icon.includes("/") ? (
          <img className="w-4 h-4 rounded-sm" src={props.icon} />
        ) : (
          <p>{props.icon}</p>
        )}
        <p className="text-white/30">{props.children}</p>
      </Link>
    </li>
  );
}
