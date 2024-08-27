import { db, links, snapshots } from "~/packages/db/schema";
import createAction from "../createAction";
import { and, eq } from "drizzle-orm";

export const visitSite = createAction(async (actionInputs) => {
  if (!actionInputs?.id) {
    throw new Error("Id input missing in action");
  }

  const link = await db.query.links.findFirst({
    where: eq(links.id, actionInputs.id),
  });

  if (!link) {
    throw new Error("Link not found");
  }

  return {
    description: (
      <p>
        Visit{" "}
        <span className="text-red">{link.url.slice(8).split("/")[0]}</span>
      </p>
    ),
    url: `/${link.id}?capture=true`,
    check: async (user) => {
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
