"use client";

import type { Locale } from "@/middleware";
import { useParams } from "next/navigation";

// TODO: Make this server first
export default function Text(props: Record<Locale, string>) {
  const { locale } = useParams();

  return props[locale as string];
}
