"use client";

import { useState } from "react";
import Modal, { useModal } from "../Modal.new";
import { ArrowRight, Mail } from "lucide-react";
import { DiscordLogo, TwitterLogo, Wallet } from "phosphor-react-sc";
import { create } from "zustand";
import Link from "../Link";

export default function SignInModal() {
  const [returningUser, setReturningUser] = useState(true);
  const [email, setEmail] = useState("");

  return (
    <Modal id="sign-in" className="gap-4 w-[400px] overflow-hidden">
      <div className="relative flex items-center justify-center flex-shrink-0 h-48 w-full">
        <img
          src="https://ipfs.nouns.gg/ipfs/QmSGYg5t25SQDp1xBw5tqDrfsF62T2HHVZpH4VduaAwJkT"
          className="w-full h-full object-cover brightness-75"
          draggable={false}
        />
        <div className="absolute bottom-0 left-0 from-black to-transparent bg-gradient-to-t w-full h-16" />
      </div>
      <div className="flex flex-col justify-between h-full gap-6 pb-6 px-6">
        <div className="flex flex-col gap-4">
          <p className="text-3xl font-bebas-neue text-white leading-none">
            {returningUser ? "Sign in" : "Create account"}
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 w-full text-white font-semibold border border-white/20 rounded-lg p-2.5">
              <Mail className="w-6 h-6" />
              <input
                type="text"
                placeholder="example@email.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="bg-transparent outline-none w-full placeholder:text-white/50 text-white"
              />
              <button className="flex items-center gap-1 text-sm hover:text-white/70 transition-colors">
                Submit
              </button>
            </div>
            <button className="flex items-center gap-2 w-full text-white font-semibold bg-discord rounded-lg p-2.5 hover:bg-discord/70 transition-colors">
              <DiscordLogo className="w-6 h-6" weight="fill" />
              Continue with Discord
            </button>
            <button className="flex items-center gap-2 w-full text-white font-semibold bg-farcaster rounded-lg p-2.5 hover:bg-farcaster/70 transition-colors">
              <img
                src="/farcaster.svg"
                className="w-5 h-5 mr-0.5 ml-0.5 object-contain"
              />
              Continue with Farcaster
            </button>
            <button className="flex items-center gap-2 w-full text-white font-semibold bg-twitter rounded-lg p-2.5 hover:bg-twitter/70 transition-colors">
              <TwitterLogo className="w-6 h-6" weight="fill" />
              Continue with Twitter
            </button>
            <button className="flex items-center gap-2 w-full text-black font-semibold bg-white rounded-lg p-2.5 hover:bg-white/70 transition-colors">
              <Wallet className="w-6 h-6" weight="fill" />
              Continue with Wallet
            </button>
          </div>
        </div>
        <p
          onClick={() => setReturningUser(!returningUser)}
          className="flex items-center gap-1 group text-red cursor-pointer"
        >
          {returningUser
            ? "Create a new account"
            : "Sign into an existing account"}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </p>
        <small className="text-xs">
          By signing in, you agree to the{" "}
          <Link href="/terms" className="text-white hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-white hover:underline">
            Privacy Policy
          </Link>
        </small>
      </div>
    </Modal>
  );
}
