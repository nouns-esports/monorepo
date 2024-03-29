import { drizzle } from "drizzle-orm/node-postgres";
import {
  boolean,
  char,
  pgEnum,
  pgTable,
  text,
  time,
  serial,
  numeric,
  smallint,
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

// New (maybe serial for id???)
export const badges = pgTable("badges", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  timestamp: time("timestamp").notNull(),
});

// New (type can be a string or a string:id for things like rounds, but rounds should probably just use a "voter" snapshot type instead and check against the timestamp)
export const snapshots = pgTable("snapshots", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(),
  timestamp: time("timestamp").notNull(),
  user: text("user").notNull(),
});

// New
export const snapshotRelations = relations(snapshots, ({ one }) => ({
  user: one(users, {
    fields: [snapshots.user],
    references: [users.id],
  }),
}));

// New
export const rounds = pgTable("rounds", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  start: time("start").notNull(),
  end: time("end").notNull(),
  category: text("category").notNull(),
  image: text("image").notNull(),
});

// New
export const roundsRelations = relations(rounds, ({ many }) => ({
  awards: many(awards),
  proposals: many(proposals),
}));

// New (type is defined as a CAIP-10 string with an optional ID for 1155 token ids)
// See https://docs.farcaster.xyz/reference/frames/spec#mint
// USDC on Base: eip155:8453:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
// ETH on Base: eip155:8453:0x0000000000000000000000000000000000000000
// An ERC1155: eip155:8453:0xADDRESS:2
// Value with precision 78 is the min value to account for a uint256
export const awards = pgTable("awards", {
  round: text("round").notNull(),
  place: smallint("place").notNull(),
  type: text("type").notNull(),
  value: numeric("value", { precision: 78 }).notNull(),
});

// New
export const awardsRelations = relations(awards, ({ one }) => ({
  round: one(rounds, {
    fields: [awards.round],
    references: [rounds.id],
  }),
}));

// New (word "who" as "tell us about yourself", there will already be basic context as to who is proposing)
export const proposals = pgTable("proposals", {
  user: text("user").primaryKey(),
  round: text("round").notNull(),
  title: text("title").notNull(),
  who: text("who").notNull(),
  why: text("why").notNull(),
});

// New
export const proposalsRelations = relations(proposals, ({ one }) => ({
  user: one(users, {
    fields: [proposals.user],
    references: [users.id],
  }),
  round: one(rounds, {
    fields: [proposals.round],
    references: [rounds.id],
  }),
}));

// New
export const votes = pgTable("votes", {
  user: text("user").primaryKey(),
  round: text("round").notNull(),
  count: smallint("count").notNull(),
});

// New
export const votesRelations = relations(votes, ({ one }) => ({
  user: one(users, {
    fields: [votes.user],
    references: [users.id],
  }),
  round: one(rounds, {
    fields: [votes.round],
    references: [rounds.id],
  }),
}));

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
