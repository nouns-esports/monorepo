"use client";

import Button from "@/components/Button";
import { usePrivy } from "@privy-io/react-auth";

export default function Profile() {
  const { logout } = usePrivy();
  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-8 w-full max-w-2xl">
        <div
          onClick={() => {
            logout();
          }}
          className="flex gap-6 p-6 w-full rounded-xl bg-darkgrey"
        >
          <div className="bg-red w-16 h-16 rounded-full flex-shrink-0"></div>
          <div className="flex flex-col gap-2 justify-between w-full">
            <div className="w-full flex justify-between gap-8">
              <div className="flex flex-col">
                <h1 className="text-white font-semibold text-lg leading-none">
                  Sam
                </h1>
                <p className="text-lightgrey">@sams</p>
              </div>
              <div>
                <Button animate="bg" href="">
                  View on Warpcast
                </Button>
              </div>
            </div>
            <p className="">Building @esports / nouns.gg</p>
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
      </div>
    </div>
  );
}
