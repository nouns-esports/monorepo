"use client";

import Link from "./Link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  return (
    <aside className="absolute left-16 flex flex-col gap-4 w-60">
      <ul className="flex flex-col gap-2 bg-darkgrey p-4 rounded-xl">
        <Button route="/dashboard">Home</Button>
        <Button route="/dashboard/mint">Mint</Button>
        <Button route="/dashboard/vote">Vote</Button>
        <Button route="/dashboard/profile">Profile</Button>
      </ul>
      <div className="flex flex-col gap-2 bg-darkgrey p-4 rounded-xl">
        <h2 className="font-bebas-neue text-xl text-white">Discussion</h2>
        <ul className="flex flex-col gap-2">
          <Button route="/dashboard/dota-2">Dota 2</Button>
          <Button route="/dashboard/rocket-legaue">Rocket League</Button>
          <Button route="/dashboard/smash">Smash</Button>
          <Button route="/dashboard/cs-2">CS 2</Button>
        </ul>
      </div>
    </aside>
  );
}

function Button(props: {
  icon?: React.ReactNode;
  image?: string;
  route: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Link href={props.route}>
      <li
        style={{
          backgroundColor: pathname === props.route ? "#E93737" : undefined,
        }}
        className="hover:bg-white/5 text-white rounded-lg px-2 py-1"
      >
        {props.children}
      </li>
    </Link>
  );
}
