"use client";

import ReactCountdown from "react-countdown";

export default function Countdown(props: {
  date: Date;
  onlySeconds?: boolean;
}) {
  return (
    <ReactCountdown
      date={new Date(props.date)}
      renderer={({ days, hours, minutes, seconds }) => {
        if (props.onlySeconds) {
          return <span suppressHydrationWarning>{seconds}s</span>;
        }

        if (days >= 1) {
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
