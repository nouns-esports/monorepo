"use client";

import Button from "@/components/Button";
import Link from "@/components/Link";
import { usePrivy } from "@privy-io/react-auth";

export default function Profile() {
  const { logout, user, linkFarcaster, unlinkFarcaster } = usePrivy();
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col gap-4 justify-center w-full max-w-2xl">
        <div className="flex flex-col gap-8 w-full ">
          {user?.farcaster ? (
            <div className="flex gap-6 p-6 w-full rounded-xl bg-grey-800">
              <img
                onClick={() => {
                  if (user?.farcaster?.fid) unlinkFarcaster(user.farcaster.fid);
                }}
                src={user.farcaster.pfp ?? ""}
                className="w-16 h-16 rounded-full"
              />
              <div className="flex flex-col gap-2 justify-between w-full">
                <div className="w-full flex justify-between gap-8">
                  <div className="flex flex-col">
                    <h1 className="text-white font-semibold text-lg leading-none">
                      {user.farcaster.displayName}
                    </h1>
                    <p className="text-grey-400">@{user.farcaster.username}</p>
                  </div>
                  <div>
                    <Button
                      animate="bg"
                      href={`https://warpcast.com/${user.farcaster.username}`}
                    >
                      View on Warpcast
                    </Button>
                  </div>
                </div>
                <p className="">{user.farcaster.bio}</p>
                <div className="flex gap-6">
                  <div className="flex gap-2">
                    <p>Following</p>
                    <p className="text-white">200</p>
                  </div>
                  <div className="flex gap-2">
                    <p>Followers</p>
                    <p className="text-white">800</p>
                  </div>
                </div>
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
                className="w-full h-full absolute top-0 left-0 z-0 brightness-[15%]"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
