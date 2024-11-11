import CastCard from "@/components/CastCard";
import { getCast } from "@/server/queries/farcaster";
import type { CastWithInteractionsAndConversationsRef } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import { twMerge } from "tailwind-merge";

export default async function Cast(props: { params: { cast: string } }) {
	const cast = await getCast({ hash: props.params.cast });

	function renderComments(
		comment: CastWithInteractionsAndConversationsRef,
		level: number,
	) {
		if (comment.direct_replies.length > 0) {
			return (
				<div className="flex flex-col gap-4">
					<Comment
						key={comment.hash}
						hash={comment.hash}
						author={{
							pfp_url: comment.author.pfp_url,
							username: comment.author.username,
						}}
						text={comment.text}
						level={level}
					/>
					<div className=" flex w-full gap-4 relative">
						<div className="absolute left-0 -top-4 w-12 h-[calc(100%_-_50px)] flex flex-col items-center">
							<div className="h-full bg-grey-200 w-0.5 hover:bg-white" />
						</div>
						<div className="ml-12 flex flex-col gap-4 w-full">
							{comment.direct_replies.map((c) =>
								renderComments(
									c as CastWithInteractionsAndConversationsRef,
									level + 1,
								),
							)}
						</div>
					</div>
				</div>
			);
		}

		return (
			<Comment
				key={comment.hash}
				hash={comment.hash}
				author={{
					pfp_url: comment.author.pfp_url,
					username: comment.author.username,
				}}
				text={comment.text}
				level={level}
			/>
		);
	}

	return (
		<div className="flex flex-col items-center w-full pt-32 max-xl:pt-28 max-sm:pt-20 px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
			<div className="flex flex-col gap-4 max-w-3xl w-full">
				<CastCard cast={cast} />
				<h2 className="text-white text-2xl font-bebas-neue">Comments</h2>
				{cast.direct_replies.map((comment) => renderComments(comment, 0))}
			</div>
		</div>
	);
}

function Comment(props: {
	hash: string;
	author: { pfp_url?: string; username: string };
	text: string;
	level: number;
}) {
	return (
		<div className="flex gap-2 bg-grey-800 rounded-xl p-2">
			<div className="relative w-8 h-8">
				<img
					src={props.author.pfp_url}
					className="w-full h-full rounded-full object-cover object-center"
				/>
				{props.level > 0 ? (
					<div className="absolute -/z-10 -left-[33.25px] -top-2">
						<svg
							width={26.5}
							viewBox="-2 -2 54 55"
							fill="none"
							// onClick={() => {
							// 	//close thread
							// }}
							className={twMerge(
								"stroke-grey-200 stroke-[4.5px] hover:stroke-white transition-colors",
								`toggle-thread-${props.hash}`,
							)}
						>
							<path d="M50 50C50 50 27.7376 50.1002 14 36.5C0.123674 22.7624 0.499989 0 0.499989 0" />
						</svg>
					</div>
				) : null}
			</div>
			<div className="flex flex-col gap-1">
				<p className="text-white"> {props.author.username}</p>
				<p className="text-white">{props.text}</p>
			</div>
		</div>
	);
}
