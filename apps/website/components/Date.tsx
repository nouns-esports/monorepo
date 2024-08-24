"use client";

export default function DateComponent(props: {
  timestamp?: string | Date | number;
}) {
  const now = new Date();
  const date = new Date(props.timestamp ?? now);

  const day = date.getDate();

  let ordinal = "";

  if (day > 3 && day < 21) ordinal = "th";
  else {
    switch (day % 10) {
      case 1:
        ordinal = "st";
        break;
      case 2:
        ordinal = "nd";
        break;
      case 3:
        ordinal = "rd";
        break;
      default:
        ordinal = "th";
    }
  }

  if (date <= now) {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  return `${date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  })}${ordinal}, ${date
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
    .replace(":00 ", "")
    .toLowerCase()} `;
}
