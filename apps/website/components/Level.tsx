import { level } from "@/utils/level";

export function Level(props: { xp: number; gainedXP?: number }) {
  const { currentLevel, requiredXP, progressXP } = level(props.xp);

  return (
    <div className="flex items-center gap-2 w-full">
      <p className="text-green font-bebas-neue whitespace-nowrap">
        Level {currentLevel}
      </p>
      <div className="flex items-center h-2 w-full rounded-full bg-green/40">
        <div
          style={{ width: `${(progressXP / requiredXP) * 100}%` }}
          className="bg-green h-full rounded-full"
        />
      </div>
      <p className="text-green font-bebas-neue whitespace-nowrap">
        Level {currentLevel + 1}
      </p>
    </div>
  );
}
