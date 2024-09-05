"use client";

import { useWindowSize } from "@uidotdev/usehooks";
import {
  animate,
  AnimatePresence,
  motion,
  useAnimate,
  useDragControls,
  useMotionValue,
} from "framer-motion";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  create,
  type Mutate,
  type StoreApi,
  type UseBoundStore,
} from "zustand";

const useModalState = create<{
  open: Record<string, boolean>;
  setOpen: (id: string, open: boolean) => void;
}>((set) => ({
  open: {},
  setOpen: (id, open) => {
    set((state) => ({ open: { ...state.open, [id]: open } }));
  },
}));

export function useModal(id: string) {
  const { open, setOpen } = useModalState();

  const y = useMotionValue(0);

  return {
    isOpen: open[id],
    open: () => setOpen(id, true),
    close: () => {
      const backdrop = document.getElementById(`${id}-backdrop`);
      const modal = document.getElementById(`${id}-modal`);

      if (!backdrop) {
        console.error("No backdrop found for modal", `${id}-backdrop`);
        return;
      }

      if (!modal) {
        console.error("No modal found for modal", `${id}-modal`);
        return;
      }

      Promise.all([
        animate(
          backdrop,
          { opacity: [1, 0] },
          { duration: 0.3, ease: "easeInOut" }
        ),
        animate(
          modal,
          {
            y: [
              typeof y.get() === "number" ? y.get() : 0,
              modal.getBoundingClientRect().height,
            ],
          },
          { duration: 0.3, ease: "easeInOut" }
        ),
      ]).then(() => setOpen(id, false));
    },
    y,
  };
}

export function ToggleModal(props: {
  id: string;
  children: React.ReactNode;
  tabIndex?: number;
  className?: string;
}) {
  const { isOpen, open, close } = useModal(props.id);

  return (
    <div
      tabIndex={props.tabIndex}
      onClick={() => (isOpen ? close() : open())}
      className={twMerge("cursor-pointer", props.className)}
    >
      {props.children}
    </div>
  );
}

export default function Modal(props: {
  id: string;
  children: React.ReactNode;
  className?: string;
  handle?: boolean;
}) {
  const { isOpen, close, y } = useModal(props.id);

  useEffect(() => {
    const root = document.documentElement;

    if (isOpen) {
      const width = root.clientWidth;

      document.documentElement.classList.add("prevent-scroll");

      root.style.paddingRight = `${root.clientWidth - width}px`;
    } else {
      document.documentElement.classList.remove("prevent-scroll");

      root.style.paddingRight = `0px`;
    }
  }, [isOpen]);

  const { width } = useWindowSize();

  const controls = useDragControls();

  if (isOpen) {
    return (
      <motion.div
        id={`${props.id}-backdrop`}
        onClick={() => close()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed z-[80] inset-0 bg-black/50 flex items-center justify-center max-lg:items-end backdrop-blur-sm"
      >
        <motion.div
          id={`${props.id}-modal`}
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          drag={!!((width ?? 0) <= 1024) ? "y" : false}
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{
            top: 0,
            bottom: 0.5,
          }}
          dragControls={props.handle ? controls : undefined}
          dragListener={props.handle ? false : undefined}
          style={{ y }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onDragEnd={() => {
            if (y.get() >= 100) close();
          }}
          onClick={(e) => e.stopPropagation()}
          className={twMerge(
            "flex flex-col rounded-xl bg-black border border-grey-600 drop-shadow-2xl max-lg:rounded-b-none max-lg:border-b-0 max-lg:border-x-0 max-lg:w-full ",
            props.className
          )}
        >
          {props.handle && (
            <div className="w-full items-center justify-center max-lg:flex hidden">
              <button
                onPointerDown={
                  props.handle ? (e) => controls.start(e) : undefined
                }
                className="h-1.5 w-12 bg-grey-500 rounded-full cursor-grab active:cursor-grabbing touch-none"
              />
            </div>
          )}
          {props.children}
        </motion.div>
      </motion.div>
    );
  }
}
