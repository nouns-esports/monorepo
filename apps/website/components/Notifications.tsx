import type { getNotifications } from "@/server/queries/notifications";
import { Bell } from "lucide-react";
import NotificationsModal from "./modals/NotificationsModal";
import { ToggleModal } from "./Modal";

export default function Notifications(props: {
	notifications: Awaited<ReturnType<typeof getNotifications>>;
}) {
	const hasNotifications = props.notifications.some((n) => !n.read);

	return (
		<>
			<ToggleModal id="notifications" className="group cursor-pointer">
				{hasNotifications ? (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						className="group-hover:text-white/70 text-white transition-colors"
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
					<Bell className="w-6 h-6 group-hover:text-white/70 text-white transition-colors" />
				)}
			</ToggleModal>
			<NotificationsModal notifications={props.notifications} />
		</>
	);
}
