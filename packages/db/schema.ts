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
	jsonb,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { Pool } from "pg";
import { env } from "~/env";

export const links = pgTable("links", {
	id: text("id").primaryKey(),
	url: text("url").notNull(),
});

export const snapshotTypes = {
	"discord-call": "Attended a community Discord call",
	"visit-link": "",
	genesis: "Were included in the Genesis snapshot",
} as const;

export const snapshots = pgTable("snapshots", {
	id: serial("id").primaryKey(),
	user: text("user").notNull(),
	type: text("type", {
		enum: Object.keys(snapshotTypes) as [
			keyof typeof snapshotTypes,
			...Array<keyof typeof snapshotTypes>,
		],
	}).notNull(),
	tag: text("tag"),
	timestamp: timestamp("timestamp", { mode: "date" }).notNull(),
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
	channel: text("channel").notNull(),
	parent: text("parent"),
});

export const communityRelations = relations(communities, ({ one, many }) => ({
	rosters: many(rosters),
	rounds: many(rounds),
	creations: many(creations),
	events: many(events),
	quests: many(quests),
	subcommunities: many(communities, { relationName: "parentToChild" }),
	parent: one(communities, {
		fields: [communities.parent],
		references: [communities.id],
		relationName: "parentToChild",
	}),
}));

// export const articles = pgTable("articles", {
//   id: text("id").primaryKey(),
//   title: text("title").notNull(),
//   // content: jsonb
//   createdAt: timestamp("createdAt", { mode: "date" }).notNull(),
// });

export const events = pgTable("events", {
	id: text("id").primaryKey(),
	// type: text("type", { enum: ["match", "tournament", "conference"] }).notNull(),
	// url: text("url"),
	// parent: text("parent"),
	// location: text("location")
	name: text("name").notNull(),
	image: text("image").notNull(),
	start: timestamp("start", { mode: "date" }).notNull(),
	end: timestamp("end", { mode: "date" }).notNull(),
	community: text("community"),
	featured: boolean("featured").notNull().default(false),
	season: integer("season").notNull(),
});

export const eventsRelations = relations(events, ({ one, many }) => ({
	community: one(communities, {
		fields: [events.community],
		references: [communities.id],
	}),
	quests: many(quests),
	season: one(seasons, {
		fields: [events.season],
		references: [seasons.id],
	}),
	rounds: many(rounds),
	// moments: many(moments),
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

export const rounds = pgTable("rounds", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	image: text("image").notNull(),
	community: text("community"),
	event: text("event"),
	type: text("type", { enum: ["markdown", "video", "image"] })
		.notNull()
		.default("markdown"),
	featured: boolean("featured").notNull().default(false),
	content: text("content").notNull(), // rename
	start: timestamp("start", { mode: "date" }).notNull(),
	votingStart: timestamp("voting_start", { mode: "date" }).notNull(),
	end: timestamp("end", { mode: "date" }),
	minProposerRank: integer("min_proposer_rank"),
	minVoterRank: integer("min_voter_rank"),
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

// Rethink the way we handle awards and assets
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

export const nexus = pgTable("nexus", {
	id: text("id").primaryKey(),
	rank: integer("rank"),
	xp: integer("xp").notNull().default(0),
	image: text("image").notNull().default(""),
	name: text("name").notNull().default(""),
	bio: text("bio"),
	interests: text("interests").array().notNull().default([]),
	wallet: text("wallet"),
	twitter: text("twitter"),
	discord: text("discord"),
	farcaster: text("farcaster"),
	// fid: integer("fid"),
	// handle: text("handle"),
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
	events: many(events),
}));

export const ranks = pgTable("ranks", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	image: text("image").notNull(),
	color: text("color").notNull().default(""),
	place: smallint("place").notNull(),
	percentile: numeric("percentile", { precision: 4, scale: 3 }).notNull(), // ex: 0.01 === 1%, 0.001 === 0.1%, 0.0001 === 0.01%
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
	community: text("community"),
	event: text("event"),
	createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
	featured: boolean("featured").notNull().default(false),
	active: boolean("active").notNull().default(false),
	start: timestamp("start", { mode: "date" }),
	end: timestamp("end", { mode: "date" }),
	xp: integer("xp").notNull(),
	actions: text("actions").array().notNull(),
	actionInputs: jsonb("action_inputs")
		.array()
		.$type<Array<{ [key: string]: any }>>()
		.notNull()
		.default([]),
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
}));

export const xp = pgTable("xp", {
	id: serial("id").primaryKey(),
	user: text("user").notNull(),
	amount: integer("amount").notNull(),
	timestamp: timestamp("timestamp", { mode: "date" }).notNull(),
	season: integer("season").notNull(),
	quest: text("quest"),
	snapshot: integer("snapshot"),
	achievement: text("achievement"),
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
	snaphot: one(snapshots, {
		fields: [xp.snapshot],
		references: [snapshots.id],
	}),
}));

export const rankings = pgTable("rankings", {
	id: serial("id").primaryKey(),
	user: text("user").notNull(),
	season: integer("season").notNull(),
	rank: integer("rank").notNull(),
	xp: integer("xp").notNull(),
	diff: integer("diff").notNull(),
	position: integer("position").notNull(),
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

// What if - separate moments table from creations and moments were like events but curated moments (like Cody placed 1st or we won TI). event gets moved to this moments table so it could be like "Cody placed 1st" (moment.name) at "Genesis" (moment.event). A moment has a period of time where our list of curated artists and creators are allowed to post their work for this moment where users can mint and we mint as an incentive. The moments page would be a list of moments and all the creations for each moment (each moment has their own page) and a section for all other creations not tied to a moment
export const creations = pgTable("creations", {
	id: text("id").primaryKey(),
	creator: text("creator"),
	type: text("type", {
		enum: ["art", "photograph", "video", "emote", "sticker", "gif"],
	})
		.notNull()
		.default("art"),
	title: text("title"),
	createdAt: timestamp("created_at", { mode: "date" }),
	original: text("original"),
	community: text("community"),
	width: integer("width").notNull(),
	height: integer("height").notNull(),
	// moment: text("moment")
	// mint: text("mint") // Zora mint - can be standalone or a part of a moment collection
});

export const creationsRelations = relations(creations, ({ one }) => ({
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

// export const moments = pgTable("moments", {
//   id: serial("id").primaryKey(),
//   name: text("name"),
//   start: timestamp("start", { mode: "date" }),
//   end: timestamp("end", { mode: "date" }),
//   event: text("event"),
//   collection: text("collection") // Zora collection
// });

// export const casts = pgTable("casts", {
//   hash: text("hash").primaryKey(),
//   author: integer("author"),
//   createdAt: timestamp("created_at", { mode: "date" }),
//   channel: text("channel"),
//   parent: text("parent"),
// });

// export const castsRelations = relations(casts, ({ one, many }) => ({
//   author: one(nexus, {
//     fields: [casts.author],
//     references: [nexus.farcaster],
//   }),
//   reactions: many(reactions),
//   parent: one(casts, {
//     fields: [casts.parent],
//     references: [casts.hash],
//   }),
//   community: one(communities, {
//     fields: [casts.channel],
//     references: [communities.channel],
//   }),
// }));

// export const reactions = pgTable("reactions", {
//   id: serial("id").primaryKey(),
//   cast: text("cast"),
//   user: integer("user"),
//   type: text("type", { enum: ["like", "recast"] }),
//   timestamp: timestamp("timestamp", { mode: "date" }),
// });

// export const reactionsRelations = relations(reactions, ({ one }) => ({
//   cast: one(casts, {
//     fields: [reactions.cast],
//     references: [casts.hash],
//   }),
//   user: one(nexus, {
//     fields: [reactions.user],
//     references: [nexus.farcaster],
//   }),
// }));

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
	events,
	eventsRelations,
	creations,
	creationsRelations,
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
	},
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
export type Snapshot = typeof snapshots.$inferSelect;
