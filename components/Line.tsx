"use client";

import { motion } from "framer-motion";

export default function Line() {
  return (
    <svg
      viewBox="0 0 40 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute -bottom-3 -left-1.5 w-full"
    >
      <motion.path
        d="M1.2417 2.61258C3.04409 2.49947 4.8292 2.15267 6.62401 1.97369C13.6525 1.27281 20.7035 1.11258 27.7814 1.11258C31.5762 1.11258 35.371 1.11258 39.1657 1.11258"
        strokeLinecap="round"
        stroke={"#51D06D"}
        transition={{ duration: 1 }}
        // initial={{ pathLength: 0, stroke: "transparent" }}
        // whileInView={{ pathLength: 1, stroke: "#51D06D" }}
      />
    </svg>
  );
}
