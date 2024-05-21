"use client";

import Button from "@/components/Button";
import Link from "@/components/Link";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import {
  DiscordLogo,
  LinkBreak,
  LinkSimple,
  Plus,
  TwitterLogo,
  XCircle,
} from "phosphor-react-sc";
import { twMerge } from "tailwind-merge";

export default function Profile() {
  const {
    logout,
    user,
    linkFarcaster,
    linkDiscord,
    unlinkDiscord,
    linkTwitter,
    unlinkTwitter,
    unlinkFarcaster,
    linkWallet,
    unlinkWallet,
  } = usePrivy();

  const { wallets } = useWallets();

  const linkedWallets = wallets.filter(
    (wallet) => wallet.linked && wallet.walletClientType !== "privy"
  );

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col gap-4 justify-center w-full max-w-2xl">
        <div className="flex flex-col gap-8 w-full ">
          {user?.farcaster ? (
            <div className="flex flex-col gap-4">
              <div className="flex gap-6 p-6 w-full rounded-xl bg-grey-800 max-sm:p-4 max-sm:gap-4">
                <img
                  src={user.farcaster.pfp ?? ""}
                  className="w-16 h-16 rounded-full max-sm:w-12 max-sm:h-12"
                />
                <div className="flex flex-col gap-2 justify-between w-full">
                  <div className="w-full flex justify-between gap-8">
                    <div className="flex flex-col">
                      <h1 className="text-white font-semibold text-lg leading-none">
                        {user.farcaster.displayName}
                      </h1>
                      <p className="text-grey-400">
                        @{user.farcaster.username}
                      </p>
                    </div>
                    <div className="flex gap-6">
                      <button
                        onClick={() => {
                          if (user?.farcaster?.fid)
                            unlinkFarcaster(user.farcaster.fid);
                        }}
                        className="text-red hover:text-red/80 transition-colors gap-1 flex items-center"
                      >
                        <LinkBreak className="w-[18px] h-[18px]" />
                        Unlink
                      </button>
                      <div className="max-sm:hidden">
                        <Button
                          animate="bg"
                          href={`https://warpcast.com/${user.farcaster.username}`}
                        >
                          View on Warpcast
                        </Button>
                      </div>
                    </div>
                  </div>
                  <p className="">{user.farcaster.bio}</p>
                  {/* <div className="flex gap-6">
                  <div className="flex gap-2">
                    <p>Following</p>
                    <p className="text-white">200</p>
                  </div>
                  <div className="flex gap-2">
                    <p>Followers</p>
                    <p className="text-white">800</p>
                  </div>
                </div> */}
                </div>
              </div>
              <div className="flex gap-4 max-sm:flex-col">
                <div className="flex items-center justify-between w-full gap-4 rounded-xl bg-grey-800 py-4 px-6 max-sm:py-3 max-sm:px-4">
                  <div className="flex items-center gap-2.5 text-2xl font-bebas-neue text-white">
                    <DiscordLogo className="w-6 h-6 mb-1" weight="fill" />
                    Discord
                  </div>
                  <button
                    onClick={() => {
                      if (user.discord) unlinkDiscord(user.discord.subject);
                      else linkDiscord();
                    }}
                    className="text-red flex items-center gap-1 hover:text-red/80 transition-colors"
                  >
                    {user.discord ? (
                      <LinkBreak className="w-[18px] h-[18px]" />
                    ) : (
                      <LinkSimple className="w-[18px] h-[18px]" />
                    )}
                    {user.discord ? "Unlink" : "Link"}
                  </button>
                </div>
                <div className="flex items-center justify-between w-full gap-4 rounded-xl bg-grey-800 py-4 px-6 max-sm:py-3 max-sm:px-4">
                  <div className="flex items-center gap-2.5 text-2xl font-bebas-neue text-white">
                    <TwitterLogo className="w-6 h-6 mb-1" weight="fill" />
                    Twitter
                  </div>
                  <button
                    onClick={() => {
                      if (user.twitter) unlinkTwitter(user.twitter.subject);
                      else linkTwitter();
                    }}
                    className="text-red flex items-center gap-1 hover:text-red/80 transition-colors"
                  >
                    {user.twitter ? (
                      <LinkBreak className="w-[18px] h-[18px]" />
                    ) : (
                      <LinkSimple className="w-[18px] h-[18px]" />
                    )}
                    {user.twitter ? "Unlink" : "Link"}
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-4 rounded-xl bg-grey-800 py-4 px-6 max-sm:py-3 max-sm:px-4 max-sm:gap-3">
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-2.5 text-2xl font-bebas-neue text-white">
                    <img src="/ethereum.png" className="h-6 mb-1" />
                    Wallets
                  </div>
                  <button
                    className="text-red flex items-center gap-1 hover:text-red/80 transition-colors"
                    onClick={() => {
                      linkWallet();
                    }}
                  >
                    <Plus className="w-[18px] h-[18px]" />
                    Add
                  </button>
                </div>

                {linkedWallets.length > 0 ? (
                  <ul className="flex gap-2">
                    {linkedWallets.map((wallet) => (
                      <li
                        onClick={() => {
                          unlinkWallet(wallet.address);
                        }}
                        className="flex items-center w-fit gap-2 bg-grey-600 text-white rounded-full px-2 py-2 text-sm hover:bg-grey-500 transition-all group cursor-pointer"
                      >
                        <img
                          src={
                            ["metamask", "rainbow", "coinbase_wallet"].includes(
                              wallet.walletClientType
                            )
                              ? `/wallets/${wallet.walletClientType}.png`
                              : "/wallets/wallet_connect.png"
                          }
                          alt=""
                          className="h-5 w-5 rounded-full"
                        />
                        {wallet.address.substring(0, 8)}
                        <XCircle
                          className="h-5 text-grey-200 w-0 group-hover:w-5 max-sm:w-5 transition-all"
                          weight="fill"
                        />
                      </li>
                    ))}
                  </ul>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            <div className="relative w-full rounded-xl bg-grey-800 overflow-hidden">
              <div className="relative flex flex-col items-center justify-center gap-6 p-6 z-10">
                <h1 className="text-white font-luckiest-guy text-2xl">
                  Create your social profile!
                </h1>
                <p className="text-center text-white">
                  Nouns Esports leverages Farcaster to provide a portable and
                  user controlled social experience. Create an account through{" "}
                  <Link href="https://warpcast.com" className="text-red">
                    Warpcast
                  </Link>{" "}
                  and then link it here to get started.
                </p>
                <Button
                  animate="bg"
                  onClick={() => {
                    linkFarcaster();
                  }}
                >
                  Link Farcaster
                </Button>
              </div>
              <img
                src="/games/pokemon-unite.webp"
                className="w-full h-full absolute top-0 left-0 z-0 brightness-[15%] object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
