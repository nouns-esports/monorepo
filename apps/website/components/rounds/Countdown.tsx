"use client";

import ReactCountdown from "react-countdown";

export default function Countdown(props: { date: Date }) {
  return (
    <ReactCountdown
      date={new Date(props.date)}
      renderer={({ days, hours, minutes, seconds }) => {
        if (days > 1 && hours < 1) {
          return (
            <span suppressHydrationWarning>
              {days}d {hours}h {minutes}m
            </span>
          );
        }

        return (
          <span suppressHydrationWarning>
            {hours}h {minutes}m {seconds}s
          </span>
        );
      }}
    />
  );
}
