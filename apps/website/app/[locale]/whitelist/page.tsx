"use client";

import Button from "@/components/Button";
import TextArea from "@/components/form/TextArea";
import { usePrivy } from "@privy-io/react-auth";

export default function Whitelist() {
  const { authenticated, login, linkWallet, linkDiscord } = usePrivy();

  return (
    <div className="flex w-full">
      <div className="flex flex-col items-center max-sm:p-8 gap-8 w-full max-w-[1920px]">
        <img
          src="/banner.webp"
          alt="Nouns Esports Banner"
          className="brightness-75 object-cover w-full h-[25vw] max-h-[500px] rounded-b-2xl overflow-hidden object-center"
        />
        <div className="flex flex-col items-center gap-8 mb-8 max-w-4xl">
          <h1 className="font-luckiest-guy text-white text-6xl">
            Become a Nouns Esports OG
          </h1>
          <p className="max-w-2xl text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          {!authenticated ? (
            <Button
              onClick={() => {
                login();
              }}
            >
              Get Started
            </Button>
          ) : (
            <form className="flex flex-col gap-8">
              <div className="flex flex-col gap-6">
                <FormHeader>Step 1 - Connect a Wallet</FormHeader>
                <Button
                  onClick={() => {
                    linkWallet();
                  }}
                >
                  Connect Wallet
                </Button>
              </div>
              <div className="flex flex-col gap-6">
                <FormHeader>Step 2 - Join the Discord server</FormHeader>
                <Button
                  onClick={() => {
                    linkDiscord();
                  }}
                >
                  Connect Discord
                </Button>
              </div>
              <div className="flex flex-col gap-6">
                <FormHeader>Step 3 - Connect adtitional accounts</FormHeader>
                <div className="flex gap-4">
                  <Button
                    onClick={() => {
                      linkWallet();
                    }}
                  >
                    Email
                  </Button>
                  <Button
                    onClick={() => {
                      linkWallet();
                    }}
                  >
                    Twitter
                  </Button>
                  <Button
                    onClick={() => {
                      linkWallet();
                    }}
                  >
                    Farcaster
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-6 w-full">
                <FormHeader>Step 4 - Tell us about yourself</FormHeader>
                <TextArea label="Who are you?" placeholder="Type here..." />
                <TextArea
                  label="What is your esports / gaming background?"
                  placeholder="Type here..."
                />
                <TextArea
                  label="How have you contributed to the esports / gaming industry?"
                  placeholder="Type here..."
                />
              </div>
              <div>
                <Button onClick={() => {}}>Submit</Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function FormHeader(props: { children: React.ReactNode }) {
  return (
    <h2 className="text-white text-3xl font-luckiest-guy">{props.children}</h2>
  );
}

function Label(props: { children: React.ReactNode }) {
  return (
    <label className="text-white font-lg font-bold">{props.children}</label>
  );
}
