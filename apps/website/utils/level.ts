export function level(xp: number) {
  const baseXP = 150; // Starting XP for level 1
  const maxXP = 2001; // Max XP required to level up
  const midpoint = 80; // Level at which growth starts to slow
  const steepness = 0.04; // Controls how quickly the curve flattens

  let currentLevel = 1;
  let accumulatedXP = 0;

  function calculateRequiredXP(level: number): number {
    if (level === 1) return baseXP;
    const logistic = 1 / (1 + Math.exp(-steepness * (level - midpoint)));
    return Math.floor(baseXP + (maxXP - baseXP) * logistic);
  }

  let requiredXP = calculateRequiredXP(currentLevel);

  while (accumulatedXP + requiredXP <= xp) {
    accumulatedXP += requiredXP;
    currentLevel++;
    requiredXP = calculateRequiredXP(currentLevel);
  }

  return {
    currentLevel,
    requiredXP,
    progressXP: xp - accumulatedXP,
  };
}

// for (const xp of [
//   0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000,
//   6000, 7000, 8000, 9000, 10000, 20000, 30000, 40000, 50000, 60000, 70000,
//   80000, 90000, 100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000,
//   900000, 1000000,
// ]) {
//   const { currentLevel, requiredXP, progressXP } = level(xp);
//   console.log(
//     `Level ${currentLevel}:`,
//     `${progressXP}/${requiredXP}`,
//     xp,
//     xp / 100
//   );
// }
