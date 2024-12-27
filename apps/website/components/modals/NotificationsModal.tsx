"use client";

import { X } from "lucide-react";
import { Modal, useModal } from "../Modal";
import type { getNotifications } from "@/server/queries/notifications";
import Link from "../Link";
import { useEffect } from "react";
import { readNotifications } from "@/server/mutations/readNotifications";
import { useRouter } from "next/navigation";

export default function NotificationsModal(props: {
	notifications: Awaited<ReturnType<typeof getNotifications>>;
}) {
	const hasNotifications = props.notifications.some((n) => !n.read);

	const { isOpen, close } = useModal("notifications");

	const router = useRouter();

	useEffect(() => {
		if (isOpen && hasNotifications) {
			readNotifications().then(() => router.refresh());
		}
	}, [isOpen]);

	return (
		<Modal id="notifications" className="p-4 flex flex-col max-w-[500px] gap-6">
			<div className="flex justify-between items-center">
				<p className="text-white text-2xl font-bebas-neue leading-none">
					Notifications
				</p>
				<button
					onClick={close}
					className="p-1 rounded-full bg-grey-600 hover:bg-grey-500 transition-colors"
				>
					<X className="w-4 h-4 text-grey-200" />
				</button>
			</div>
			<div className="flex flex-col max-h-[400px] overflow-y-auto custom-scrollbar">
				{props.notifications.map((notification) => (
					<Link
						href={notification.url ?? ""}
						key={notification.id}
						className="flex w-full h-[88px] p-2 hover:bg-grey-600 rounded-xl transition-colors"
					>
						<div className="flex w-full items-center gap-3 border border-grey-600 rounded-xl p-2 pr-3 bg-grey-800">
							<img src={notification.image} className="w-12 h-12 rounded-xl" />
							<div className="flex flex-col">
								<h2 className="text-white">{notification.title}</h2>
								<p className="text-grey-200 text-sm">
									{notification.description}
								</p>
							</div>
						</div>
					</Link>
				))}
				{props.notifications.length === 0 ? (
					<p className="text-grey-200 text-nowrap">
						You don't have any notifications
					</p>
				) : null}
			</div>
		</Modal>
	);
}
