import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { char, pgTable, varchar } from "drizzle-orm/pg-core";

import "dotenv/config";

export const db = drizzle(sql);

export const games = pgTable("games", {
  id: varchar("id", { length: 256 }).primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  image: varchar("image", { length: 256 }).notNull(),
  color: char("color", { length: 7 }).notNull(),
  roster: varchar("roster", { length: 256 }).array().notNull(),
  liquipedia: varchar("liquipedia", { length: 256 }),
});

export const talent = pgTable("talent", {
  id: varchar("id", { length: 256 }).primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  image: varchar("image", { length: 256 }).notNull(),
  role: varchar("role", { length: 256 }).notNull(),
  game: varchar("game", { length: 256 }).notNull(),
  liquipedia: varchar("liquipedia", { length: 256 }),
  twitch: varchar("twitch", { length: 256 }),
  twitter: varchar("twitter", { length: 256 }),
  youtube: varchar("youtube", { length: 256 }),
  tiktok: varchar("tiktok", { length: 256 }),
  instagram: varchar("instagram", { length: 256 }),
});

export const projects = pgTable("projects", {
  id: varchar("id", { length: 256 }).primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  image: varchar("image", { length: 256 }).notNull(),
  url: varchar("url", { length: 256 }).notNull(),
});

export const giveawayEmails = pgTable("giveaway_emails", {
  email: varchar("email", { length: 256 }).notNull().unique(),
});

export type Game = typeof games.$inferSelect;
export type Talent = typeof talent.$inferSelect;
export type Project = typeof projects.$inferSelect;
