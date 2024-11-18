import CastCard from "@/components/CastCard";
import { getCommunities } from "@/server/queries/communities";
import { getFeed } from "@/server/queries/farcaster";
import { ArrowLeft } from "lucide-react";
import { getAuthenticatedUser } from "@/server/queries/users";
import CreatePost from "@/components/CreatePost";
import Link from "@/components/Link";

export default async function Chat(props: { searchParams: { c?: string } }) {
	const [user, communities] = await Promise.all([
		getAuthenticatedUser(),
		getCommunities({
			ids: ["cs", "dota", "rocket-league", "smash"],
		}),
	]);

	const allChannels = [
		...communities.map((c) => c.channel),
		...communities.flatMap((c) => c.subcommunities.map((sub) => sub.channel)),
	];

	const community = communities.find((c) => c.id === props.searchParams?.c);
	const subChannels = community?.subcommunities.map((sub) => sub.channel);

	const feed = await getFeed({
		channels: community
			? [community.channel, ...(subChannels ?? [])]
			: ["nouns-esports", ...allChannels],
		viewerFid: user?.farcaster?.fid,
	});

	return (
		<div className="flex flex-col items-center w-full pt-32 max-xl:pt-28 max-sm:pt-20 px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
			<div className="flex flex-col gap-8 max-w-3xl w-full">
				<div className="flex flex-col gap-4">
					{community ? (
						<Link
							href="/chat"
							className="text-red flex items-center gap-1 group"
						>
							<ArrowLeft className="w-5 h-5 text-red group-hover:-translate-x-1 transition-transform" />
							All discussion
						</Link>
					) : null}
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							{community ? (
								<img src={community.image} className="w-10 h-10 rounded-lg" />
							) : null}
							<h1 className="text-white text-4xl font-luckiest-guy">
								{community?.name ?? "Discussion"}
							</h1>
						</div>
						<CreatePost user={user} />
					</div>
				</div>
				<div className="flex flex-col gap-4">
					{feed
						.toSorted((a, b) => {
							return (
								new Date(b.timestamp).getTime() -
								new Date(a.timestamp).getTime()
							);
						})
						.map((cast) => (
							<CastCard
								key={cast.hash}
								cast={cast}
								community={communities.find(
									(c) => c.channel === cast.channel?.id,
								)}
							/>
						))}
				</div>
			</div>
		</div>
	);
}
