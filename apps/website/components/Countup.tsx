"use client";

import ReactCountdown from "react-countdown";

export default function Countdown(props: { date: Date }) {
  return (
    <ReactCountdown
      date={new Date(props.date)}
      overtime
      renderer={({ days, hours, minutes, seconds }) => {
        if (seconds > -60) {
          return <span suppressHydrationWarning>{-1 * seconds}s</span>;
        }

        if (minutes > -60)
          return (
            <span suppressHydrationWarning>
              {hours}h {minutes}m {seconds}s
            </span>
          );
      }}
    />
  );
}
