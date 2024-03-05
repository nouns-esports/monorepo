import { projects } from "@/server/resolve/projects";
import { events } from "./resolve/events";
import { game } from "./resolve/game";
import { games } from "./resolve/games";
import { rosters } from "./resolve/rosters";
import { talent } from "./resolve/talent";
import { t } from "./trpc";
import { posts } from "./resolve/posts";
import { post } from "./resolve/post";
import { creators } from "./resolve/creators";
import { id } from "./resolve/id";

export const router = t.router({
  events,
  game,
  games,
  projects,
  rosters,
  creators,
  talent,
  posts,
  post,
  id,
});

export type Router = typeof router;
