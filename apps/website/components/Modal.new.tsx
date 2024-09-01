"use client";

import { useWindowSize } from "@uidotdev/usehooks";
import {
  AnimatePresence,
  motion,
  useAnimate,
  useDragControls,
  useMotionValue,
} from "framer-motion";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function Modal(props: {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
  showHandle?: boolean;
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

  const { width } = useWindowSize();

  // const controls = useDragControls();

  const [backdrop, animateBackdrop] = useAnimate();
  const [modal, animateModal] = useAnimate();

  async function close() {
    animateBackdrop(backdrop.current, { opacity: [1, 0] });

    await animateModal(modal.current, {
      y: [
        typeof y.get() === "number" ? y.get() : 0,
        modal.current.getBoundingClientRect().height,
      ],
    });
    props.setOpen(false);
  }

  const y = useMotionValue(0);

  if (props.open) {
    return (
      <motion.div
        onClick={close}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        // exit={{ opacity: 0 }}
        ref={backdrop}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed z-[80] inset-0 bg-black/50 flex items-center justify-center max-md:items-end backdrop-blur-sm"
      >
        <motion.div
          ref={modal}
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          // exit={{ y: 250 }}
          drag={!!((width ?? 0) <= 768) ? "y" : false}
          // dragControls={controls}
          // dragListener={canDrag}
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{
            top: 0,
            bottom: 0.5,
          }}
          style={{ y }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onDragEnd={() => {
            if (y.get() >= 100) {
              close();
            }
          }}
          onClick={(e) => e.stopPropagation()}
          className={twMerge(
            "flex flex-col rounded-xl bg-black border border-grey-600 drop-shadow-2xl max-md:rounded-b-none max-md:border-b-0 max-md:border-x-0 max-md:w-full",
            props.className
          )}
        >
          {props.showHandle && (
            <div className="mt-3 w-full flex items-center justify-center">
              <button
                // onPointerDown={(e) => controls.start(e)}
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
