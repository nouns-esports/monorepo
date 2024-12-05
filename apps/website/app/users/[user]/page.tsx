import Button from "@/components/Button";
import { getAuthenticatedUser, getUser } from "@/server/queries/users";
import { notFound, redirect } from "next/navigation";
import { Level } from "@/components/Level";
import { getFeed } from "@/server/queries/farcaster";
import CastCard from "@/components/CastCard";
import CreatePost from "@/components/CreatePost";

export default async function User(props: {
	params: Promise<{ user: string }>;
}) {
	const params = await props.params;
	const [authenticatedUser, user] = await Promise.all([
		getAuthenticatedUser(),
		getUser({ user: decodeURIComponent(params.user) }),
	]);

	if (!user) {
		if (!params.user.startsWith("did:privy:")) {
			redirect(`https://warpcast.com/${params.user}`);
		}

		return notFound();
	}

	// const feed = user.fid
	// 	? await getFeed({
	// 			fid: user.fid,
	// 			viewerFid: authenticatedUser?.farcaster?.fid,
	// 		})
	// 	: [];

	return (
		<>
			<div className="flex flex-col items-center gap-16 pt-32 max-xl:pt-28 max-sm:pt-20 px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
				<div className="max-w-2xl w-full flex flex-col gap-4">
					<div className="flex justify-between gap-6 p-6 w-full rounded-xl bg-grey-800">
						<div className="flex gap-4">
							<img
								src={user.image}
								className="w-12 h-12 rounded-full max-sm:w-12 max-sm:h-12"
							/>
							<div className="flex flex-col gap-2">
								<div className="flex items-center gap-2">
									<h1 className="text-white text-2xl leading-none font-luckiest-guy">
										{user.name}
									</h1>
									{user.rank ? (
										<img
											src={user.rank.image}
											className="h-6 w-6 object-contain"
											title={user.rank.name}
										/>
									) : (
										""
									)}
								</div>
								<p>{user.bio}</p>
								<div className="w-64 max-sm:w-full">
									<Level xp={user.xp} />
								</div>
							</div>
						</div>
						{user.id === authenticatedUser?.id ? (
							<div className="max-sm:hidden">
								<Button href="/nexus">View Nexus</Button>
							</div>
						) : null}
					</div>
					{/* <div className="flex flex-col gap-4">
						<h2 className="text-white text-2xl font-luckiest-guy">Posts</h2>
						{feed.map((cast) => (
							<CastCard key={cast.hash} cast={cast} />
						))}
					</div> */}
				</div>
			</div>
		</>
	);
}
