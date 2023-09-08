"use client";

import { PrimaryColorContext } from "@/providers";
import { useContext } from "react";

export default function GameBorder(props: { children: React.ReactNode }) {
  const primaryColor = useContext(PrimaryColorContext);

  return (
    <div
      style={{ borderTopColor: primaryColor }}
      className="bg-black p-16 max-lg:p-8 gap-16 max-lg:gap-8 flex flex-col border-t-4 rounded-t-[4rem] max-lg:rounded-t-[2rem] transition-colors -mt-16 relative z-10"
    >
      {props.children}
    </div>
  );
}
