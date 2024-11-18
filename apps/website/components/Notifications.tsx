"use client";

import type { getNotifications } from "@/server/queries/notifications";
import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Link from "./Link";

export default function Notifications(props: {
	notifications: Awaited<ReturnType<typeof getNotifications>>;
}) {
	const hasNotifications = props.notifications.some((n) => !n.read);

	const router = useRouter();

	const [show, setShow] = useState(false);

	return (
		<div className="relative">
			<div onClick={() => setShow(true)} className="group cursor-pointer">
				{hasNotifications ? (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						className={twMerge(
							"group-hover:text-white/70 transition-colors",
							show ? "text-white/70" : "text-white",
						)}
					>
						<path
							d="M18.5 13.5018C19 16.0018 21 17 21 17H3C3 17 6 15 6 8C6 4.7 8.7 2.00001 12 2C12.6119 2 12.5 2 13 2.00075"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke="currentColor"
						/>
						<path
							d="M10.3008 21C10.4682 21.3044 10.7142 21.5583 11.0133 21.7352C11.3123 21.912 11.6534 22.0053 12.0008 22.0053C12.3482 22.0053 12.6892 21.912 12.9883 21.7352C13.2873 21.5583 13.5334 21.3044 13.7008 21"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke="currentColor"
						/>
						<path
							className="stroke-red fill-red animate-pulse"
							d="M17.8008 9.80078C19.4576 9.80078 20.8008 8.45764 20.8008 6.80078C20.8008 5.14393 19.4576 3.80078 17.8008 3.80078C16.1439 3.80078 14.8008 5.14393 14.8008 6.80078C14.8008 8.45764 16.1439 9.80078 17.8008 9.80078Z"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				) : (
					<Bell
						className={twMerge(
							"w-6 h-6 group-hover:text-white/70 transition-colors",
							show ? "text-white/70" : "text-white",
						)}
					/>
				)}
			</div>
			{show ? (
				<div
					className={twMerge(
						"absolute top-6 -right-8 pt-4 transition-opacity max-md:hidden",
						show
							? "opacity-100 pointer-events-auto"
							: "opacity-0 pointer-events-none",
					)}
				>
					<div
						onClick={() => setShow(false)}
						className="fixed w-screen h-screen top-0 left-0"
					/>
					<div className="relative z-10 bg-grey-800 w-[400px] rounded-xl drop-shadow-2xl p-2 flex flex-col gap-1">
						<p className="font-bebas-neue text-white text-xl pl-2 pt-1.5">
							Notifications
						</p>
						<div className="flex flex-col">
							{props.notifications.map((notification) => (
								<Link
									href={
										{
											"round-started": `/rounds/${notification.round?.id}`,
											"event-started": `/events/${notification.event?.id}`,
											"nexus-rankup": `/nexus/${notification.ranking?.id}`,
											"quest-created": `/quests/${notification.quest?.id}`,
											"round-voting-started": `/rounds/${notification.round?.id}`,
											"round-won": `/rounds/${notification.round?.id}`,
										}[notification.type]
									}
									key={notification.id}
									className="flex w-full h-[88px] p-2 hover:bg-grey-600 rounded-xl transition-colors"
								>
									{
										{
											"round-started": notification.round ? (
												<div className="flex gap-2 ">
													<img
														src={notification.round.image}
														className="rounded-xl w-24 flex-shrink-0"
													/>
													<div className="flex flex-col gap-2">
														<p className="font-bebas-neue text-white line-clamp-2">
															{notification.round.name}
														</p>
														<p className="text-green text-sm">Round started</p>
													</div>
												</div>
											) : null,
											"round-voting-started": notification.round ? (
												<div className="flex gap-2 ">
													<img
														src={notification.round.image}
														className="rounded-xl w-24 flex-shrink-0"
													/>
													<div className="flex flex-col gap-2">
														<p className="font-bebas-neue text-white line-clamp-2">
															{notification.round.name}
														</p>
														<p className="text-purple text-sm">
															Voting started
														</p>
													</div>
												</div>
											) : null,
											"round-won": notification.round ? (
												<div className="flex gap-2 ">
													<img
														src={notification.round.image}
														className="rounded-xl w-24 flex-shrink-0"
													/>
													<div className="flex flex-col gap-2">
														<p className="font-bebas-neue text-white line-clamp-2">
															{notification.round.name}
														</p>
														<p className="text-yellow text-sm">
															You won the round!
														</p>
													</div>
												</div>
											) : null,
											"quest-created": <div></div>,
											"nexus-rankup": <div></div>,
											"event-started": <div></div>,
										}[notification.type]
									}
								</Link>
							))}
							{props.notifications.length === 0 ? (
								<p className="text-grey-200 text-nowrap">
									You don't have any notifications
								</p>
							) : null}
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
}
