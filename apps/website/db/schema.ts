import { drizzle } from "drizzle-orm/node-postgres";
import {
  boolean,
  char,
  pgEnum,
  pgTable,
  text,
  timestamp,
  numeric,
  serial,
  smallint,
  integer,
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

export const badges = pgTable("badges", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  timestamp: timestamp("timestamp", { mode: "date" }).notNull(),
});

// type can be a string or a string:id for things like rounds, but rounds should probably just use a "voter" snapshot type instead and check against the timestamp
export const snapshots = pgTable("snapshots", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(),
  timestamp: timestamp("timestamp", { mode: "date" }).notNull(),
  user: text("user").notNull(),
});

export const snapshotRelations = relations(snapshots, ({ one }) => ({
  user: one(users, {
    fields: [snapshots.user],
    references: [users.id],
  }),
}));

// An infinite round is defined as a round with a null end timestamp and votingStart = start, respecitive proposals will include a value
export const rounds = pgTable("rounds", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  start: timestamp("start", { mode: "date" }).notNull(),
  votingStart: timestamp("votingStart", { mode: "date" }).notNull(),
  end: timestamp("end", { mode: "date" }),
  tags: text("tags").array().notNull(),
  image: text("image").notNull(),
});

export const roundsRelations = relations(rounds, ({ many }) => ({
  awards: many(awards),
  proposals: many(proposals),
}));

// type is defined as a CAIP-10 string with an optional ID for 1155 token ids
// See https://docs.farcaster.xyz/reference/frames/spec#mint
// USDC on Base: eip155:8453:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
// ETH on Base: eip155:8453:0x0000000000000000000000000000000000000000
// An ERC1155: eip155:8453:0xADDRESS:2
// Value with precision 78 is the min value to account for a uint256
// If place is 0, it is an infinite round
export const awards = pgTable("awards", {
  round: text("round").notNull(),
  place: smallint("place").notNull(),
  type: text("type").notNull(),
  value: numeric("value", { precision: 78 }).notNull(),
});

export const awardsRelations = relations(awards, ({ one }) => ({
  round: one(rounds, {
    fields: [awards.round],
    references: [rounds.id],
  }),
}));

// descripiton will be abstracted in frontend as who and why
export const proposals = pgTable("proposals", {
  id: serial("id").primaryKey(),
  user: text("user").notNull(),
  round: text("round").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  value: numeric("value", { precision: 78 }).notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull(),
  hidden: boolean("hidden").default(false).notNull(),
});

export const proposalsRelations = relations(proposals, ({ one, many }) => ({
  user: one(users, {
    fields: [proposals.user],
    references: [users.id],
  }),
  round: one(rounds, {
    fields: [proposals.round],
    references: [rounds.id],
  }),
  votes: many(votes),
}));

export const votes = pgTable("votes", {
  id: serial("id").primaryKey(),
  user: text("user").notNull(),
  proposal: integer("proposal").notNull(),
  round: text("round").notNull(),
  count: smallint("count").notNull(),
  timestamp: timestamp("timestamp", { mode: "date" }).notNull(),
});

export const votesRelations = relations(votes, ({ one }) => ({
  user: one(users, {
    fields: [votes.user],
    references: [users.id],
  }),
  proposal: one(proposals, {
    fields: [votes.proposal],
    references: [proposals.id],
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
      rounds,
      awards,
      proposals,
      votes,
      snapshots,
      badges,
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
export type Round = typeof rounds.$inferSelect;
export type Award = typeof awards.$inferSelect;
export type Proposal = typeof proposals.$inferSelect;
export type Vote = typeof votes.$inferSelect;
export type Snapshot = typeof snapshots.$inferSelect;
export type Badge = typeof badges.$inferSelect;
