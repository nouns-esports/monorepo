"use client";

import Button from "@/components/Button";
import Globe from "@/components/Globe";
import Link from "@/components/Link";
import { isInServer } from "@/server/queries/discord";
import { usePrivy } from "@privy-io/react-auth";
import { CheckCircle, Circle } from "phosphor-react-sc";
import { useQuery } from "@/hooks/useQuery";
import { twMerge } from "tailwind-merge";
import { grantExplorer } from "@/server/actions/grantExplorer";

export default function Nexus() {
  const { user, login, linkDiscord } = usePrivy();

  const { data: inDiscord, mutate } = useQuery({
    key: "isInServer",
    queryFn: isInServer,
    args: { user: user?.discord?.username?.split("#")[0] },
    canQuery: !!user?.discord,
  });

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="relative h-[250px] w-full">
        <Globe />
        <h1 className="absolute top-0 w-full h-full flex items-center justify-center font-luckiest-guy text-white text-5xl">
          Enter the Nexus
        </h1>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-start">
          <img src="/left.png" className="h-[75%]" />
        </div>
        <div className="absolute top-0 right-0 w-full h-full flex items-center justify-end">
          <img src="/right.png" className="h-[75%]" />
        </div>
      </div>
      <p className="text-center w-full text-white">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor,
        nisl ac dignissim tincidunt, odio ex ultricies felis, nec fermentum
        lacus ligula ac mi. Sed nec nunc euismod, ultricies tortor et, luctus
        libero. Nulla facilisi. Nullam auctor, nisl ac dignissim tincidunt, odio
        ex ultricies felis, nec fermentum lacus ligula ac mi.
      </p>
      <div className="w-full flex justify-center">
        <div className="w-80 rounded-xl bg-grey-800 p-5 flex flex-col gap-3">
          <h3 className="text-white text-2xl font-bebas-neue whitespace-nowrap">
            Become a pass member
          </h3>
          <ul className="flex flex-col">
            <li className="flex items-center gap-2 mb-2">
              {user?.discord ? (
                <CheckCircle weight="fill" className="w-5 h-5 text-green" />
              ) : (
                <Circle className="w-5 h-5" />
              )}
              <p className="text-grey-200 whitespace-nowrap">
                Connect a Discord account
              </p>
            </li>
            <li className="flex items-center gap-2 mb-2">
              {user?.discord ? (
                <CheckCircle weight="fill" className="w-5 h-5 text-green" />
              ) : (
                <Circle className="w-5 h-5" />
              )}
              <p className="text-grey-200 whitespace-nowrap">
                Join our{" "}
                <Link href="/discord" className="text-red">
                  Discord Server
                </Link>
              </p>
            </li>
          </ul>
          <Button
            animate="bg"
            onClick={() => {
              if (!user) {
                return login();
              }

              if (!user.discord) {
                return linkDiscord();
              }

              if (!inDiscord) {
                return mutate();
              }

              grantExplorer({ user: user.id });
            }}
          >
            {user
              ? user.discord
                ? inDiscord
                  ? "Get Started"
                  : "Check"
                : "Link Discord"
              : "Create Account"}
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="font-luckiest-guy text-white text-3xl flex items-center justify-center w-full">
          Tiers
        </h2>
        <div className="w-full flex gap-4 justify-between">
          <div className="w-full flex flex-col bg-blue-500/20 rounded-xl py-3 px-4 border-2 border-transparent hover:border-blue-500 transition-all hover:scale-105 cursor-pointer">
            <h2 className="text-blue-500 text-lg font-semibold">Explorer</h2>
            <ul className="text-white text-sm list-disc pl-4">
              <li>Propose and vote on rounds in the community</li>
            </ul>
          </div>
          <div className="w-full flex flex-col bg-purple/20 rounded-xl py-3 px-4 border-2 border-transparent hover:border-purple transition-all hover:scale-105 cursor-pointer">
            <h2 className="text-purple text-lg font-semibold">Challenger</h2>
            <ul className="text-white text-sm list-disc pl-4">
              <li>Get 3x the votes per round</li>
            </ul>
          </div>
          <div className="w-full flex flex-col bg-red/20 rounded-xl py-3 px-4 border-2 border-transparent hover:border-red transition-all hover:scale-105 cursor-pointer">
            <h2 className="text-red text-lg font-semibold">Elite</h2>
            <ul className="text-white text-sm list-disc pl-4">
              <li>Get 10x the votes per round</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
