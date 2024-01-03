import { projects } from "@/server/resolve/projects";
import { events } from "./resolve/events";
import { game } from "./resolve/game";
import { games } from "./resolve/games";
import { rosters } from "./resolve/rosters";
import { talent } from "./resolve/talent";
import { t } from "./trpc";

export const router = t.router({
  events,
  game,
  games,
  projects,
  rosters,
  talent,
});

export type Router = typeof router;
