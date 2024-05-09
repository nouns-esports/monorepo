"use client";

import Button from "@/components/Button";
import { usePrivy } from "@privy-io/react-auth";

export default function Profile() {
  const { logout, user, linkFarcaster } = usePrivy();
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col gap-4 justify-center w-full max-w-2xl">
        <div className="flex flex-col gap-8 w-full ">
          {user?.farcaster ? (
            <div
              onClick={() => {
                logout();
              }}
              className="flex gap-6 p-6 w-full rounded-xl bg-grey-800"
            >
              <img
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
            <p
              onClick={() => {
                linkFarcaster();
              }}
            >
              Connect a Farcaster account to complete your profile
            </p>
          )}
        </div>
        <div className="w-full flex gap-4">
          <div className="bg-grey-800 rounded-xl w-full h-32 flex items-center justify-center">
            200 XP
          </div>
          <div className="bg-grey-800 rounded-xl w-full h-32 flex items-center justify-center">
            Superfan Pass
          </div>
          <div className="bg-grey-800 rounded-xl w-full h-32 flex items-center justify-center"></div>
        </div>
      </div>
    </div>
  );
}
