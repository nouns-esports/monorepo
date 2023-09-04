"use client";

import { useEffect } from "react";

export default function GameColor(props: { color: string }) {
  useEffect(() => {
    document.documentElement.style.setProperty("--primaryColor", props.color);
  }, []);

  return "";
}
