import AirdropRegisterButton from "@/components/AirdropRegisterButton";
import Button from "@/components/Button";
import { getAuthenticatedUser } from "@/server/queries/users";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { env } from "~/env";
import { db, snapshots } from "~/packages/db/schema";

export default async function CGXAirdropPage() {
	const authenticatedUser = await getAuthenticatedUser();

	const eligible = authenticatedUser
		? await db.query.snapshots.findFirst({
				where: and(
					eq(snapshots.user, authenticatedUser.id),
					eq(snapshots.type, "cgx-airdrop"),
				),
			})
		: undefined;

	if (eligible) redirect(env.CGX_AIRDROP_URL);

	return (
		<div className="flex flex-col items-center h-full pt-32 max-xl:pt-28 max-sm:pt-20 px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
			<div className="flex flex-col items-center gap-4 max-w-2xl">
				<img
					src="https://lh6.googleusercontent.com/cTqy01GxCdWm_rPfGLfqXEQDf8PwwvuN7jySqLeYZKpDagUw-9AuvnvQAHJPi_Ot5jC4v9o7pLY5hWlxS1O1vcM8xnA1tcFGh52vm8KFzqhua5Wdbc-1jr4q0S8CiVwxzbCHi9qOpGg=w2398"
					className="w-full h-full object-cover rounded-xl"
				/>
				<h1 className="font-luckiest-guy text-white text-3xl">CGX Airdrop</h1>
				{authenticatedUser ? (
					eligible ? (
						<p className="text-green text-lg">You are eligible!</p>
					) : (
						<p className="text-red text-lg">You are not eligible.</p>
					)
				) : (
					<p className="text-white text-lg">Sign in to check eligibility</p>
				)}
				<AirdropRegisterButton
					authenticatedUser={authenticatedUser}
					eligible={!!eligible}
				/>
			</div>
		</div>
	);
}
