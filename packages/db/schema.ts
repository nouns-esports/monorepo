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
  json,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { Pool } from "pg";
import { env } from "~/env";

export const communities = pgTable("communities", {
  id: text("id").primaryKey(),
  image: text("image").notNull(),
  name: text("name").notNull(),
  // Farcaster channel ids
  channels: text("channels").array().notNull(),
});

export const communityRelations = relations(communities, ({ many }) => ({
  rosters: many(rosters),
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

export const badges = pgTable("badges", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  timestamp: timestamp("timestamp", { mode: "date" }).notNull(),
});

// An infinite round is defined as a round with a null end timestamp and votingStart = start, respecitive proposals will include a value
export const rounds = pgTable("rounds", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").default("").notNull(),
  content: text("content").notNull(),
  start: timestamp("start", { mode: "date" }).notNull(),
  votingStart: timestamp("voting_start", { mode: "date" }).notNull(),
  end: timestamp("end", { mode: "date" }),
  tags: text("tags").array().notNull(),
  image: text("image").notNull(),
  banner: text("banner").notNull(),
});

export const roundsRelations = relations(rounds, ({ many }) => ({
  awards: many(awards),
  proposals: many(proposals),
}));

// If place is 0, it is an infinite round

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
  chainId: integer("chain_id"),
  address: text("address"),
  tokenId: text("token_id"),
});

export const proposals = pgTable("proposals", {
  id: serial("id").primaryKey(),
  user: text("user").notNull(),
  round: text("round").notNull(),
  title: text("title").notNull(),
  description: text("description").default("").notNull(),
  content: text("content").notNull(),
  value: numeric("value", { precision: 78 }).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull(),
  hidden: boolean("hidden").notNull().default(false),
  published: boolean("published").notNull().default(true),
  totalVotes: smallint("total_votes").notNull().default(0),
  image: text("image").notNull().default(""),
});

export const proposalsRelations = relations(proposals, ({ one, many }) => ({
  round: one(rounds, {
    fields: [proposals.round],
    references: [rounds.id],
  }),
  votes: many(votes),
}));

// use numbers instead in the future
export const nexusTiers = pgEnum("nexusTiers", [
  "Explorer",
  "Challenger",
  "Champion",
]);

export const nexus = pgTable("nexus", {
  user: text("user").primaryKey(),
  tier: nexusTiers("tier").notNull(),
});

// export const users = pgTable("users", {
//   user: text("user").primaryKey(),
//   xp: integer("xp").notNull().default(0),
//   // 0 = Explorer, 1 = Challenger, 2 = Champion
//   rank: smallint("rank").notNull(),
//   division: smallint("division").notNull(),
//   // string
//   image: text("image"),
//   // string
//   name: text("name").notNull(),
//   // string
//   bio: text("bio"),
//   // string
//   wallet: text("wallet"),
// });

// export const quests = pgTable("quests", {
//   id: text("id").primaryKey(),
//   // API endpoint to check if the quest is completed
//   endpoint: text("endpoint").notNull(),
// });

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
}));

export const creationType = pgEnum("creationType", [
  "art",
  "photograph",
  // video/clip
  // emotes
]);

export const creations = pgTable("creations", {
  // IPFS hash
  id: text("id").primaryKey(),
  // Privy id
  creator: text("creator"),
  // Type of creation
  type: creationType("type").notNull(),
  // Title of the creation
  title: text("title"),
  // When it was created
  createdAt: timestamp("created_at", { mode: "date" }),
  // Links to another creation, useful for creating variants (cropped, modified, etc) while still pointing to the original entry
  original: text("original"),
  // Search tags, only required for top level creations
  tags: text("tags").array().notNull(),
  // Width
  width: integer("width").notNull(),
  // Height
  height: integer("height").notNull(),
});

export const creationRelations = relations(creations, ({ one }) => ({
  original: one(creations, {
    fields: [creations.original],
    references: [creations.id],
  }),
}));

export const db = drizzle(
  new Pool({
    connectionString: env.DATABASE_URL,
  }),
  {
    schema: {
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
      badges,
      nexus,
      creations,
      creationRelations,
    },
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
export type Badge = typeof badges.$inferSelect;
export type Nexus = typeof nexus.$inferSelect;
export type Creation = typeof creations.$inferSelect;
