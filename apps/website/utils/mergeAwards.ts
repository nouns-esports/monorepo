import type { Award } from "~/packages/db/schema";
import { awardTypeToToken } from "./awardTypeToToken";

export function mergeAwards(awards: Award[]) {
  const tokens: Record<
    string,
    {
      token: ReturnType<typeof awardTypeToToken>;
      totalValue: number;
    }
  > = {};

  for (const award of awards) {
    const token = awardTypeToToken(award.type);

    tokens[token.address] = {
      totalValue:
        (tokens[token.address]?.totalValue ?? 0) + Number(award.value),
      token,
    };
  }

  return Object.values(tokens);
}
