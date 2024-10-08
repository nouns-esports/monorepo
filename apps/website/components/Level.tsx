"use client";

import { level } from "@/utils/level";
import { motion } from "framer-motion";

export function Level(props: { xp: number }) {
  const { currentLevel, requiredXP, progressXP } = level(props.xp);

  return (
    <div className="flex items-center gap-2 w-full">
      <p className="text-green font-bebas-neue whitespace-nowrap">
        Level {currentLevel}
      </p>
      <div className="flex items-center h-2 w-full rounded-full bg-green/40">
        <motion.div
          initial={{ width: 0 }}
          animate={{
            width: `${(progressXP / requiredXP) * 100}%`,
          }}
          transition={{ duration: 1 }}
          className="bg-green h-full rounded-full"
        />
      </div>
      <p className="text-green font-bebas-neue whitespace-nowrap">
        Level {currentLevel + 1}
      </p>
    </div>
  );
}
