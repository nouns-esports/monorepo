import Link from "@/components/Link";
import { notFound } from "next/navigation";
import { ArrowLeft, TwitterLogo } from "phosphor-react-sc";
import { getFrameMetadata } from "frog/next";
import type { Metadata } from "next";
import { getProposal } from "@/server/queries/proposals";
import dynamic from "next/dynamic";
import Shimmer from "@/components/Shimmer";
import { getUser } from "@/server/queries/users";
import { userToProfile } from "@/utils/userToProfile";

const Markdown = dynamic(() => import("@/components/lexical/Markdown"), {
  ssr: false,
  loading: () => <Shimmer className="min-h-60" />,
});

// export async function generateMetadata(props: {
//   params: { round: string; proposal: string };
// }): Promise<Metadata> {
//   return {
//     other: await getFrameMetadata(
//       `http://localhost:3000/frames/proposal/${props.params.proposal}`
//     ),
//   };
// }

export default async function Proposal(props: {
  params: { round: string; proposal: string };
}) {
  const proposal = await getProposal({ id: Number(props.params.proposal) });

  if (!proposal) {
    return notFound();
  }

  const user = await getUser({ id: proposal.user });

  const profile = user ? userToProfile(user) : undefined;

  return (
    <div className="flex flex-col gap-4">
      <Link
        href={`/rounds/${props.params.round}`}
        className="text-red flex items-center gap-1 group"
      >
        <ArrowLeft className="w-5 h-5 text-red group-hover:-translate-x-1 transition-transform" />
        Back to round
      </Link>
      <div className="flex flex-col gap-4 bg-grey-800 rounded-xl p-6 max-sm:p-3">
        <h2 className="text-white font-luckiest-guy text-3xl">
          {proposal.title}
        </h2>
        {profile ? (
          <div className="flex gap-8 items-center">
            <div className="rounded-full flex items-center text-white gap-3 font-semibold text-lg">
              <img src={profile.pfp} className="rounded-full h-7 w-7" />
              {profile.name}
            </div>
            <div className="flex gap-3 items-center">
              {profile.socials.twitter ? (
                <Link href={profile.socials.twitter} newTab>
                  <TwitterLogo
                    className="w-6 h-6 text-white hover:opacity-80 transition-opacity"
                    weight="fill"
                  />
                </Link>
              ) : (
                ""
              )}
              {profile.socials.farcaster ? (
                <Link href={profile.socials.farcaster} newTab>
                  <img
                    src="/farcaster.svg"
                    className="w-5 h-5  hover:opacity-80 transition-opacity"
                  />
                </Link>
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          ""
        )}
        <Markdown markdown={proposal.content} readOnly />
      </div>
    </div>
  );
}
