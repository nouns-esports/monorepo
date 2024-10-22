import type { AuthenticatedUser } from "../queries/users";

export default function createAchievement(create: {
  name: string;
  description: string;
  previous?: string;
  next?: string;
  path: "quests" | "rounds" | "nexus";
  image: string;
  xp: number;
  check: (user: AuthenticatedUser) => Promise<boolean>;
}) {
  return create;
}
