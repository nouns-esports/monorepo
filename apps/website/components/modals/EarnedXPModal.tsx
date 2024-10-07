"use client";

import { X } from "lucide-react";
import { Modal, useModal } from "../Modal";
import Link from "../Link";
import { Level } from "../Level";
import { create } from "zustand";

export const useXPModal = create<{
  xp: number;
  setXP: (xp: number) => void;
}>((set) => ({
  xp: 0,
  setXP: (xp) => {
    set({ xp });
  },
}));

export default function EarnedXPModal(props: { from: string }) {
  const { close } = useModal(`earned-xp-${props.from}`);

  const { xp } = useXPModal();

  return (
    <Modal
      id={`earned-xp-${props.from}`}
      className="p-4 flex flex-col min-w-80 gap-6"
    >
      <div className="flex justify-between items-center">
        <p className="text-white text-2xl font-bebas-neue leading-none">
          You earned XP
        </p>
        <button
          onClick={close}
          className="p-1 rounded-full bg-grey-600 hover:bg-grey-500 transition-colors"
        >
          <X className="w-4 h-4 text-grey-200" />
        </button>
      </div>
      <Level xp={xp} />
      <Link
        href="/quests"
        className="flex justify-center items-center gap-2 w-full text-black bg-white hover:bg-white/70 font-semibold rounded-lg p-2.5 transition-colors"
      >
        View Quests
      </Link>
    </Modal>
  );
}
