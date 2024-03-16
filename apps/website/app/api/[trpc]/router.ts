import { t } from "@/server/clients/trpc";

// Resolvers
import { getProjects } from "@/server/resolve/getProjects";
import { getEvents } from "@/server/resolve/getEvents";
import { getGame } from "@/server/resolve/getGame";
import { getGames } from "@/server/resolve/getGames";
import { getRosters } from "@/server/resolve/getRosters";
import { getTalent } from "@/server/resolve/getTalent";
import { getPosts } from "@/server/resolve/getPosts";
import { getPost } from "@/server/resolve/getPost";
import { getCreators } from "@/server/resolve/getCreators";
import { getUser } from "@/server/resolve/getUser";
import { getId } from "@/server/resolve/getId";
import { getApplicationResponse } from "@/server/resolve/getApplicationResponse";
import { setUser } from "@/server/resolve/setUser";
import { setApplicationResponse } from "@/server/resolve/setApplicationResponse";

export const router = t.router({
  getEvents,
  getGame,
  getGames,
  getProjects,
  getRosters,
  getCreators,
  getTalent,
  getPosts,
  getPost,
  getUser,
  getId,
  getApplicationResponse,
  setUser,
  setApplicationResponse,
});

export type Router = typeof router;
