"use client";

import { useEffect, useRef, useState } from "react";
import Modal, { ToggleModal, useModal } from "../Modal.new";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Mail,
  RefreshCcw,
  X,
} from "lucide-react";
import { DiscordLogo, TwitterLogo, Wallet } from "phosphor-react-sc";
import Link from "../Link";
import {
  useLoginWithEmail,
  useLoginWithOAuth,
  usePrivy,
} from "@privy-io/react-auth";

export default function SignInModal() {
  const [returningUser, setReturningUser] = useState(true);
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
  });

  const code1 = useRef<HTMLInputElement>(null);
  const code2 = useRef<HTMLInputElement>(null);
  const code3 = useRef<HTMLInputElement>(null);
  const code4 = useRef<HTMLInputElement>(null);
  const code5 = useRef<HTMLInputElement>(null);
  const code6 = useRef<HTMLInputElement>(null);

  const [showWallets, setShowWallets] = useState(false);
  const [verifyCode, setVerifyCode] = useState(false);

  const { isOpen } = useModal("sign-in");

  const { sendCode, loginWithCode } = useLoginWithEmail();
  const { loading, initOAuth } = useLoginWithOAuth();

  const { login } = usePrivy();

  useEffect(() => {
    if (isOpen) {
      setReturningUser(true);
      setEmail("");
      setShowWallets(false);
      setEmailCode({
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        6: "",
      });
      setVerifyCode(false);
    }
  }, [isOpen]);

  return (
    <Modal id="sign-in" className="gap-4 w-[400px] overflow-hidden">
      <div className="relative flex items-center justify-center flex-shrink-0 h-48 w-full">
        <img
          src="https://ipfs.nouns.gg/ipfs/QmSGYg5t25SQDp1xBw5tqDrfsF62T2HHVZpH4VduaAwJkT"
          className="w-full h-full object-cover brightness-75"
          draggable={false}
        />
        {showWallets || verifyCode ? (
          <button
            onClick={() => {
              if (showWallets) setShowWallets(false);
              else if (verifyCode) setVerifyCode(false);
            }}
            className="absolute top-4 left-4 p-2 rounded-full bg-black/60 hover:bg-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-white" />
          </button>
        ) : (
          ""
        )}
        <ToggleModal
          id="sign-in"
          className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black transition-colors"
        >
          <X className="w-4 h-4 text-white" />
        </ToggleModal>
        <div className="absolute bottom-0 left-0 from-black to-transparent bg-gradient-to-t w-full h-16" />
      </div>
      <div className="flex flex-col justify-between h-full gap-4 pb-6 px-6">
        {showWallets ? (
          <div className="flex flex-col gap-4">
            <p className="text-3xl font-bebas-neue text-white leading-none">
              Choose a wallet
            </p>
            <div className="flex flex-col gap-3">
              <button className="flex items-center gap-2 w-full text-white bg-gradient-to-tr from-metamask-dark to-metamask-light font-semibold rounded-lg p-2.5 transition-colors">
                <img
                  src="/wallets/no-bg/metamask.svg"
                  className="w-5 h-5 mr-0.5 ml-0.5 object-contain rounded-md"
                />
                Metamask
              </button>
              <button className="flex items-center gap-2 w-full text-white bg-coinbase-wallet font-semibold rounded-lg p-2.5 transition-colors">
                <img
                  src="/wallets/no-bg/coinbase_wallet.svg"
                  className="w-5 h-5 mr-0.5 ml-0.5 object-contain rounded-md"
                />
                Coinbase Wallet
              </button>
              <button
                onClick={() => login()}
                className="flex items-center gap-2 w-full text-white bg-gradient-to-tr from-rainbow-dark to-rainbow-light font-semibold rounded-lg p-2.5 transition-colors"
              >
                <img
                  src="/wallets/no-bg/rainbow.svg"
                  className="w-5 h-5 mr-0.5 ml-0.5 object-contain rounded-md"
                />
                Rainbow
              </button>
              <button className="flex items-center gap-2 w-full text-white bg-gradient-to-b from-wallet-connect-light to-wallet-connect-dark font-semibold rounded-lg p-2.5 transition-colors">
                <img
                  src="/wallets/no-bg/wallet_connect.svg"
                  className="w-5 h-5 mr-0.5 ml-0.5 object-contain rounded-md"
                />
                Wallet Connect
              </button>
            </div>
          </div>
        ) : verifyCode ? (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <p className="text-3xl font-bebas-neue text-white leading-none">
                Enter confirmation code
              </p>
              <p className="text-sm text-grey-200">
                Please check <span className="text-red">{email}</span> for an
                email and enter your code below.
              </p>
            </div>
            <div className="flex items-center gap-2 w-full h-12 px-8">
              <input
                maxLength={1}
                ref={code1}
                type="text"
                onChange={(e) => {
                  setEmailCode({ ...emailCode, 1: e.target.value });

                  code2.current?.focus();
                }}
                className="bg-transparent border border-grey-600 rounded-md w-full h-full text-center text-2xl font-bebas-neue"
              />
              <input
                maxLength={1}
                ref={code2}
                type="text"
                onChange={(e) => {
                  setEmailCode({ ...emailCode, 2: e.target.value });

                  code3.current?.focus();
                }}
                className="bg-transparent border border-grey-600 rounded-md w-full h-full text-center text-2xl font-bebas-neue"
              />
              <input
                maxLength={1}
                ref={code3}
                type="text"
                onChange={(e) => {
                  setEmailCode({ ...emailCode, 3: e.target.value });

                  code4.current?.focus();
                }}
                className="bg-transparent border border-grey-600 rounded-md w-full h-full text-center text-2xl font-bebas-neue"
              />
              <input
                maxLength={1}
                ref={code4}
                type="text"
                onChange={(e) => {
                  setEmailCode({ ...emailCode, 4: e.target.value });

                  code5.current?.focus();
                }}
                className="bg-transparent border border-grey-600 rounded-md w-full h-full text-center text-2xl font-bebas-neue"
              />
              <input
                maxLength={1}
                ref={code5}
                type="text"
                onChange={(e) => {
                  setEmailCode({ ...emailCode, 5: e.target.value });

                  code6.current?.focus();
                }}
                className="bg-transparent border border-grey-600 rounded-md w-full h-full text-center text-2xl font-bebas-neue"
              />
              <input
                maxLength={1}
                ref={code6}
                type="text"
                onChange={(e) => {
                  setEmailCode({ ...emailCode, 6: e.target.value });
                }}
                className="bg-transparent border border-grey-600 rounded-md w-full h-full text-center text-2xl font-bebas-neue"
              />
            </div>
            <button
              onClick={() => {
                // loginWithCode({ code: Object.values(emailCode).join("") });
              }}
              className="flex justify-center items-center gap-2 w-full text-black bg-white hover:bg-white/70 font-semibold rounded-lg p-2.5 transition-colors"
            >
              {Object.values(emailCode).every((code) => !!code)
                ? "Confirm"
                : "Resend"}
              {Object.values(emailCode).every((code) => !!code) ? (
                <Check className="w-4 h-4" />
              ) : (
                <RefreshCcw className="w-4 h-4" />
              )}
            </button>
          </div>
        ) : (
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
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && email.length > 0) {
                      setVerifyCode(true);
                      // sendCode({ email });
                    }
                  }}
                  value={email}
                  className="bg-transparent outline-none w-full placeholder:text-white/50 text-white"
                />
                <button
                  onClick={() => {
                    if (email.length > 0) {
                      setVerifyCode(true);
                      // sendCode({ email });
                    }
                  }}
                  className="flex items-center gap-1 text-sm hover:text-white/70 transition-colors"
                >
                  Submit
                </button>
              </div>
              <button
                onClick={() => initOAuth({ provider: "discord" })}
                className="flex items-center gap-2 w-full text-white font-semibold bg-discord rounded-lg p-2.5 hover:bg-discord/70 transition-colors"
              >
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
              <button
                onClick={() => initOAuth({ provider: "twitter" })}
                className="flex items-center gap-2 w-full text-white font-semibold bg-twitter rounded-lg p-2.5 hover:bg-twitter/70 transition-colors"
              >
                <TwitterLogo className="w-6 h-6" weight="fill" />
                Continue with Twitter
              </button>
              <button
                onClick={() => setShowWallets(true)}
                className="flex items-center justify-between w-full bg-white rounded-lg p-2.5 hover:bg-white/70 transition-colors group"
              >
                <div className="flex items-center gap-2 text-black font-semibold">
                  <Wallet className="w-6 h-6" weight="fill" />
                  Continue with Wallet
                </div>
                <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-1 text-black" />
              </button>
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
          </div>
        )}

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
