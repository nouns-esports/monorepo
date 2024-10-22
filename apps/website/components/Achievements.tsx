"use client";

import { achievements, type Achievement } from "@/server/queries/achievements";
import type { AuthenticatedUser } from "@/server/queries/users";
import { motion, useMotionValue } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { useDragControls } from "framer-motion";

export default function Achievements(props: { user?: AuthenticatedUser }) {
  const scale = useMotionValue(0.5);

  const controls = useDragControls();

  function preventScroll(e: Event) {
    e.preventDefault();
  }

  function render(achievement: Achievement): React.ReactNode {
    if (achievement.next) {
      if (Array.isArray(achievement.next)) {
        return (
          <>
            <Node achievement={achievement} user={props.user} />
            <Column>
              {achievement.next.map((a) => (
                <Row key={a.id}>{render(a)}</Row>
              ))}
            </Column>
          </>
        );
      }

      return (
        <>
          <Node achievement={achievement} user={props.user} />
          {render(achievement.next)}
        </>
      );
    }

    return <Node achievement={achievement} user={props.user} />;
  }

  return (
    <>
      <motion.div
        drag
        dragMomentum={false}
        dragControls={controls}
        className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center cursor-move"
        style={{ scale }}
      >
        <div className="flex items-center">{render(achievements)}</div>
      </motion.div>
      <motion.div
        className="absolute z-10 top-0 left-0 w-full h-full cursor-move"
        onPointerDown={(e) => {
          controls.start(e);
        }}
        onMouseEnter={() =>
          window.addEventListener("wheel", preventScroll, { passive: false })
        }
        onMouseLeave={() => window.removeEventListener("wheel", preventScroll)}
        onWheel={(e) => {
          const newScale = scale.get() + (e.deltaY > 0 ? -0.1 : 0.1);
          scale.set(Math.max(0.25, Math.min(newScale, 1)));
        }}
      />
    </>
  );
}

function Node(props: { achievement: Achievement; user?: AuthenticatedUser }) {
  const completed = true;
  const claimed = false;

  return (
    <>
      {props.achievement.id !== "enter-nexus" ? (
        <div className="w-8 h-2 bg-white" />
      ) : null}
      <img
        src={props.achievement.image}
        draggable={false}
        className={twMerge(
          "relative z-50 w-32 h-32 rounded-md border-8 border-grey-200 grayscale select-none",
          completed && "grayscale-0 border-gold-500",
          completed && claimed && "opacity-50"
        )}
      />
    </>
  );
}

function Column(props: { children: React.ReactNode | React.ReactNode[] }) {
  return (
    <>
      <div className="w-8 h-2 bg-white" />
      <div className="bg-white w-2 h-[calc(100%-120px)]" />
      <div className="flex flex-col gap-8 h-full">{props.children}</div>
    </>
  );
}

function Row(props: { children: React.ReactNode }) {
  return <div className="flex items-center">{props.children}</div>;
}
