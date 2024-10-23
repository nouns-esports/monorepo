"use client";

import type { AuthenticatedUser } from "@/server/queries/users";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { useDragControls } from "framer-motion";
import Button from "./Button";
import { Sparkles } from "lucide-react";

export default function Achievements(props: {
  user?: AuthenticatedUser;
  achievementProgress: Record<string, "claimed" | "completed" | "incomplete">;
}) {
  const scale = useMotionValue(0.4);

  const controls = useDragControls();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const backgroundSize = useTransform(scale, (value) => `${value * 20}px`);
  const backgroundPositionX = useTransform(x, (value) => `${value}px`);
  const backgroundPositionY = useTransform(y, (value) => `${value}px`);

  function preventScroll(e: Event) {
    e.preventDefault();
  }

  function render(
    achievement: Achievement,
    parent?: Achievement
  ): React.ReactNode {
    if (achievement.next) {
      if (Array.isArray(achievement.next)) {
        return (
          <>
            <Node
              achievement={achievement}
              user={props.user}
              state={props.achievementProgress[achievement.id] ?? "incomplete"}
              locked={
                parent && props.achievementProgress[parent.id] !== "claimed"
              }
            />
            <Row>
              {achievement.next.map((a) => (
                <Column key={a.id}>{render(a, achievement)}</Column>
              ))}
            </Row>
          </>
        );
      }

      return (
        <>
          <Node
            achievement={achievement}
            user={props.user}
            state={props.achievementProgress[achievement.id] ?? "incomplete"}
            locked={
              parent && props.achievementProgress[parent.id] !== "claimed"
            }
          />
          {render(achievement.next, achievement)}
        </>
      );
    }

    return (
      <Node
        achievement={achievement}
        user={props.user}
        state={props.achievementProgress[achievement.id] ?? "incomplete"}
        locked={parent && props.achievementProgress[parent.id] !== "claimed"}
      />
    );
  }

  return (
    <motion.div
      style={{
        backgroundSize,
        backgroundPositionX,
        backgroundPositionY,
      }}
      className="absolute top-0 left-0 w-full h-full flex items-center justify-center cursor-move bg-[url(/dots.svg)] bg-repeat"
      onPointerDown={(e) => {
        controls.start(e);
      }}
      dragPropagation={false}
      onMouseEnter={() =>
        window.addEventListener("wheel", preventScroll, { passive: false })
      }
      onMouseLeave={() => window.removeEventListener("wheel", preventScroll)}
      onWheel={(e) => {
        const newScale = scale.get() + (e.deltaY > 0 ? -0.05 : 0.05);
        scale.set(Math.max(0.25, Math.min(newScale, 1)));
      }}
    >
      <motion.div
        drag
        dragMomentum={false}
        dragControls={controls}
        style={{ scale }}
        onDrag={(event, info) => {
          x.set(info.point.x);
          y.set(info.point.y);
        }}
        className="flex flex-col items-center flex-shrink-0"
      >
        {render(achievements)}
      </motion.div>
    </motion.div>
  );
}

function Node(props: {
  achievement: Achievement;
  user?: AuthenticatedUser;
  state: "claimed" | "completed" | "incomplete";
  locked?: boolean;
}) {
  return (
    <>
      {props.achievement.id !== "enterNexus" ? (
        <div className="h-8 w-2 bg-white" />
      ) : null}
      <div className="relative group cursor-pointer">
        <img
          src={props.achievement.image}
          draggable={false}
          className={twMerge(
            "w-32 h-32 rounded-md border-8 border-grey-200 grayscale select-none",
            !props.locked &&
              props.state === "completed" &&
              "grayscale-0 border-green",
            !props.locked &&
              props.state === "claimed" &&
              "grayscale-0 border-gold-500"
          )}
        />
        <div className="absolute z-10 top-4 -left-4 rounded-xl drop-shadow-2xl h-[calc(100%_+_64px)] flex flex-col bg-grey-800 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
          <img
            src={props.achievement.image}
            draggable={false}
            className={twMerge(
              "absolute -top-4 left-4 w-32 h-32 rounded-md border-8 border-grey-200 grayscale select-none",
              !props.locked &&
                props.state === "completed" &&
                "grayscale-0 border-green",
              !props.locked &&
                props.state === "claimed" &&
                "grayscale-0 border-gold-500"
            )}
          />
          <div
            className={twMerge(
              "h-24 w-full bg-grey-200 rounded-xl flex-shrink-0 pl-40 pr-4 flex gap-8 justify-between items-center",
              !props.locked && props.state === "completed" && "bg-green",
              !props.locked && props.state === "claimed" && "bg-gold-500"
            )}
          >
            <p className="text-white font-bebas-neue text-4xl text-nowrap">
              {props.achievement.name}
            </p>
            {props.achievement.xp > 0 ? (
              <p className="text-white text-2xl flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-white" />
                {props.achievement.xp}
              </p>
            ) : null}
          </div>
          <div className="flex-1 flex justify-between items-center gap-8 px-6 pt-2">
            <p className="text-grey-200 text-2xl min-w-96 line-clamp-2">
              {props.achievement.description}
            </p>
            <Button
              disabled={
                props.locked ||
                props.state === "claimed" ||
                props.state === "incomplete"
              }
              onClick={() => {}}
              size="lg"
            >
              {props.state === "claimed" ? "Claimed" : "Claim"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

function Row(props: { children: React.ReactNode | React.ReactNode[] }) {
  return (
    <>
      <div className="h-8 w-2 bg-white" />
      <div className="bg-white h-2 w-[calc(100%-120px)]" />
      <div className="flex gap-8 w-full">{props.children}</div>
    </>
  );
}

function Column(props: { children: React.ReactNode }) {
  return <div className="flex flex-col items-center">{props.children}</div>;
}

export type Achievement = {
  id: string;
  name: string;
  description: string;
  image: string;
  xp: number;
  next?: Achievement | Achievement[];
};

export const achievements = {
  id: "enterNexus",
  name: "Enter the Nexus",
  description: "Begin your Nouns Esports journey",
  image: "/logo/logo-square.png",
  xp: 0,
  next: [
    {
      id: "connectFarcaster",
      name: "Connect Farcaster",
      description: "Connect a Farcaster account to your profile",
      image:
        "https://ipfs.nouns.gg/ipfs/QmRjMR3EPSWhvs92VQZFTNZGDf6x1t3R2HDACh99t7ctvY",
      xp: 100,
    },
    {
      id: "connectDiscord",
      name: "Connect Discord",
      description: "Connect a Discord account to your profile",
      image:
        "https://ipfs.nouns.gg/ipfs/Qmdr53EbSCYs3jYod3NJF5PuTHF1tPW96bEYkK2z6Xc4yT",
      xp: 100,
      next: {
        id: "joinServer",
        name: "Join the Discord Server",
        description: "Join our community Discord server",
        image:
          "https://ipfs.nouns.gg/ipfs/QmeEab8zrjsY7gPw4CEqTLxmdVck3JvhrskuJDRegvsMh3",
        xp: 100,
        next: {
          id: "attendCall",
          name: "Attend a Contributor Call",
          description:
            "Attend the weekly Contributor Call in our Discord server",
          image:
            "https://ipfs.nouns.gg/ipfs/QmS654Bm585TcoJpF7DuL1FC7REb9ntxjJkmpWK2L6pEuZ",
          xp: 100,
        },
      },
    },
    {
      id: "connectWallet",
      name: "Connect Wallet",
      description: "Connect a wallet to your profile",
      image:
        "https://ipfs.nouns.gg/ipfs/QmQxxdw7GqszLAZ6HqR8FWv5Lva9qq7iD3mT1bdCp2aPE3",
      xp: 100,
    },
    {
      id: "createProposal",
      name: "Create your first Proposal",
      description: "Create your first proposal",
      image:
        "https://ipfs.nouns.gg/ipfs/QmZXCtrxYvMhMDuryUhTiQYA85vkEhFdcLHbUrLZFsV1wK",
      xp: 100,

      next: [
        {
          id: "getAVote",
          name: "Get a vote on your proposal",
          description: "Get a vote on your proposal",
          image:
            "https://ipfs.nouns.gg/ipfs/QmYveqUvMiMFcqWXN1yGWKZv9jT4fujiZCM6Bij1cWuNhV",
          xp: 100,

          next: {
            id: "tenVoters",
            name: "Get votes from 10 unique voters on a single proposal",
            description: "Get votes from 10 unique voters on a single proposal",
            image:
              "https://ipfs.nouns.gg/ipfs/QmZZsQGVMqd1znAPzXTv8aSJLZc8V5dtn9RiBpNMEH88Sz",
            xp: 100,
          },
        },
        {
          id: "winARound",
          name: "Win a round",
          description: "Win a round",
          image:
            "https://ipfs.nouns.gg/ipfs/QmUmmd9xzDZWgvkhtNjiyTBtwDgP491caZcpe9F3wcSzxW",
          xp: 100,

          next: {
            id: "placeFirst",
            name: "Place 1st in a round",
            description: "Place 1st in a round",
            image:
              "https://ipfs.nouns.gg/ipfs/QmdEiVsfSwWiDvKafCWv1nkFeZBVUCY3Bcef4zdq641p2X",
            xp: 100,
          },
        },
      ],
    },

    {
      id: "connectX",
      name: "Connect X",
      description: "Connect an X account to your profile",
      image:
        "https://ipfs.nouns.gg/ipfs/Qmeks4Fyscak18kskcsMP1YgEvjtiPzWNk7g1h8c5E1At9",
      xp: 100,
    },
    {
      id: "reachExplorer",
      name: "Reach Explorer",
      description: "Reach the Explorer rank",
      image:
        "https://ipfs.nouns.gg/ipfs/QmRSvaTR55WMnjy6J4WDqYEkUSdffyd7gaaY2jm1mgVJmz",
      xp: 100,
      next: {
        id: "reachChallenger",
        name: "Reach Challenger",
        description: "Reach the Challenger rank",
        image:
          "https://ipfs.nouns.gg/ipfs/QmbTy1UNeardoRz2iaWJSqXZ97bDqYxAtBa8KhZ1SJNw5S",
        xp: 100,

        next: {
          id: "reachChampion",
          name: "Reach Champion",
          description: "Reach the Champion rank",
          image:
            "https://ipfs.nouns.gg/ipfs/QmPfyBKcFsAEnJT4YfqRUf2qKCSXaaee1Ld9z99ZYetS8h",
          xp: 100,
        },
      },
    },
    {
      id: "completeQuest",
      name: "Complete your first Quest",
      description: "Complete your first quest",
      image:
        "https://ipfs.nouns.gg/ipfs/QmUdsi8KvvFyQVvk4FrzE5u2856pW7gw3t8yPLYvTrE54n",
      xp: 100,
    },
    {
      id: "castVote",
      name: "Cast your first Vote",
      description: "Cast your first vote on a proposal",
      image:
        "https://ipfs.nouns.gg/ipfs/QmQgZf1f7orqjeRpNCgNGTFBhshDdX3mUMZubeN5CVdQVR",
      xp: 100,

      next: {
        id: "castVoteWinningProposal",
        name: "Cast a vote on a winning proposal",
        description:
          "Cast a vote on a proposal that ended up winning the round",
        image:
          "https://ipfs.nouns.gg/ipfs/QmZ9h5CSssYyVqmDA8r4zVFyXY4KkK9EdhCxfhJEPiv7Rx",
        xp: 100,
      },
    },
  ],
} satisfies Achievement;
