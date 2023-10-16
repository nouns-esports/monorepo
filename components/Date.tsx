"use client";

import { useParams } from "next/navigation";

export default function Date(props: { timestamp: string }) {
  const { locale } = useParams();

  const date = new (typeof window === "undefined" ? global : window).Date(
    props.timestamp
  );

  return `${date.toLocaleDateString(locale, {
    dateStyle: "medium",
  })} -
  ${date.toLocaleTimeString(locale, {
    timeStyle: "short",
  })}`;
}
