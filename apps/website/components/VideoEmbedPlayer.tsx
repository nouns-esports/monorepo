import { env } from "~/env";

export default function VideoEmbedPlayer(props: { url: string }) {
	if (props.url.includes("twitch.tv")) {
		return (
			<iframe
				src={`${props.url}&parent=${env.NEXT_PUBLIC_DOMAIN.split("://")[1]}`}
				className="w-full aspect-video rounded-xl select-none overflow-hidden"
				allowFullScreen
			/>
		);
	}

	if (props.url.includes("youtube.com")) {
		return (
			<iframe
				src={props.url}
				allowFullScreen
				className="w-full aspect-video rounded-xl select-none overflow-hidden"
			/>
		);
	}

	if (props.url.includes("drive.google.com")) {
		return (
			<iframe
				src={props.url}
				allowFullScreen
				className="w-full aspect-video rounded-xl select-none overflow-hidden"
			/>
		);
	}
}

// Twitch: https://clips.twitch.tv/embed?clip=BlueExquisiteBaconHeyGuys-vynEsLJMItjIbj9m
// Youtube: https://www.youtube.com/embed/sqRntu1k6AE
// Google Drive: https://drive.google.com/file/d/1obXK4mr1yTVS7ruAWba__6k6D5b_ORgs/preview
