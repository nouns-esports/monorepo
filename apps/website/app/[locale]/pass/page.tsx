"use client";

import Button from "@/components/Button";
import TextArea from "@/components/form/TextArea";
import TextInput from "@/components/form/TextInput";
import { useSmartAccount } from "@/providers/Privy";
import { usePrivy } from "@privy-io/react-auth";
import {
  NumberCircleOne,
  NumberCircleTwo,
  NumberCircleThree,
  NumberCircleFour,
  TwitterLogo,
  DiscordLogo,
  EnvelopeSimple,
  Wallet,
  ArrowSquareOut,
} from "phosphor-react-sc";
import { useEffect, useState } from "react";
import { LinkIt } from "react-linkify-it";
import Link from "@/components/Link";
import { useDebounce } from "@uidotdev/usehooks";
import { query } from "@/app/api/query/client";
import { z } from "zod";
import toast from "react-hot-toast";

const idSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9_]+$/);

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
    user: privyUser,
    getAccessToken,
  } = usePrivy();

  const { user, address } = useSmartAccount();

  const [id, setId] = useState("");
  const debouncedId = useDebounce(id, 300);

  const [isIdValid, setIsIdValid] = useState(false);

  const [idTaken, setIdTaken] = useState(false);

  useEffect(() => {
    if (debouncedId) {
      if (idSchema.safeParse(debouncedId.toLocaleLowerCase()).success) {
        setIsIdValid(true);
      } else setIsIdValid(false);

      query.getId.query({ id: debouncedId.toLocaleLowerCase() }).then((id) => {
        if (id) setIdTaken(true);
        else setIdTaken(false);
      });
    }
  }, [debouncedId]);

  const [
    whatGameDoYouCurrentlyPlayTheMost,
    setWhatGameDoYouCurrentlyPlayTheMost,
  ] = useState("");
  const [
    whoAreYouAndWhatIsYourEsportsBackground,
    setWhoAreYouAndWhatIsYourEsportsBackground,
  ] = useState("");
  const [
    whatDoYouThinkIsNeededToPushTheEsportsIndustryForward,
    setWhatDoYouThinkIsNeededToPushTheEsportsIndustryForward,
  ] = useState("");
  const [
    whatThingsWouldYouLikeToSeeFundedByNouns,
    setWhatThingsWouldYouLikeToSeeFundedByNouns,
  ] = useState("");

  const [applied, setApplied] = useState(false);
  const [approved, setApproved] = useState(false);

  useEffect(() => {
    if (address) {
      query.getApplicationResponse
        .query({ wallet: address })
        .then((response) => {
          console.log("response", response);
          if (response) setApplied(true);
        });

      query.getUser.query({ address: address }).then((user) => {
        console.log("user", user);
        if (user) {
          if (user.pass === "og") {
            setApproved(true);
          }
        }
      });
    }
  }, [address]);

  return (
    <div className="flex justify-center w-full mb-32 max-sm:mb-16">
      <div className="flex flex-col items-center max-sm:p-8 max-sm:mt-16 max-[400px]:p-4 gap-8 w-full max-w-[1920px]">
        <img
          src="/banner.webp"
          alt="Nouns Esports Banner"
          className="brightness-75 max-sm:brightness-100 object-cover w-full h-[25vw] max-sm:h-32 max-h-[500px] rounded-2xl max-sm:rounded-t-2xl max-[1920px]:rounded-t-none overflow-hidden object-center mt-32 max-[1920px]:mt-0 "
        />
        <div className="flex flex-col items-center gap-8 max-sm:gap-4 mb-8 max-w-4xl">
          <h1 className="font-luckiest-guy text-white text-center text-6xl max-sm:text-3xl max-md:text-4xl">
            Become a Nouns Esports Pass Member
          </h1>
          <p className="text-center text-lg leading-snug max-sm:text-sm">
            Join our esports journey at Nouns Esports! We're offering a unique
            opportunity for esports enthusiasts to directly influence our major
            decisions. Apply for a Nouns Esport Pass, and if accepted, you'll be
            given the power to vote on key organizational decisions, making you
            an active participant in shaping our future. Don't miss out on this
            chance to be part of our community-driven approach to esports.
          </p>
          {authenticated ? (
            !applied ? (
              <div className="flex flex-col gap-4 items-center">
                <h2 className="text-white text-3xl font-luckiest-guy">
                  Your Application
                </h2>
                <p className="text-white font-bebas-neue text-xl">
                  Status:{" "}
                  <span className={approved ? "text-green" : "text-yellow"}>
                    {approved ? "Approved" : "In Review"}
                  </span>
                </p>
                <p className="text-white max-w-md text-center">
                  {approved
                    ? "Congrats on becoming a Nouns Esports Pass member! Keep an eye out for more information on our Twitter or in the Discord server."
                    : "We are reviewing your application. Check back here in a few days to see if you've been approved."}
                </p>
                <ProfileCard
                  pfp={privyUser?.farcaster?.pfp}
                  id={user?.id ?? id}
                  address={address}
                  bio={privyUser?.farcaster?.bio}
                  connections={{
                    discord: privyUser?.discord?.username,
                    twitter: privyUser?.twitter?.username,
                    email: privyUser?.email?.address,
                    farcaster: privyUser?.farcaster?.username,
                    wallet: privyUser?.wallet?.address,
                  }}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-16 max-w-md">
                <div className="flex flex-col gap-6">
                  <FormHeader number={1}>Create your profile</FormHeader>
                  <ProfileCard
                    pfp={privyUser?.farcaster?.pfp}
                    id={id ? id : "New User"}
                    address={address}
                    bio={privyUser?.farcaster?.bio}
                    connections={{
                      discord: privyUser?.discord?.username,
                      twitter: privyUser?.twitter?.username,
                      email: privyUser?.email?.address,
                      farcaster: privyUser?.farcaster?.username,
                      wallet: privyUser?.wallet?.address,
                    }}
                  />

                  <div className="flex flex-col gap-2">
                    <h2 className="text-white font-semibold">Add a wallet</h2>
                    <Button
                      onClick={() => {
                        linkWallet();
                      }}
                    >
                      {privyUser?.wallet
                        ? `Connected: ${privyUser?.wallet.address.slice(
                            0,
                            5
                          )}...${privyUser?.wallet.address.slice(-3)}`
                        : "Connect Wallet"}
                    </Button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-white font-semibold">
                      Connect your Discord account
                    </h2>
                    <Button
                      onClick={() => {
                        linkDiscord();
                      }}
                    >
                      {privyUser?.discord
                        ? `Connected: ${privyUser?.discord.username}`
                        : "Connect Discord"}
                    </Button>
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-white font-semibold">
                      Connect additional accounts (optional)
                    </h2>
                    <p className="mb-3 leading-tight max-sm:text-sm">
                      Even though connecting additional accounts is optional,
                      include as much information as possible to give yourself
                      the highest chance of being accepted.
                    </p>
                    <div className="flex gap-4 flex-wrap">
                      <Button
                        onClick={() => {
                          linkTwitter();
                        }}
                      >
                        {privyUser?.twitter
                          ? `Connected: ${privyUser?.twitter.username}`
                          : "Connect Twitter"}
                      </Button>
                      <Button
                        onClick={() => {
                          linkFarcaster();
                        }}
                      >
                        {privyUser?.farcaster
                          ? `Connected: ${privyUser?.farcaster.username}`
                          : "Connect Farcaster"}
                      </Button>
                      <Button
                        onClick={() => {
                          linkEmail();
                        }}
                      >
                        {privyUser?.email
                          ? `Connected: ${privyUser?.email.address}`
                          : "Connect Email"}
                      </Button>
                    </div>
                  </div>
                  <TextInput
                    placeholder="@handle"
                    label="Claim your Nouns Esports ID"
                    small
                    value={id}
                    error={
                      idTaken
                        ? "ID already taken"
                        : !isIdValid && id.length > 0
                          ? "ID can only include letters, numbers, and underscores"
                          : undefined
                    }
                    onChange={(value) => setId(value)}
                  />
                </div>
                {/* <div className="flex flex-col gap-6">
                <FormHeader number={2}>Join the Discord server</FormHeader>
                <div className="flex items-center gap-6">
                  <Button onClick={() => {}}>Verify</Button>{" "}
                  <Link
                    href="/discord"
                    newTab
                    className="text-white flex items-center gap-1 hover:underline"
                  >
                    Join the server
                    <ArrowSquareOut
                      weight="fill"
                      className="w-4 h-4 text-white"
                    />
                  </Link>
                </div>
              </div> */}
                <div className="flex flex-col gap-6 w-full">
                  <FormHeader number={2}>Tell us about yourself</FormHeader>
                  <TextInput
                    label="What game do you currently play the most?"
                    placeholder="CS 2, Dota 2, Smash Melee, etc..."
                    value={whatGameDoYouCurrentlyPlayTheMost}
                    onChange={setWhatGameDoYouCurrentlyPlayTheMost}
                  />
                  <TextArea
                    label="Who are you and what is your esports / gaming background?"
                    placeholder="Competitive player, fan, event organizer, etc..."
                    value={whoAreYouAndWhatIsYourEsportsBackground}
                    onChange={setWhoAreYouAndWhatIsYourEsportsBackground}
                  />
                  <TextArea
                    label="What do you think is needed to push the esports industry forward?"
                    placeholder="Fan empowerment, transparency, etc..."
                    value={
                      whatDoYouThinkIsNeededToPushTheEsportsIndustryForward
                    }
                    onChange={
                      setWhatDoYouThinkIsNeededToPushTheEsportsIndustryForward
                    }
                  />
                  <TextArea
                    label="What things would you like to see funded by Nouns?"
                    placeholder="Rocket League roster, content creators, tournaments, etc..."
                    value={whatThingsWouldYouLikeToSeeFundedByNouns}
                    onChange={setWhatThingsWouldYouLikeToSeeFundedByNouns}
                  />
                </div>
                <div className="flex flex-col gap-4 w-full">
                  <FormHeader number={3}>Submit your responses</FormHeader>
                  <p className="mb-3 leading-tight max-sm:text-sm">
                    Responses can only be submitted once. Reach out to us in the{" "}
                    <Link href="/discord" className="text-red">
                      Discord
                    </Link>{" "}
                    server if you have any questions.
                  </p>
                  <Button
                    onClick={async () => {
                      if (idSchema.safeParse(id).success) {
                        if (
                          address &&
                          privyUser?.discord &&
                          privyUser?.wallet
                        ) {
                          if (
                            whatGameDoYouCurrentlyPlayTheMost &&
                            whoAreYouAndWhatIsYourEsportsBackground &&
                            whatDoYouThinkIsNeededToPushTheEsportsIndustryForward &&
                            whatThingsWouldYouLikeToSeeFundedByNouns
                          ) {
                            const token = await getAccessToken();

                            if (token) {
                              try {
                                await query.setUser.mutate({
                                  token,
                                  wallet: address,
                                  id,
                                  pass: "community",
                                });

                                await query.setApplicationResponse.mutate({
                                  token,
                                  user: address,
                                  whatGameDoYouPlayTheMost:
                                    whatGameDoYouCurrentlyPlayTheMost,
                                  whoAreYouAndWhatIsYourEsportsBackground:
                                    whoAreYouAndWhatIsYourEsportsBackground,
                                  whatDoYouThinkIsNeededToPushTheEsportsIndustryForward:
                                    whatDoYouThinkIsNeededToPushTheEsportsIndustryForward,
                                  whatThingsWouldYouLikeToSeeFundedByNouns:
                                    whatThingsWouldYouLikeToSeeFundedByNouns,
                                });
                              } catch (error) {
                                toast.error(
                                  `Erorr: ${
                                    // @ts-ignore
                                    error.message
                                  }`
                                );
                              }

                              setApplied(true);
                            }
                          }
                        }
                      }
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            )
          ) : (
            <Button
              onClick={() => {
                login();
              }}
            >
              Get Started
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function ProfileCard(props: {
  pfp?: string | null;
  id?: string | null;
  bio?: string | null;
  address?: string | null;
  connections?: {
    discord?: string | null;
    twitter?: string | null;
    email?: string | null;
    farcaster?: string | null;
    wallet?: string | null;
  };
}) {
  return (
    <div className="flex flex-col gap-4 bg-darkgrey rounded-xl w-fit min-w-[400px] max-sm:min-w-0 max-sm:w-full p-3">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <img
            src={
              props?.pfp ??
              `https://api.cloudnouns.com/v1/pfp?text=${props.address}`
            }
            alt=""
            className="w-10 h-10 object-cover object-center rounded-full"
          />
          <p className="text-white font-bebas-neue text-2xl">
            {props?.id ?? props.address ?? "Loading..."}
          </p>
        </div>
        <div className="flex items-center gap-2 last:mr-2">
          {props.connections?.wallet ? (
            <Wallet weight="fill" className="w-6 h-6 text-white" />
          ) : (
            ""
          )}
          {props.connections?.discord ? (
            <DiscordLogo weight="fill" className="w-6 h-6 text-white" />
          ) : (
            ""
          )}
          {props.connections?.twitter ? (
            <TwitterLogo weight="fill" className="w-6 h-6 text-white" />
          ) : (
            ""
          )}
          {props.connections?.farcaster ? (
            <img src="/farcaster.svg" className="w-5 h-5" />
          ) : (
            ""
          )}
          {props.connections?.email ? (
            <EnvelopeSimple weight="fill" className="w-6 h-6 text-white" />
          ) : (
            ""
          )}
        </div>
      </div>
      {props.bio ? (
        <p>
          {props.bio
            .toString()
            .split(" ")
            .map((part, index) => (
              <LinkIt
                key={index}
                regex={
                  /^(((?!-))(xn--|_)?[a-z0-9-]{0,61}[a-z0-9]{1,1}\.)*(xn--)?([a-z0-9][a-z0-9\-]{0,60}|[a-z0-9-]{1,30}\.[a-z]{2,})$/
                }
                component={(match, index) => (
                  <Link
                    key={index}
                    href={match.includes("http") ? match : `https://${match}`}
                  >
                    <span className="text-red">{match}</span>
                  </Link>
                )}
              >
                <LinkIt
                  regex={/^@[A-Za-z0-9]+/}
                  component={(match, index) => (
                    <Link
                      key={index}
                      href={`https://warpcast.com/${match.substring(1)}`}
                    >
                      <span className="text-red">{match}</span>
                    </Link>
                  )}
                >
                  {part}{" "}
                </LinkIt>
              </LinkIt>
            ))}
        </p>
      ) : (
        ""
      )}
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
          : NumberCircleFour;
  return (
    <h2 className="flex gap-2 items-center text-white text-3xl font-luckiest-guy max-sm:text-2xl">
      <Icon
        className="w-10 h-10 max-sm:w-7 max-sm:h-7 text-white"
        weight="fill"
      />
      {props.children}
    </h2>
  );
}
