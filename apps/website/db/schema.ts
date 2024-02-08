import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { boolean, char, pgTable, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import "dotenv/config";

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

export const talentRelations = relations(talent, ({ one, many }) => ({
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

export const db = drizzle(sql, {
  schema: {
    games: games,
    rosters: rosters,
    talent: talent,
    creators: creators,
    projects: projects,
  },
});

export type Game = typeof games.$inferSelect;
export type Roster = typeof rosters.$inferSelect;
export type Talent = typeof talent.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type Creator = typeof creators.$inferSelect;
