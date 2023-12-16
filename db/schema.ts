import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { boolean, char, pgTable, varchar } from "drizzle-orm/pg-core";

import "dotenv/config";

export const db = drizzle(sql);

export const games = pgTable("games", {
  id: varchar("id", { length: 256 }).primaryKey(),
  active: boolean("active").notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  image: varchar("image", { length: 256 }).notNull(),
  color: char("color", { length: 7 }).notNull(),
  rosters: varchar("rosters", { length: 256 }).array().notNull(),
});

export const rosters = pgTable("rosters", {
  id: varchar("id", { length: 256 }).primaryKey(),
  active: boolean("active").notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  game: varchar("game", { length: 256 }).notNull(),
  talent: varchar("talent", { length: 256 }).array().notNull(),
  liquipedia: varchar("liquipedia", { length: 256 }),
});

export const talent = pgTable("talent", {
  id: varchar("id", { length: 256 }).primaryKey(),
  active: boolean("active").notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  image: varchar("image", { length: 256 }).notNull(),
  role: varchar("role", { length: 256 }).notNull(),
  roster: varchar("roster", { length: 256 }).notNull(),
  liquipedia: varchar("liquipedia", { length: 256 }),
  twitch: varchar("twitch", { length: 256 }),
  twitter: varchar("twitter", { length: 256 }),
  youtube: varchar("youtube", { length: 256 }),
  tiktok: varchar("tiktok", { length: 256 }),
  instagram: varchar("instagram", { length: 256 }),
});

export const creators = pgTable("creators", {
  id: varchar("id", { length: 256 }).primaryKey(),
  active: boolean("active").notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  image: varchar("image", { length: 256 }).notNull(),
  liquipedia: varchar("liquipedia", { length: 256 }),
  twitch: varchar("twitch", { length: 256 }),
  twitter: varchar("twitter", { length: 256 }),
  youtube: varchar("youtube", { length: 256 }),
  tiktok: varchar("tiktok", { length: 256 }),
  instagram: varchar("instagram", { length: 256 }),
});

export const projects = pgTable("projects", {
  id: varchar("id", { length: 256 }).primaryKey(),
  active: boolean("active").notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  image: varchar("image", { length: 256 }).notNull(),
  url: varchar("url", { length: 256 }).notNull(),
});

export type Game = typeof games.$inferSelect;
export type Roster = typeof rosters.$inferSelect;
export type Talent = typeof talent.$inferSelect;
export type Project = typeof projects.$inferSelect;
