"use client";

import { ArrowCircleLeft, ArrowCircleRight } from "phosphor-react-sc";

export default function AwardScroller() {
  return (
    <div className="flex gap-1.5">
      <ArrowCircleLeft
        onClick={() => {
          const awards = document.getElementById("awards");

          if (awards) awards.scrollLeft -= 200;
        }}
        className="w-6 h-6 text-grey-400 hover:text-white transition-colors cursor-pointer"
        weight="fill"
      />
      <ArrowCircleRight
        onClick={() => {
          const awards = document.getElementById("awards");

          if (awards) awards.scrollLeft += 200;
        }}
        className="w-6 h-6 text-grey-400 hover:text-white transition-colors cursor-pointer"
        weight="fill"
      />
    </div>
  );
}
