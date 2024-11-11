"use client";

import ReactCountdown from "react-countdown";

export default function Countdown(props: { date: Date | string }) {
	return (
		<ReactCountdown
			date={new Date(props.date)}
			overtime
			renderer={({ days, hours, minutes, seconds }) => {
				if (days > 365) {
					return (
						<span suppressHydrationWarning>{Math.floor(days / 365)}y</span>
					);
				}

				if (days > 30) {
					return (
						<span suppressHydrationWarning>{Math.floor(days / 30)}mo</span>
					);
				}

				if (days > 1) {
					return <span suppressHydrationWarning>{days}d</span>;
				}

				if (hours > 1) {
					return <span suppressHydrationWarning>{hours}h</span>;
				}

				if (minutes > 1) {
					return <span suppressHydrationWarning>{minutes}m</span>;
				}

				return <span suppressHydrationWarning>{seconds}s</span>;
			}}
		/>
	);
}
