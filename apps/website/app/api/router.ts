import { t } from "@/app/api/trpc";

// Resolvers
import { getProjects } from "@/app/api/resolve/getProjects";
import { getEvents } from "@/app/api/resolve/getEvents";
import { getGame } from "@/app/api/resolve/getGame";
import { getGames } from "@/app/api/resolve/getGames";
import { getRosters } from "@/app/api/resolve/getRosters";
import { getTalent } from "@/app/api/resolve/getTalent";
import { getPosts } from "@/app/api/resolve/getPosts";
import { getPost } from "@/app/api/resolve/getPost";
import { getCreators } from "@/app/api/resolve/getCreators";
import { getUser } from "@/app/api/resolve/getUser";
import { getApplicationResponse } from "@/app/api/resolve/getApplicationResponse";
import { setUser } from "@/app/api/resolve/setUser";
import { setApplicationResponse } from "@/app/api/resolve/setApplicationResponse";
import { getAwards } from "@/app/api/resolve/getAwards";
import { getProposal } from "@/app/api/resolve/getProposal";
import { getProposals } from "@/app/api/resolve/getProposals";
import { getRound } from "@/app/api/resolve/getRound";
import { getRounds } from "@/app/api/resolve/getRounds";

import { addRound } from "@/app/api/resolve/addRound";
import { addProposal } from "@/app/api/resolve/addProposal";

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
  getApplicationResponse,
  setUser,
  setApplicationResponse,
  getAwards,
  getProposal,
  getProposals,
  getRound,
  getRounds,
  addRound,
  addProposal,
});

export type Router = typeof router;
