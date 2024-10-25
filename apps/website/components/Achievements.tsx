"use client";

import type { AuthenticatedUser } from "@/server/queries/users";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { useDragControls } from "framer-motion";
import Button from "./Button";
import { Sparkles } from "lucide-react";
import { achievementTree, type AchievementTree } from "@/server/achievements";
import { useAction } from "next-safe-action/hooks";
import { claimAchievement } from "@/server/mutations/claimAchievement";
import toast from "react-hot-toast";
import { useModal } from "./Modal";
import EarnedXPModal, { useXPModal } from "./modals/EarnedXPModal";
import { confetti } from "@/utils/confetti";

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
    achievement: AchievementTree,
    parent?: AchievementTree
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
    <>
      <motion.div
        style={{
          backgroundSize,
          backgroundPositionX,
          backgroundPositionY,
        }}
        className="absolute top-0 left-0 w-full h-full flex items-center justify-center cursor-move bg-[url(/dots.svg)] bg-repeat touch-none"
        onPointerDown={(e) => {
          controls.start(e);
        }}
        dragPropagation={false}
        onMouseEnter={() =>
          window.addEventListener("wheel", preventScroll, { passive: false })
        }
        onWheel={(e) => {
          const newScale = scale.get() + (e.deltaY > 0 ? -0.05 : 0.05);
          scale.set(Math.max(0.25, Math.min(newScale, 1)));
        }}
        onMouseLeave={() => window.removeEventListener("wheel", preventScroll)}
        onTouchStart={(e) => {
          if (e.touches.length === 2) {
            const initialDistance = Math.hypot(
              e.touches[0].clientX - e.touches[1].clientX,
              e.touches[0].clientY - e.touches[1].clientY
            );
            const initialScale = scale.get();

            const onTouchMove = (e: TouchEvent) => {
              if (e.touches.length === 2) {
                const distance = Math.hypot(
                  e.touches[0].clientX - e.touches[1].clientX,
                  e.touches[0].clientY - e.touches[1].clientY
                );
                const newScale = (distance / initialDistance) * initialScale;
                scale.set(Math.max(0.25, Math.min(newScale, 1)));
              }
            };

            const onTouchEnd = () => {
              document.removeEventListener("touchmove", onTouchMove);
              document.removeEventListener("touchend", onTouchEnd);
            };

            document.addEventListener("touchmove", onTouchMove);
            document.addEventListener("touchend", onTouchEnd);
          }
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
          {render(achievementTree)}
        </motion.div>
      </motion.div>
      <EarnedXPModal from="achievement" />
    </>
  );
}

function Node(props: {
  achievement: AchievementTree;
  user?: AuthenticatedUser;
  state: "claimed" | "completed" | "incomplete";
  locked?: boolean;
}) {
  const claimAchievementAction = useAction(claimAchievement);

  const { setXP } = useXPModal();
  const { open } = useModal("earned-xp-achievement");

  return (
    <>
      {props.achievement.id !== "enterNexus" ? (
        <div className="h-8 w-2 bg-white" />
      ) : null}
      <div className="relative group cursor-pointer">
        <img
          src={`${props.achievement.image}?img-height=100&img-onerror=redirect`}
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
        <div className="absolute z-10 top-4 -left-4 rounded-xl drop-shadow-2xl h-[calc(100%_+_64px)] flex flex-col bg-grey-800 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto transform-gpu">
          <img
            src={`${props.achievement.image}?img-height=100&img-onerror=redirect`}
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
              loading={claimAchievementAction.isPending}
              disabled={
                props.locked ||
                props.state === "claimed" ||
                props.state === "incomplete"
              }
              onClick={async () => {
                const result = await claimAchievementAction.executeAsync({
                  id: props.achievement.id,
                });

                if (result?.serverError) {
                  return toast.error(result.serverError);
                }

                setXP(props.achievement.xp);
                confetti();
                open();
              }}
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
