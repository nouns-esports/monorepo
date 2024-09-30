import { env } from "~/env";
import { unstable_cache as cache } from "next/cache";
import { db, events, quests, xp } from "~/packages/db/schema";
import { desc, eq } from "drizzle-orm";

export const getEvents = cache(
  async (input?: { limit?: number }) => {
    return db.query.events.findMany({
      orderBy: desc(events.start),
      limit: input?.limit,
    });
  },
  ["getEvents"],
  { revalidate: 60 * 10 }
);

export const getEvent = cache(
  async (input: { id: string }) => {
    return db.query.events.findFirst({
      where: eq(events.id, input.id),
      with: {
        quests: {
          with: { community: true },
        },
        rounds: {
          with: { community: true },
        },
      },
    });
  },
  ["getEvent"],
  { revalidate: 60 * 10 }
);

export const getCurrentEvent = cache(
  async () => {
    return db.query.events.findFirst({
      where: eq(events.featured, true),
    });
  },
  ["currentEvent"],
  { revalidate: 60 * 10 }
);

export const getEventQuests = cache(
  async (input: { event: string; user?: string }) => {
    return db.query.quests.findMany({
      where: eq(quests.event, input.event),
      with: {
        community: true,
        completed: input?.user
          ? {
              where: eq(xp.user, input.user),
              limit: 1,
              columns: { id: true },
            }
          : undefined,
      },
    });
  },
  ["getEventQuests"],
  { tags: ["getEventQuests"], revalidate: 60 * 10 }
);
