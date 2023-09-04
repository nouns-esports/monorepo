"use client";

import { Locale } from "./SelectLanguage";
import i18nConfig from "@/i18nConfig";
import { motion } from "framer-motion";
import { useCurrentLocale } from "next-i18n-router/client";

export default function HighlightedText(props: {
  text: Record<Locale, string>;
  highlight: Record<Locale, string[]>;
  color: string;
  underline?: boolean;
}) {
  const locale = useCurrentLocale(i18nConfig) as Locale;

  return props.text[locale].split(" ").map((word) => {
    if (props.highlight[locale || "en"].includes(word)) {
      return (
        <span key={word} style={{ color: props.color }} className="relative">
          {`${word} `}
          {props.underline && (
            <svg
              viewBox="0 0 40 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute -bottom-3 -left-1.5 w-full"
            >
              <motion.path
                d="M1.2417 2.61258C3.04409 2.49947 4.8292 2.15267 6.62401 1.97369C13.6525 1.27281 20.7035 1.11258 27.7814 1.11258C31.5762 1.11258 35.371 1.11258 39.1657 1.11258"
                strokeLinecap="round"
                stroke={props.color}
                transition={{ duration: 1 }}
                // initial={{ pathLength: 0, stroke: "transparent" }}
                // whileInView={{ pathLength: 1, stroke: "#51D06D" }}
              />
            </svg>
          )}
        </span>
      );
    }

    return `${word} `;
  });
}
