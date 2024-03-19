import { drizzle } from "drizzle-orm/node-postgres";
import {
  boolean,
  char,
  pgEnum,
  pgTable,
  text,
  time,
  serial,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { Pool } from "pg";
import { env } from "@/env";

export const games = pgTable("games", {
  id: text("id").primaryKey(),
  active: boolean("active").notNull(),
  name: text("name").notNull(),
  image: text("image").notNull(),
  color: char("color", { length: 7 }).notNull(),
});

export const gamesRelations = relations(games, ({ many }) => ({
  rosters: many(rosters),
}));

export const rosters = pgTable("rosters", {
  id: text("id").primaryKey(),
  active: boolean("active").notNull(),
  name: text("name").notNull(),
  game: text("game").notNull(),
  liquipedia: text("liquipedia").notNull(),
});

export const rostersRelations = relations(rosters, ({ one, many }) => ({
  game: one(games, {
    fields: [rosters.game],
    references: [games.id],
  }),
  talent: many(talent),
}));

export const talent = pgTable("talent", {
  id: text("id").primaryKey(),
  active: boolean("active").notNull(),
  name: text("name").notNull(),
  image: text("image"),
  role: text("role").notNull(),
  roster: text("roster").notNull(),
  liquipedia: text("liquipedia"),
  twitch: text("twitch"),
  twitter: text("twitter"),
  youtube: text("youtube"),
  tiktok: text("tiktok"),
  instagram: text("instagram"),
});

export const talentRelations = relations(talent, ({ one }) => ({
  roster: one(rosters, {
    fields: [talent.roster],
    references: [rosters.id],
  }),
}));

export const creators = pgTable("creators", {
  id: text("id").primaryKey(),
  active: boolean("active").notNull(),
  name: text("name").notNull(),
  image: text("image").notNull(),
  liquipedia: text("liquipedia"),
  twitch: text("twitch"),
  twitter: text("twitter"),
  youtube: text("youtube"),
  tiktok: text("tiktok"),
  instagram: text("instagram"),
});

export const projects = pgTable("projects", {
  id: text("id").primaryKey(),
  active: boolean("active").notNull(),
  name: text("name").notNull(),
  image: text("image").notNull(),
  url: text("url").notNull(),
});

export const pass = pgEnum("pass", ["og", "vip", "community", "premium"]);

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  pass: pass("pass").notNull(),
});

// export const badges = pgTable("badges", {
//   id: text("id").primaryKey(),
//   name: text("name").notNull(),
//   description: text("description").notNull(),
//   image: text("image").notNull(),
//   timestamp: time("timestamp").notNull(),
// });

// export const snapshots = pgTable("snapshots", {
//   id: serial("id").primaryKey(),
//   type: text("type").notNull(),
//   timestamp: time("timestamp").notNull(),
//   user: text("user").notNull(),
// });

// export const snapshotRelations = relations(snapshots, ({ one }) => ({
//   user: one(users, {
//     fields: [snapshots.user],
//     references: [users.id],
//   }),
// }));

export const applicationResponses = pgTable("applicationResponses", {
  user: text("user").primaryKey(),
  whatGameDoYouPlayTheMost: text("whatGameDoYouPlayTheMost").notNull(),
  whoAreYouAndWhatIsYourEsportsBackground: text(
    "whoAreYouAndWhatIsYourEsportsBackground"
  ).notNull(),
  whatDoYouThinkIsNeededToPushTheEsportsIndustryForward: text(
    "whatDoYouThinkIsNeededToPushTheEsportsIndustryForward"
  ).notNull(),
  whatThingsWouldYouLikeToSeeFundedByNouns: text(
    "whatThingsWouldYouLikeToSeeFundedByNouns"
  ).notNull(),
});

export const applicationResponsesRelations = relations(
  applicationResponses,
  ({ one }) => ({
    user: one(users, {
      fields: [applicationResponses.user],
      references: [users.id],
    }),
  })
);

export const db = drizzle(
  new Pool({
    connectionString: env.DATABASE_URL,
  }),
  {
    schema: {
      games,
      rosters,
      talent,
      creators,
      projects,
      users,
      applicationResponses,
    },
  }
);

export type Game = typeof games.$inferSelect;
export type Roster = typeof rosters.$inferSelect;
export type Talent = typeof talent.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type Creator = typeof creators.$inferSelect;
export type User = typeof users.$inferSelect;
export type ApplicationResponse = typeof applicationResponses.$inferSelect;
