import { t } from "@/trpc";

// Resolvers
import * as Events from "@/trpc/resolvers/events";
import * as Games from "@/trpc/resolvers/games";
import * as Talent from "@/trpc/resolvers/talent";
import * as Projects from "@/trpc/resolvers/projects";
import * as Creators from "@/trpc/resolvers/creators";
import * as Rosters from "@/trpc/resolvers/rosters";
import * as Posts from "@/trpc/resolvers/posts";
import * as Users from "@/trpc/resolvers/users";
import * as Rounds from "@/trpc/resolvers/rounds";
import * as Proposals from "@/trpc/resolvers/proposals";
import * as Awards from "@/trpc/resolvers/awards";
import * as Votes from "@/trpc/resolvers/votes";

export const router = t.router({
  ...Events,
  ...Games,
  ...Talent,
  ...Projects,
  ...Creators,
  ...Rosters,
  ...Posts,
  ...Users,
  ...Rounds,
  ...Proposals,
  ...Awards,
  ...Votes,
});

export type Router = typeof router;
