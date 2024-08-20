import type { Nexus } from "~/packages/db/schema";
import createAction from "../createAction";

export const linkFarcaster = createAction(() => {
  if (user.farcaster) return true;

  return false;
});
