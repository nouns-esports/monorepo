"use client";

import {
  ArrowClockwise,
  DiscordLogo,
  LinkBreak,
  LinkSimple,
  Plus,
  TwitterLogo,
} from "phosphor-react-sc";
import Button from "./Button";
import { useLinkAccount, useLogin, usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { getNexus } from "@/server/queries/nexus";
import { twMerge } from "tailwind-merge";
import type { User, WalletWithMetadata } from "@privy-io/server-auth";
import { userToProfile } from "@/utils/userToProfile";
import toast from "react-hot-toast";
import Countdown from "./rounds/Countdown";
import { nextFridayAt3PM } from "@/utils/nextFridayAt3PM";
import { shortenAddress } from "@/utils/shortenAddress";
import { useContext } from "react";
import { LoginMethodContext } from "@/providers/Privy";
import { grantExplorer } from "@/server/actions/grantExplorer";

export default function Nexus(props: {
  user?: User;
  requirements?: { inDiscord: boolean };
  nexus?: Awaited<ReturnType<typeof getNexus>>;
}) {
  const router = useRouter();

  const { linkFarcaster, linkWallet, linkTwitter, linkDiscord } =
    useLinkAccount({
      onError: () => {
        setOnlyCoinbaseWallet(false);
      },
      onSuccess: () => {
        router.refresh();
        setOnlyCoinbaseWallet(false);
      },
    });

  const { login } = useLogin({
    onComplete: () => {
      router.refresh();
    },
  });

  const {
    unlinkDiscord,
    unlinkTwitter,
    unlinkFarcaster,
    unlinkWallet,
    authenticated,
  } = usePrivy();

  const linkedWallets = (props.user?.linkedAccounts.filter(
    (account) =>
      account.type === "wallet" && account.walletClientType !== "privy"
  ) ?? []) as WalletWithMetadata[];

  const profile = userToProfile(props.user);

  const { setOnlyCoinbaseWallet } = useContext(LoginMethodContext);

  if (!props.nexus) {
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
          <div className="flex flex-col gap-3 items-center">
            <Button
              onClick={() => {
                if (!authenticated) {
                  login();
                  return;
                }

                if (!props.user?.discord?.username) {
                  linkDiscord();
                  return;
                }

                if (!props.requirements?.inDiscord) {
                  router.refresh();
                  return;
                }

                toast.promise(
                  grantExplorer({ user: props.user.id }).then(() => {
                    router.refresh();
                  }),
                  {
                    loading: "Granting access",
                    success: "Successfully granted access",
                    error: "Failed to grant access",
                  }
                );
              }}
              animate="bg"
            >
              {!props.user?.discord ? "Get Started" : ""}
              {props.user?.discord && !props.requirements?.inDiscord ? (
                <>
                  <ArrowClockwise className="w-5 h-5 mr-2" weight="bold" />{" "}
                  Check
                </>
              ) : (
                ""
              )}
              {props.user?.discord && props.requirements?.inDiscord
                ? "Enter the Nexus"
                : ""}
            </Button>
            {props.user?.discord && !props.requirements?.inDiscord ? (
              <small className="text-red">
                You must join the Discord server to begin
              </small>
            ) : (
              ""
            )}
          </div>
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

        <div className="flex gap-4 w-full items-center h-20 max-sm:flex-col max-sm:h-auto">
          <div className="bg-grey-800 rounded-xl flex flex-col items-center justify-center w-full h-full max-sm:h-20">
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
          <div className="bg-grey-800 rounded-xl flex flex-col items-center justify-center w-full h-full max-sm:h-20">
            <p className="text-grey-400">Your Votes</p>
            <p className="text-white text-lg">{props.nexus.votes}</p>
          </div>
          <div className="bg-grey-800 rounded-xl flex flex-col items-center justify-center w-full h-full max-sm:h-20">
            <p className="text-grey-400">Updates Weekly</p>
            <p className="text-white text-lg">
              <Countdown date={nextFridayAt3PM()} />
            </p>
          </div>
        </div>

        {props.nexus.tier !== "Elite" ? (
          <div className="bg-grey-800 rounded-xl flex flex-col w-full p-6">
            <h2 className="font-bebas-neue text-2xl text-white mb-2">
              Steps to level up
            </h2>
            <ul className="text-white list-disc">
              {props.nexus.tier === "Explorer" ? (
                <>
                  <li className="ml-4">
                    Be an active voter in 3 of the last 5 rounds
                  </li>
                </>
              ) : (
                ""
              )}
              {props.nexus.tier === "Challenger" ? (
                <>
                  <li className="ml-4">
                    Complete your profile by connecting all of your accounts
                    (Discord, Twitter, Farcaster, and Ethereum wallet)
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>
          </div>
        ) : (
          ""
        )}
        <div className="flex flex-col justify-between w-full gap-4 rounded-xl bg-grey-800 py-6 px-6">
          <h2 className="text-2xl font-bebas-neue text-white">
            Connected Accounts
          </h2>
          <ul className="flex flex-col gap-4">
            <li className="flex items-center text-white justify-between">
              <div className="flex items-center gap-4">
                <div className="text-lg font-semibold flex gap-3 items-center">
                  <DiscordLogo className="w-6 h-6" weight="fill" />
                  Discord
                </div>
                {props.user?.discord ? (
                  <p className="text-green">
                    {props.user.discord.username?.split("#")[0]}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="flex gap-4 items-center">
                <Button
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
                  animate="bg"
                  size="sm"
                >
                  {props.user?.discord ? "Remove" : "Connect"}
                </Button>
              </div>
            </li>
            <li className="flex items-center text-white justify-between">
              <div className="flex items-center gap-4">
                <div className="text-lg font-semibold flex gap-3 items-center">
                  <TwitterLogo className="w-6 h-6" weight="fill" />
                  Twitter
                </div>
                {props.user?.twitter ? (
                  <p className="text-green">@{props.user.twitter.username}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="flex gap-4 items-center">
                <Button
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
                  animate="bg"
                  size="sm"
                >
                  {props.user?.twitter ? "Remove" : "Connect"}
                </Button>
              </div>
            </li>

            <li className="flex items-center text-white justify-between">
              <div className="flex items-center gap-4">
                <div className="text-lg font-semibold flex gap-3 items-center">
                  <img
                    src="/farcaster.svg"
                    className="h-5 w-6 object-contain"
                  />
                  Farcaster
                </div>
                {props.user?.farcaster ? (
                  <p className="text-green">@{props.user.farcaster.username}</p>
                ) : (
                  ""
                )}
              </div>
              <Button
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
                animate="bg"
                size="sm"
              >
                {props.user?.farcaster ? "Remove" : "Connect"}
              </Button>
            </li>
            <li className="flex items-center text-white justify-between">
              <div className="flex items-center gap-4">
                <div className="text-lg font-semibold flex gap-3 items-center">
                  <img src="/ethereum.png" className="h-6 w-6 object-contain" />
                  Wallet
                </div>
                {linkedWallets.length > 0 ? (
                  <p className="text-green">
                    {shortenAddress(linkedWallets[0].address)}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="flex gap-4 items-center">
                {linkedWallets.length < 1 ? (
                  <div className="flex gap-4 items-center">
                    <button
                      onClick={() => {
                        setOnlyCoinbaseWallet(true);
                        linkWallet();
                      }}
                      className="text-red hover:text-red/80 transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" weight="bold" />
                      Create a new wallet
                    </button>
                    <Button
                      onClick={() => {
                        linkWallet();
                      }}
                      animate="bg"
                      size="sm"
                    >
                      Connect
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => {
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
                    }}
                    animate="bg"
                    size="sm"
                  >
                    Remove
                  </Button>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
