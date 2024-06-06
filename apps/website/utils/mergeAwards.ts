import type { Asset, Award } from "~/packages/db/schema";

export function mergeAwards(awards: (Award & { asset: Asset })[]) {
  const mergedAwards: Record<
    string,
    {
      award: Award & { asset: Asset };
      totalValue: number;
    }
  > = {};

  for (const award of awards) {
    mergedAwards[award.asset.id] = {
      totalValue:
        (mergedAwards[award.asset.id]?.totalValue ?? 0) + Number(award.value),
      award,
    };
  }

  // console.log(mergedAwards["nouns-fest-showcase-winner"]);

  return Object.values(mergedAwards);
}
