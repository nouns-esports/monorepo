"use client";

import Button from "@/components/Button";
import TextArea from "@/components/form/TextArea";
import { usePrivy } from "@privy-io/react-auth";
import {
  NumberCircleOne,
  NumberCircleTwo,
  NumberCircleThree,
  NumberCircleFour,
  NumberCircleFive,
} from "phosphor-react-sc";

// Nouns Esports Pass
//  - VIP (Whales)
//  - OG (Early Adopters)
//  - Premium (Paid)
//  - Community (Free)

export default function Pass() {
  const {
    authenticated,
    login,
    linkWallet,
    linkDiscord,
    linkTwitter,
    linkEmail,
    linkFarcaster,
  } = usePrivy();

  return (
    <div className="flex w-full">
      <div className="flex flex-col items-center max-sm:p-8 gap-8 w-full max-w-[1920px]">
        <img
          src="/banner.webp"
          alt="Nouns Esports Banner"
          className="brightness-75 object-cover w-full h-[25vw] max-h-[500px] rounded-b-2xl overflow-hidden object-center"
        />
        <div className="flex flex-col items-center gap-8 mb-8 max-w-4xl">
          <h1 className="font-luckiest-guy text-white text-center text-6xl">
            Become a Nouns Esports Pass Member
          </h1>
          <p className="max-w-2xl text-center">
            Join our esports journey at Nouns Esports! We're offering a unique
            opportunity for esports enthusiasts to directly influence our major
            decisions. Apply for a Nouns Esport Pass, and if accepted, you'll be
            given the power to vote on key organizational decisions, making you
            an active participant in shaping our future. Don't miss out on this
            chance to be part of our community-driven approach to esports.
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
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-6">
                <FormHeader number={1}>Connect a Wallet</FormHeader>
                <Button
                  onClick={() => {
                    linkWallet();
                  }}
                >
                  Connect Wallet
                </Button>
              </div>
              <div className="flex flex-col gap-6">
                <FormHeader number={2}>Join the Discord server</FormHeader>
                <Button
                  onClick={() => {
                    linkDiscord();
                  }}
                >
                  Connect Discord
                </Button>
              </div>
              <div className="flex flex-col gap-6">
                <FormHeader number={3}>Connect additional accounts</FormHeader>
                <div className="flex gap-4">
                  <Button
                    onClick={() => {
                      linkEmail();
                    }}
                  >
                    Email
                  </Button>
                  <Button
                    onClick={() => {
                      linkTwitter();
                    }}
                  >
                    Twitter
                  </Button>
                  <Button
                    onClick={() => {
                      linkFarcaster();
                    }}
                  >
                    Farcaster
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-6 w-full">
                <FormHeader number={4}>Tell us about yourself</FormHeader>
                <TextArea
                  label="What game do you currently play the most?"
                  placeholder="CS 2, Dota 2, Smash Melee, etc..."
                />
                <TextArea
                  label="Who are you and what is your esports / gaming background?"
                  placeholder="Competitive player, fan, event organizer, etc..."
                />
                <TextArea
                  label="What do you think is needed to push the esports industry forward?"
                  placeholder="Fan empowerment, transparency, etc..."
                />
                <TextArea
                  label="What games would you like to see funded by Nouns?"
                  placeholder="Rocket League, Valorant, etc..."
                />
              </div>
              <div>
                <Button onClick={() => {}}>Submit</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FormHeader(props: { number: number; children: React.ReactNode }) {
  const Icon =
    props.number === 1
      ? NumberCircleOne
      : props.number === 2
        ? NumberCircleTwo
        : props.number === 3
          ? NumberCircleThree
          : props.number === 4
            ? NumberCircleFour
            : NumberCircleFive;

  return (
    <h2 className="flex gap-2 items-center text-white text-3xl font-luckiest-guy">
      <Icon className="w-10 h-10 text-white" weight="fill" />
      {props.children}
    </h2>
  );
}

function Label(props: { children: React.ReactNode }) {
  return (
    <label className="text-white font-lg font-bold">{props.children}</label>
  );
}
