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

// maybe Modal.component and Modal.state so we can create state in this file

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

  const [backdrop, setBackdrop] = useState<HTMLElement>();
  const [modal, setModal] = useState<HTMLElement>();

  useEffect(() => {
    const backdrop = document.getElementById(`${id}-backdrop`);
    const modal = document.getElementById(`${id}-modal`);

    if (backdrop) setBackdrop(backdrop);
    if (modal) setModal(modal);
  }, [open, id]);

  const y = useMotionValue(0);

  return {
    open: open[id],
    setOpen: (open: boolean) => {
      if (open) {
        return setOpen(id, open);
      }

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
      ]).then(() => setOpen(id, open));
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
  const { open, setOpen } = useModal(props.id);

  return (
    <div
      tabIndex={props.tabIndex}
      onClick={() => setOpen(!open)}
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
  showHandle?: boolean;
}) {
  const { open, setOpen, y } = useModal(props.id);

  useEffect(() => {
    const root = document.documentElement;

    if (open) {
      const width = root.clientWidth;

      document.documentElement.classList.add("prevent-scroll");

      root.style.paddingRight = `${root.clientWidth - width}px`;
    } else {
      document.documentElement.classList.remove("prevent-scroll");

      root.style.paddingRight = `0px`;
    }
  }, [open]);

  const { width } = useWindowSize();

  // const controls = useDragControls();

  if (open) {
    return (
      <motion.div
        id={`${props.id}-backdrop`}
        onClick={() => setOpen(false)}
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
          style={{ y }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onDragEnd={() => {
            if (y.get() >= 100) {
              setOpen(false);
            }
          }}
          onClick={(e) => e.stopPropagation()}
          className={twMerge(
            "flex flex-col rounded-xl bg-black border border-grey-600 drop-shadow-2xl max-lg:rounded-b-none max-lg:border-b-0 max-lg:border-x-0 max-lg:w-full",
            props.className
          )}
        >
          {props.showHandle && (
            <div className="mt-3 w-full flex items-center justify-center">
              <button className="h-1.5 w-12 bg-grey-500 rounded-full cursor-grab active:cursor-grabbing touch-none" />
            </div>
          )}
          {props.children}
        </motion.div>
      </motion.div>
    );
  }
}
