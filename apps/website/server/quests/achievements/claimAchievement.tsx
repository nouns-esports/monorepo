import { and, eq } from "drizzle-orm";
import createAction from "../createAction";
import { db, xp } from "~/packages/db/schema";
import { achievements } from "@/server/achievements";

export const claimAchievement = createAction<{ achievement?: string }>(
  async (actionInputs) => {
    const achievement = actionInputs.achievement
      ? achievements[actionInputs.achievement]
      : undefined;

    return {
      description: (
        <p>
          {achievement ? (
            <>
              Claim the <span className="text-red">{achievement.name}</span>{" "}
              achievement
            </>
          ) : (
            "Claim any achievement"
          )}
        </p>
      ),
      url: "/nexus",
      check: async (user) => {
        const claimedAchievement = await db.query.xp.findFirst({
          where: and(
            eq(xp.user, user.id),
            actionInputs.achievement
              ? eq(xp.achievement, actionInputs.achievement)
              : undefined
          ),
        });

        if (!claimedAchievement) return false;

        return true;
      },
    };
  }
);
