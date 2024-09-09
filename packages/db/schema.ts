import { drizzle } from "drizzle-orm/node-postgres";
import {
  boolean,
  pgTable,
  text,
  timestamp,
  numeric,
  serial,
  smallint,
  integer,
  pgEnum,
  jsonb,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { Pool } from "pg";
import { env } from "~/env";
import type { User } from "@privy-io/server-auth";

export const links = pgTable("links", {
  id: text("id").primaryKey(),
  url: text("url").notNull(),
});

export const snapshots = pgTable("snapshots", {
  id: serial("id").primaryKey(),
  timestamp: timestamp("timestamp", { mode: "date" }).notNull(),
  type: text("type", { enum: ["link-capture", "discord-call"] }).notNull(),
  tag: text("tag").notNull(),
  user: text("user").notNull(),
});

export const snapshotsRelations = relations(snapshots, ({ one }) => ({
  user: one(nexus, {
    fields: [snapshots.user],
    references: [nexus.id],
  }),
}));

export const communities = pgTable("communities", {
  id: text("id").primaryKey(),
  image: text("image").notNull(),
  name: text("name").notNull(),
  channels: text("channels").array().notNull(),
});

export const communityRelations = relations(communities, ({ many }) => ({
  rosters: many(rosters),
  rounds: many(rounds),
  creations: many(creations),
  events: many(events),
  quests: many(quests),
}));

export const events = pgTable("events", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  image: text("image").notNull(),
  start: timestamp("start", { mode: "date" }).notNull(),
  end: timestamp("end", { mode: "date" }).notNull(),
  community: text("community").notNull(),
  featured: boolean("featured").notNull().default(false),
});

export const eventsRelations = relations(events, ({ one, many }) => ({
  community: one(communities, {
    fields: [events.community],
    references: [communities.id],
  }),
  quests: many(quests),
}));

export const rosters = pgTable("rosters", {
  id: text("id").primaryKey(),
  active: boolean("active").notNull(),
  name: text("name").notNull(),
  community: text("community").notNull(),
  liquipedia: text("liquipedia").notNull(),
});

export const rostersRelations = relations(rosters, ({ one, many }) => ({
  talent: many(talent),
  community: one(communities, {
    fields: [rosters.community],
    references: [communities.id],
  }),
}));

// Deprecate this, require players to create nouns.gg accounts and use that on the roster page
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

// export const achievements = pgTable("achievements", {
//   id: text("id").primaryKey(),
//   next: text("next"),
//   name: text("name").notNull(),
//   description: text("description").notNull(),
//   image: text("image").notNull(),
//   xp: integer("xp").notNull(),
// });

// export const achievementsRelations = relations(achievements, ({ one }) => ({
//   next: one(achievements, {
//     fields: [achievements.next],
//     references: [achievements.id],
//   }),
// }));

export const rounds = pgTable("rounds", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  image: text("image").notNull(),
  banner: text("banner").notNull(),
  community: text("community").notNull().default(""),
  event: text("event"),
  type: text("type", { enum: ["markdown", "video", "image"] })
    .notNull()
    .default("markdown"),
  content: text("content").notNull(), // rename
  start: timestamp("start", { mode: "date" }).notNull(),
  votingStart: timestamp("voting_start", { mode: "date" }).notNull(),
  end: timestamp("end", { mode: "date" }),
  minProposerRank: integer("min_proposer_rank").notNull().default(0),
  minVoterRank: integer("min_voter_rank").notNull().default(0),
});

export const roundsRelations = relations(rounds, ({ one, many }) => ({
  awards: many(awards),
  proposals: many(proposals),
  votes: many(votes),
  community: one(communities, {
    fields: [rounds.community],
    references: [communities.id],
  }),
  event: one(events, {
    fields: [rounds.event],
    references: [events.id],
  }),
  minProposerRank: one(ranks, {
    fields: [rounds.minProposerRank],
    references: [ranks.id],
  }),
  minVoterRank: one(ranks, {
    fields: [rounds.minVoterRank],
    references: [ranks.id],
  }),
}));

// add user column and update it when they claim the award
export const awards = pgTable("awards", {
  id: serial("id").primaryKey(),
  round: text("round").notNull(),
  place: smallint("place").notNull(),
  asset: text("asset").notNull().default(""),
  value: numeric("value", { precision: 78 }).notNull(),
  claimed: boolean("claimed").notNull().default(false),
});

export const awardsRelations = relations(awards, ({ one }) => ({
  round: one(rounds, {
    fields: [awards.round],
    references: [rounds.id],
  }),
  asset: one(assets, {
    fields: [awards.asset],
    references: [assets.id],
  }),
}));

export const assets = pgTable("assets", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  image: text("image").notNull(),
  decimals: smallint("decimals"),
  chainId: integer("chain_id"), // RENAME TO CHAIN
  address: text("address"),
  tokenId: text("token_id"),
});

export const proposals = pgTable("proposals", {
  id: serial("id").primaryKey(),
  user: text("user").notNull(),
  round: text("round").notNull(),
  title: text("title").notNull(),
  content: text("content"), // rename to description
  image: text("image"),
  video: text("video"),
  createdAt: timestamp("created_at", { mode: "date" }).notNull(),
  hidden: boolean("hidden").notNull().default(false),
  published: boolean("published").notNull().default(true),
  totalVotes: smallint("total_votes").notNull().default(0),
});

export const proposalsRelations = relations(proposals, ({ one, many }) => ({
  round: one(rounds, {
    fields: [proposals.round],
    references: [rounds.id],
  }),
  votes: many(votes),
  user: one(nexus, {
    fields: [proposals.user],
    references: [nexus.id],
  }),
}));

// probably rename this entire table to users later
export const nexus = pgTable("nexus", {
  id: text("id").primaryKey(),
  handle: text("handle").notNull().default(""),
  rank: integer("rank").notNull().default(0),
  xp: integer("xp").notNull().default(0),
  image: text("image").notNull().default(""),
  name: text("name").notNull().default(""),
  bio: text("bio"),
  interests: text("interests").array().notNull().default([]),
  // everytime profile is updated these refresh also weekly automated refresh - can also extend these types
  wallet: jsonb("wallet").$type<User["wallet"]>(),
  twitter: jsonb("twitter").$type<User["twitter"]>(),
  discord: jsonb("discord").$type<User["discord"]>(),
  farcaster: jsonb("farcaster").$type<User["farcaster"]>(),
  linkedAccounts: jsonb("linked_accounts")
    .array()
    .$type<User["linkedAccounts"]>()
    .notNull()
    .default([]),
});

export const nexusRelations = relations(nexus, ({ one, many }) => ({
  votes: many(votes),
  proposals: many(proposals),
  rankings: many(rankings),
  xpRecords: many(xp),
  rank: one(ranks, {
    fields: [nexus.rank],
    references: [ranks.id],
  }),
  creations: many(creations),
}));

export const seasons = pgTable("seasons", {
  id: serial("id").primaryKey(),
  start: timestamp("start", { mode: "date" }).notNull(),
  end: timestamp("end", { mode: "date" }).notNull(),
});

export const seasonRelations = relations(seasons, ({ many }) => ({
  ranks: many(ranks),
  rankings: many(rankings),
  xp: many(xp),
}));

export const ranks = pgTable("ranks", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  image: text("image").notNull(),
  place: smallint("place").notNull(),
  percentile: numeric("percentile", { precision: 3, scale: 2 }).notNull(), // ex: 0.30 === 30%
  season: integer("season").notNull(),
  votes: smallint("votes").notNull(),
});

export const ranksRelations = relations(ranks, ({ one, many }) => ({
  season: one(seasons, {
    fields: [ranks.season],
    references: [seasons.id],
  }),
  nexus: many(nexus),
}));

export const quests = pgTable("quests", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  community: text("community").notNull(),
  season: text("season").notNull().default(""),
  event: text("event"),
  start: timestamp("start", { mode: "date" }),
  end: timestamp("end", { mode: "date" }),
  active: boolean("active").notNull().default(false),
  xp: integer("xp").notNull(),
  actions: text("actions").array().notNull(),
  actionInputs: jsonb("action_inputs")
    .array()
    .$type<Array<{ [key: string]: any }>>()
    .notNull()
    .default([]),
  requiredActions: integer("required_actions").notNull().default(-1),
});

export const questRelations = relations(quests, ({ one, many }) => ({
  community: one(communities, {
    fields: [quests.community],
    references: [communities.id],
  }),
  completed: many(xp),
  event: one(events, {
    fields: [quests.event],
    references: [events.id],
  }),
  season: one(seasons, {
    fields: [quests.season],
    references: [seasons.id],
  }),
}));

// Recuring incentives for actions completed across nouns.gg
export const incentives = pgTable("incentives", {
  id: text("id").primaryKey(),
  xp: integer("xp").notNull(),
  cooldown: integer("cooldown").notNull(),
});

export const incentivesRelations = relations(incentives, ({ many }) => ({
  completed: many(xp),
}));

export const xp = pgTable("xp", {
  id: serial("id").primaryKey(),
  user: text("user").notNull(),
  amount: integer("amount").notNull(),
  timestamp: timestamp("timestamp", { mode: "date" }).notNull(),
  season: text("season").notNull(),
  quest: text("quest"),
  incentive: text("incentive"),
  // achievement: text("achievement"),
});

export const xpRelations = relations(xp, ({ one }) => ({
  user: one(nexus, {
    fields: [xp.user],
    references: [nexus.id],
  }),
  season: one(seasons, {
    fields: [xp.season],
    references: [seasons.id],
  }),
  quest: one(quests, {
    fields: [xp.quest],
    references: [quests.id],
  }),
  incentive: one(incentives, {
    fields: [xp.incentive],
    references: [incentives.id],
  }),
  // achievement: one(achievements, {
  //   fields: [xp.achievement],
  //   references: [achievements.id],
  // }),
}));

// Rankings must sync with the Nexus table on refresh
export const rankings = pgTable("rankings", {
  id: serial("id").primaryKey(),
  user: text("user").notNull(),
  season: integer("season").notNull(),
  place: integer("place").notNull(),
  rank: integer("rank").notNull(),
  xp: integer("xp").notNull().default(0),
  timestamp: timestamp("timestamp", { mode: "date" }).notNull(),
});

export const rankingsRelations = relations(rankings, ({ one }) => ({
  user: one(nexus, {
    fields: [rankings.user],
    references: [nexus.id],
  }),
  season: one(seasons, {
    fields: [rankings.season],
    references: [seasons.id],
  }),
  rank: one(ranks, {
    fields: [rankings.rank],
    references: [ranks.id],
  }),
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
  proposal: one(proposals, {
    fields: [votes.proposal],
    references: [proposals.id],
  }),
  round: one(rounds, {
    fields: [votes.round],
    references: [rounds.id],
  }),
  nexus: one(nexus, {
    fields: [votes.user],
    references: [nexus.id],
  }),
}));

// use enum on property directly
export const creationType = pgEnum("creationType", [
  "art",
  "photograph",
  // video/clip
  // emotes
  // Stickers
  // GIFs
]);

export const creations = pgTable("creations", {
  id: text("id").primaryKey(),
  creator: text("creator"),
  type: creationType("type").notNull(),
  title: text("title"),
  createdAt: timestamp("created_at", { mode: "date" }),
  original: text("original"),
  community: text("community").notNull().default(""),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
});

export const creationRelations = relations(creations, ({ one }) => ({
  original: one(creations, {
    fields: [creations.original],
    references: [creations.id],
  }),
  community: one(communities, {
    fields: [creations.community],
    references: [communities.id],
  }),
  creator: one(nexus, {
    fields: [creations.creator],
    references: [nexus.id],
  }),
}));

const schema = {
  communities,
  communityRelations,
  rosters,
  rostersRelations,
  talent,
  talentRelations,
  rounds,
  roundsRelations,
  awards,
  awardsRelations,
  assets,
  proposals,
  proposalsRelations,
  votes,
  votesRelations,
  nexus,
  nexusRelations,
  // achievements,
  // achievementsRelations,
  events,
  eventsRelations,
  creations,
  creationRelations,
  seasons,
  seasonRelations,
  ranks,
  ranksRelations,
  quests,
  questRelations,
  xp,
  xpRelations,
  rankings,
  rankingsRelations,
  links,
  snapshots,
  snapshotsRelations,
};

export const db = drizzle(
  new Pool({
    connectionString: env.DATABASE_URL,
  }),
  {
    schema,
  }
);

export type Community = typeof communities.$inferSelect;
export type Roster = typeof rosters.$inferSelect;
export type Talent = typeof talent.$inferSelect;
export type Round = typeof rounds.$inferSelect;
export type Award = typeof awards.$inferSelect;
export type Asset = typeof assets.$inferSelect;
export type Proposal = typeof proposals.$inferSelect;
export type Vote = typeof votes.$inferSelect;
export type Nexus = typeof nexus.$inferSelect;
export type Creation = typeof creations.$inferSelect;
export type Rank = typeof ranks.$inferSelect;
export type Rankings = typeof rankings.$inferSelect;
export type Quest = typeof quests.$inferSelect;
export type Event = typeof events.$inferSelect;
