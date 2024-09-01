"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function Marquee(props: {
  duration?: number;
  reverse?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    if (marqueeRef.current) {
      setScrollWidth(marqueeRef.current.scrollWidth);
      console.log(scrollWidth);
    }
  }, []);

  return (
    <motion.div
      ref={marqueeRef}
      className={twMerge("", props.className)}
      animate="animate"
      variants={{
        animate: {
          x: [
            props.reverse ? `${-scrollWidth / 2}px` : "0px",
            props.reverse ? "0px" : `${-scrollWidth / 2}px`,
          ],
          transition: {
            x: {
              repeat: Infinity,
              ease: "linear",
              duration: props.duration ?? 20,
            },
          },
        },
      }}
    >
      {props.children}
      {props.children}
    </motion.div>
  );
}
