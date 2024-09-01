import { db, links, snapshots } from "~/packages/db/schema";
import createAction from "../createAction";
import { and, eq } from "drizzle-orm";

export const watchVideo = createAction(async (actionInputs) => {
  if (!actionInputs.link) {
    throw new Error("Link input missing in action");
  }

  if (!actionInputs.name) {
    throw new Error("Name input missing in action");
  }

  const link = await db.query.links.findFirst({
    where: eq(links.id, actionInputs.link),
  });

  if (!link) {
    throw new Error("Link not found");
  }

  return {
    description: (
      <p>
        Watch <span className="text-red">{actionInputs.name}</span>
      </p>
    ),
    url: `/${link.id}?capture=true`,
    check: async (user) => {
      if (!link) return false;

      const snapshot = await db.query.snapshots.findFirst({
        where: and(
          eq(snapshots.user, user.id),
          eq(snapshots.type, "link-capture"),
          eq(snapshots.tag, link.id)
        ),
      });

      if (!snapshot) return false;

      return true;
    },
  };
});
