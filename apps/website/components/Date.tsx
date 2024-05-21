"use client";

export default function DateComponent(props: { timestamp: string }) {
  const date = new Date(props.timestamp);

  return `${date.toLocaleDateString("en", {
    dateStyle: "medium",
  })} -
  ${date.toLocaleTimeString("en", {
    timeStyle: "short",
  })}`;
}
