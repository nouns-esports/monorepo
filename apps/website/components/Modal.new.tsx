"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function Modal(props: {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}) {
  useEffect(() => {
    const root = document.documentElement;

    if (props.open) {
      const width = root.clientWidth;

      document.documentElement.classList.add("prevent-scroll");

      root.style.paddingRight = `${root.clientWidth - width}px`;
    } else {
      document.documentElement.classList.remove("prevent-scroll");

      root.style.paddingRight = `0px`;
    }
  }, [props.open]);

  return (
    <AnimatePresence>
      {props.open ? (
        <motion.div
          onClick={() => props.setOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed z-[80] inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: 250 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 250 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={(e) => e.stopPropagation()}
            className={twMerge(
              "flex flex-col rounded-xl bg-black border border-grey-600 drop-shadow-2xl",
              props.className
            )}
          >
            {props.children}
          </motion.div>
        </motion.div>
      ) : (
        ""
      )}
    </AnimatePresence>
  );
}

export function ToggleModal() {}
