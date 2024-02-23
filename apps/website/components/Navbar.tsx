"use client";

import ConnectButton from "./ConnectButton";
import Link from "./Link";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";

// Explore - Rosters, Our Story, Shop
// Contribute - Partners,

export default function Navbar() {
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List className="flex items-center bg-black border-darkgrey border rounded-full p-1.5">
        <NavItem
          title="Explore"
          content={[
            { name: "Our Story", href: "/our-story" },
            { name: "Shop", href: "/shop" },
            { name: "Partners", href: "/partners" },
          ]}
        />
        <NavItem
          title="Games"
          content={[
            { name: "CS2", href: "/games/cs2" },
            { name: "Dota 2", href: "/games/dota-2" },
            { name: "Smash Melee", href: "/games/smash-melee" },
          ]}
        />
        <NavigationMenu.Item className="flex items-center mr-4 justify-center text-white/30 hover:bg-white/5 px-4 rounded-full hover:text-white h-10 transition-colors">
          <Link href="/dashboard">
            <NavigationMenu.Link>Dashboard</NavigationMenu.Link>
          </Link>
        </NavigationMenu.Item>
        <ConnectButton />
        <NavigationMenu.Indicator className="flex items-center justify-center h-2">
          <div className="absolute top-1 w-2 h-2 bg-darkgrey rounded-sm rotate-45" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

function NavItem(props: {
  title: string;
  content: Array<{ name: string; href: string }>;
}) {
  return (
    <NavigationMenu.Item className="flex justify-center h-10">
      <NavigationMenu.Trigger className=" hover:bg-white/5  text-white/30 px-4 rounded-full hover:text-white h-full transition-colors">
        {props.title}
      </NavigationMenu.Trigger>
      <NavigationMenu.Content className="absolute top-[60px] bg-darkgrey drop-shadow-lg border border-grey rounded-xl py-4 px-6">
        <NavigationMenu.Sub>
          <NavigationMenu.List>
            {props.content.map((item) => (
              <NavigationMenu.Item key={item.name}>
                <Link
                  href={item.href}
                  className="hover:text-white text-nowrap transition-colors"
                >
                  <NavigationMenu.Link>{item.name}</NavigationMenu.Link>
                </Link>
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>
        </NavigationMenu.Sub>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  );
}
