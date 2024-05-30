"use client";

import {
  DiscordLogo,
  LinkBreak,
  LinkSimple,
  TwitterLogo,
} from "phosphor-react-sc";
import Button from "./Button";
import { useLinkAccount, usePrivy, useWallets } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { getNexus } from "@/server/queries/nexus";
import { twMerge } from "tailwind-merge";
import { User } from "@privy-io/server-auth";
import { userToProfile } from "@/utils/userToProfile";
import toast from "react-hot-toast";
import Countdown from "./rounds/Countdown";
import { nextFridayAt3PM } from "@/utils/nextFridayAt3PM";

export default function Nexus(props: {
  user?: User;
  requirements?: { inDiscord: boolean };
  nexus?: Awaited<ReturnType<typeof getNexus>>;
}) {
  const router = useRouter();

  const { linkFarcaster, linkWallet, linkTwitter, linkDiscord } =
    useLinkAccount({
      onSuccess: () => {
        router.refresh();
      },
    });

  const { unlinkDiscord, unlinkTwitter, unlinkFarcaster, unlinkWallet } =
    usePrivy();

  const { wallets } = useWallets();

  const linkedWallets = wallets.filter(
    (wallet) => wallet.linked && wallet.walletClientType !== "privy"
  );

  const profile = userToProfile(props.user);

  if (!props.requirements?.inDiscord) {
    return (
      <div className="w-full flex flex-col gap-8">
        <div className="h-[250px] w-full bg-white rounded-xl flex items-center justify-center text-black text-xl">
          Placeholder Graphic
        </div>
        <div className="w-full flex flex-col gap-4 items-center">
          <p className="text-center w-full text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            auctor, nisl ac dignissim tincidunt, odio ex ultricies felis, nec
            fermentum lacus ligula ac mi. Sed nec nunc euismod, ultricies tortor
            et, luctus libero. Nulla facilisi. Nullam auctor, nisl ac dignissim
            tincidunt, odio ex ultricies felis, nec fermentum lacus ligula ac
            mi.
          </p>
          <Button
            onClick={() => {
              linkDiscord();
            }}
            animate="bg"
          >
            Get Started
          </Button>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="font-luckiest-guy text-white text-3xl flex items-center justify-center w-full">
            Unlock exclusive perks
          </h2>
          <div className="w-full flex gap-4 justify-between">
            <div className="w-full flex flex-col bg-blue-500/20 rounded-xl py-3 px-4 border-2 border-transparent hover:border-blue-500 transition-all hover:scale-105 cursor-pointer">
              <h2 className="text-blue-500 text-lg font-semibold">Explorer</h2>
              <ul className="text-white text-sm list-disc pl-4">
                <li>Propose and vote on rounds in the community</li>
                <li>An exclusive role in the Discord server</li>
              </ul>
            </div>
            <div className="w-full flex flex-col bg-purple/20 rounded-xl py-3 px-4 border-2 border-transparent hover:border-purple transition-all hover:scale-105 cursor-pointer">
              <h2 className="text-purple text-lg font-semibold">Challenger</h2>
              <ul className="text-white text-sm list-disc pl-4">
                <li>3x the votes per round</li>
                <li>An exclusive role in the Discord server</li>
              </ul>
            </div>
            <div className="w-full flex flex-col bg-red/20 rounded-xl py-3 px-4 border-2 border-transparent hover:border-red transition-all hover:scale-105 cursor-pointer">
              <h2 className="text-red text-lg font-semibold">Elite</h2>
              <ul className="text-white text-sm list-disc pl-4">
                <li>10x the votes per round</li>
                <li>An exclusive role in the Discord server</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col gap-4 justify-center w-full max-w-2xl">
        {profile ? (
          <div className="flex items-center justify-between gap-6 p-6 w-full rounded-xl bg-grey-800">
            <div className="flex gap-4 items-center">
              <img
                src={profile.pfp}
                className="w-12 h-12 rounded-full max-sm:w-12 max-sm:h-12"
              />
              <h1 className="text-white text-3xl leading-none font-luckiest-guy">
                {profile.name}
              </h1>
            </div>
            {props.user?.farcaster ? (
              <Button
                animate="bg"
                href={`https://warpcast.com/${props.user.farcaster?.username}`}
              >
                View on Warpcast
              </Button>
            ) : (
              <Button
                animate="bg"
                onClick={() => {
                  linkFarcaster();
                }}
              >
                Customize
              </Button>
            )}
          </div>
        ) : (
          ""
        )}
        {props.nexus ? (
          <div className="flex gap-4 w-full items-center h-20">
            <div className="bg-grey-800 rounded-xl flex flex-col items-center justify-center w-full h-full">
              <p className="text-grey-400">Your Tier</p>
              <p
                className={twMerge(
                  "text-lg",
                  props.nexus.tier === "Explorer" && "text-blue-500",
                  props.nexus.tier === "Challenger" && "text-red",
                  props.nexus.tier === "Elite" && "text-purple"
                )}
              >
                {props.nexus.tier}
              </p>
            </div>
            <div className="bg-grey-800 rounded-xl flex flex-col items-center justify-center w-full h-full">
              <p className="text-grey-400">Your Votes</p>
              <p className="text-white text-lg">{props.nexus.votes}</p>
            </div>
            <div className="bg-grey-800 rounded-xl flex flex-col items-center justify-center w-full h-full">
              <p className="text-grey-400">Updates Weekly</p>
              <p className="text-white text-lg">
                <Countdown date={nextFridayAt3PM()} />
              </p>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="flex flex-col justify-between w-full gap-4 rounded-xl bg-grey-800 py-6 px-6">
          <h2 className="text-2xl font-bebas-neue text-white">
            Linked Accounts
          </h2>
          <ul className="flex flex-col gap-4">
            <li className="flex items-center text-white justify-between">
              <div className="text-lg font-semibold flex gap-3 items-center">
                <DiscordLogo className="w-6 h-6" weight="fill" />
                Discord
              </div>
              <div className="flex gap-4 items-center">
                <button
                  onClick={() => {
                    if (props.user?.discord)
                      toast.promise(
                        unlinkDiscord(props.user.discord.subject).then(() =>
                          router.refresh()
                        ),
                        {
                          loading: "Unlinking Discord",
                          success: "Successfully unlinked Discord",
                          error: "Failed to unlink Discord",
                        }
                      );
                    else linkDiscord();
                  }}
                  className="text-red hover:text-red/80 transition-colors flex items-center gap-1"
                >
                  {props.user?.discord ? (
                    <LinkBreak className="w-5 h-5" />
                  ) : (
                    <LinkSimple className="w-5 h-5" />
                  )}
                  {props.user?.discord ? "Unlink" : "Link"}
                </button>
              </div>
            </li>
            <li className="flex items-center text-white justify-between">
              <div className="text-lg font-semibold flex gap-3 items-center">
                <TwitterLogo className="w-6 h-6" weight="fill" />
                Twitter
              </div>
              <div className="flex gap-4 items-center">
                <button
                  onClick={() => {
                    if (props.user?.twitter) {
                      toast.promise(
                        unlinkTwitter(props.user.twitter.subject).then(() =>
                          router.refresh()
                        ),
                        {
                          loading: "Unlinking Twitter",
                          success: "Successfully unlinked Twitter",
                          error: "Failed to unlink Twitter",
                        }
                      );
                    } else linkTwitter();
                  }}
                  className="text-red hover:text-red/80 transition-colors flex items-center gap-1"
                >
                  {props.user?.twitter ? (
                    <LinkBreak className="w-5 h-5" />
                  ) : (
                    <LinkSimple className="w-5 h-5" />
                  )}
                  {props.user?.twitter ? "Unlink" : "Link"}
                </button>
              </div>
            </li>
            <li className="flex items-center text-white justify-between">
              <div className="text-lg font-semibold flex gap-3 items-center">
                <img src="/ethereum.png" className="h-6 w-6 object-contain" />
                Wallet
              </div>
              <button
                onClick={() => {
                  if (linkedWallets.length > 0) {
                    toast.promise(
                      unlinkWallet(linkedWallets[0].address).then(() =>
                        router.refresh()
                      ),
                      {
                        loading: "Unlinking wallet",
                        success: "Successfully unlinked wallet",
                        error: "Failed to unlink wallet",
                      }
                    );
                  } else linkWallet();
                }}
                className="text-red hover:text-red/80 transition-colors flex items-center gap-1"
              >
                {linkedWallets.length > 0 ? (
                  <LinkBreak className="w-5 h-5" />
                ) : (
                  <LinkSimple className="w-5 h-5" />
                )}
                {linkedWallets.length > 0 ? "Unlink" : "Link"}
              </button>
            </li>
            <li className="flex items-center text-white justify-between">
              <div className="text-lg font-semibold flex gap-3 items-center">
                <img src="/farcaster.svg" className="h-5 w-6 object-contain" />
                Farcaster
              </div>
              <button
                onClick={() => {
                  if (props.user?.farcaster?.fid) {
                    toast.promise(
                      unlinkFarcaster(props.user.farcaster.fid).then(() =>
                        router.refresh()
                      ),
                      {
                        loading: "Unlinking Farcaster",
                        success: "Successfully unlinked Farcaster",
                        error: "Failed to unlink Farcaster",
                      }
                    );
                  } else linkFarcaster();
                }}
                className="text-red hover:text-red/80 transition-colors flex items-center gap-1"
              >
                {props.user?.farcaster ? (
                  <LinkBreak className="w-5 h-5" />
                ) : (
                  <LinkSimple className="w-5 h-5" />
                )}
                {props.user?.farcaster ? "Unlink" : "Link"}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
