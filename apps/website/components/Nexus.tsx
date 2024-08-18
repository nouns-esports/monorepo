"use client";

import { DiscordLogo, Plus, TwitterLogo } from "phosphor-react-sc";
import Button from "./Button";
import { useLinkAccount, useLogin, usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { getNexus } from "@/server/queries/nexus";
import { twMerge } from "tailwind-merge";
import type { User, WalletWithMetadata } from "@privy-io/server-auth";
import toast from "react-hot-toast";
import { shortenAddress } from "@/utils/shortenAddress";
import { useContext, useTransition } from "react";
import { LoginMethodContext } from "@/providers/Privy";
import Link from "./Link";
import type { getUserAwards } from "@/server/queries/awards";
import { grantNexus } from "@/server/mutations/grantNexus";
import { formatUnits } from "viem";
import { defaultProfileImage } from "@/utils/defaultProfileImage";
import type { getAuthenticatedUser } from "@/server/queries/users";

export default function Nexus(props: {
  user?: Awaited<ReturnType<typeof getAuthenticatedUser>>;
  awards?: Awaited<ReturnType<typeof getUserAwards>>;
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
    unlinkTwitter,
    unlinkFarcaster,
    unlinkWallet,
    authenticated,
    logout,
  } = usePrivy();

  const linkedWallets = (props.user?.linkedAccounts.filter(
    (account) =>
      account.type === "wallet" && account.walletClientType !== "privy"
  ) ?? []) as WalletWithMetadata[];

  const { setOnlyCoinbaseWallet } = useContext(LoginMethodContext);

  const [loading, startTransition] = useTransition();

  if (!props.user) {
    return (
      <div className="flex flex-col items-center">
        <div className="w-full flex flex-col gap-8 max-w-2xl">
          <img src="/nexus-banner.webp" className="w-full rounded-xl" />
          <div className="w-full flex flex-col gap-8 items-center">
            <p className="text-center w-full text-white">
              Join our esports journey at Nouns Esports! We're offering a unique
              opportunity for esports enthusiasts to directly influence our
              major decisions. Enter the Nexus and you'll be given the power to
              vote on key organizational decisions, making you an active
              participant in shaping our future. Don't miss out on this chance
              to be part of our community-driven approach to esports.
            </p>
            <div className="flex flex-col gap-3 items-center">
              <Button
                loading={loading}
                onClick={() => {
                  if (!authenticated) {
                    login();
                    return;
                  }

                  if (!props.user?.discord?.username) {
                    linkDiscord();
                    return;
                  }

                  const grant = new Promise((resolve, reject) => {
                    startTransition(async () => {
                      // @ts-ignore
                      await grantNexus({ user: props.user.id })
                        .then(resolve)
                        .catch(reject);

                      // router.refresh();
                    });
                  });

                  toast.promise(grant, {
                    loading: "Checking eligibility",
                    success: () => {
                      return "Welcome to the Nexus";
                    },
                    error: (e) => {
                      return "You must join the Discord server to begin";
                    },
                  });

                  return;
                }}
              >
                {!props.user ? "Sign in" : ""}
                {props.user && !props.user?.discord ? "Connect Discord" : ""}
                {props.user?.discord && !props.nexus ? "Check Eligibility" : ""}
              </Button>
              {props.user ? (
                <button
                  onClick={async () => {
                    toast.promise(logout(), {
                      loading: "Signing you out",
                      success: () => {
                        router.refresh();
                        return "Successfully signed out";
                      },
                      error: () => {
                        return "Something went wrong";
                      },
                    });
                  }}
                  className="text-red hover:text-red/80 transition-colors"
                >
                  Sign out
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="font-luckiest-guy text-white text-3xl flex items-center justify-center w-full">
              Unlock exclusive perks
            </h2>
            <div className="w-full flex gap-4 justify-between max-sm:flex-col">
              <div className="w-full flex flex-col bg-blue-500/20 rounded-xl py-3 px-4 border-2 border-transparent hover:border-blue-500 transition-all hover:scale-105 cursor-pointer">
                <h2 className="text-blue-500 text-lg font-semibold">
                  Explorer
                </h2>
                <ul className="text-white text-sm list-disc pl-4">
                  <li>Propose and vote on rounds in the community</li>
                  <li>An exclusive role in the Discord server</li>
                </ul>
              </div>
              <div className="w-full flex flex-col bg-purple/20 rounded-xl py-3 px-4 border-2 border-transparent hover:border-purple transition-all hover:scale-105 cursor-pointer">
                <h2 className="text-purple text-lg font-semibold">
                  Challenger
                </h2>
                <ul className="text-white text-sm list-disc pl-4">
                  <li>3x the votes per round</li>
                  <li>An exclusive role in the Discord server</li>
                </ul>
              </div>
              <div className="w-full flex flex-col bg-red/20 rounded-xl py-3 px-4 border-2 border-transparent hover:border-red transition-all hover:scale-105 cursor-pointer">
                <h2 className="text-red text-lg font-semibold">Champion</h2>
                <ul className="text-white text-sm list-disc pl-4">
                  <li>10x the votes per round</li>
                  <li>An exclusive role in the Discord server</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col gap-4 justify-center w-full max-w-2xl">
        <div className="flex items-center justify-between gap-6 p-6 w-full rounded-xl bg-grey-800">
          <div className="flex gap-4 items-center">
            <img
              src={props.user.image ?? defaultProfileImage(props.user.id)}
              className="w-12 h-12 rounded-full max-sm:w-12 max-sm:h-12"
            />
            <h1 className="text-white text-3xl leading-none font-luckiest-guy">
              {profile.name}
            </h1>
          </div>
          {props.user?.farcaster ? (
            <Button
              href={`https://warpcast.com/${props.user.farcaster?.username}`}
            >
              View on Warpcast
            </Button>
          ) : (
            <Button
              onClick={() => {
                linkFarcaster();
              }}
            >
              Customize
            </Button>
          )}
        </div>

        <div className="flex gap-4 w-full items-center h-20 max-sm:flex-col max-sm:h-auto">
          <div className="bg-grey-800 rounded-xl flex flex-col items-center justify-center w-full h-full max-sm:h-20">
            <p className="text-grey-400">Your Tier</p>
            <p
              className={twMerge(
                "text-lg",
                props.nexus.tier === "Explorer" && "text-blue-500",
                props.nexus.tier === "Challenger" && "text-purple",
                props.nexus.tier === "Champion" && "text-red"
              )}
            >
              {props.nexus.tier}
            </p>
          </div>
          <div className="bg-grey-800 rounded-xl flex flex-col items-center justify-center w-full h-full max-sm:h-20">
            <p className="text-grey-400">Your Votes</p>
            <p className="text-white text-lg">{props.nexus.votes}</p>
          </div>
        </div>
        {props.nexus.tier !== "Champion" ? (
          <div className="bg-grey-800 rounded-xl flex flex-col w-full p-6">
            <h2 className="font-bebas-neue text-2xl text-white mb-2">
              Steps to level up
            </h2>
            <ul className="text-white list-disc">
              {props.nexus.tier === "Explorer" ? (
                <>
                  <li className="ml-4">
                    Vote or propose in at least 3 rounds held within the last 3
                    months
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
        {props.awards && props.awards.length > 0 ? (
          <div className="bg-grey-800 rounded-xl flex flex-col w-full p-6">
            <h2 className="font-bebas-neue text-2xl text-white mb-2">
              Your Awards
            </h2>
            <ul className="flex flex-col gap-4">
              {props.awards.map((award) => (
                <li
                  key={award.id}
                  className="flex items-center justify-between w-ful"
                >
                  <Link
                    href={`/rounds/${award.round.id}`}
                    className="flex gap-3 items-center text-white font-semibold"
                  >
                    <img
                      src={award.round.image}
                      className="w-8 h-8 rounded-md"
                    />
                    {award.round.id.replaceAll("-", " ")}
                  </Link>
                  <div className="flex items-center gap-4">
                    <div className="text-white gap-2 flex items-center">
                      <img
                        src={award.asset.image}
                        className="w-5 h-5 rounded-md"
                      />
                      {formatUnits(
                        BigInt(award.value),
                        award.asset.decimals ?? 0
                      )}
                    </div>
                    <div
                      className={twMerge(
                        "rounded-full px-2.5 py-0.5 text-sm font-semibold",
                        award.claimed
                          ? "text-white bg-green/90"
                          : "text-white bg-blue-700"
                      )}
                    >
                      {award.claimed ? "Paid" : "Queued"}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          ""
        )}
        <div className="flex flex-col justify-between w-full gap-4 rounded-xl bg-grey-800 py-6 px-6">
          <div className="flex justify-between items-center w-full">
            <h2 className="text-2xl font-bebas-neue text-white">
              Connected Accounts
            </h2>
            <button
              onClick={async () => {
                await logout();
                router.refresh();
              }}
              className="text-red hover:text-red/80 transition-colors"
            >
              Sign out
            </button>
          </div>
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
                <Button disabled size="sm">
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
