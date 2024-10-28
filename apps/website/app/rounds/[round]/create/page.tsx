import Link from "@/components/Link";
import { ArrowLeft } from "phosphor-react-sc";
import { notFound, redirect } from "next/navigation";
import { getProposal } from "@/server/queries/proposals";
import { getAuthenticatedUser } from "@/server/queries/users";
import ProposalEditor from "@/components/proposals/ProposalEditor";
import Shimmer from "@/components/Shimmer";
import dynamic from "next/dynamic";
import { getRoundWithProposal } from "@/server/queries/rounds";

const Markdown = dynamic(() => import("@/components/lexical/Markdown"), {
  ssr: false,
  loading: () => <Shimmer className="h-full" />,
});

export default async function Create(props: { params: { round: string } }) {
  const user = await getAuthenticatedUser();

  const round = user
    ? await getRoundWithProposal({ user: user.id, round: props.params.round })
    : undefined;

  if (!round) {
    return notFound();
  }

  if (!user) {
    return redirect(`/rounds/${props.params.round}`);
  }

  return (
    <div className="flex flex-col gap-4 justify-center pt-32 max-xl:pt-28 max-sm:pt-20 px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
      <Link
        href={`/rounds/${props.params.round}`}
        className="text-red flex items-center gap-1 group"
      >
        <ArrowLeft className="w-5 h-5 text-red group-hover:-translate-x-1 transition-transform" />
        Back to round
      </Link>
      <div className="flex gap-8 max-xl:flex-col">
        <div className="bg-grey-800 rounded-xl overflow-hidden w-full h-fit">
          <img
            src={`${round.image}?img-height=500&img-onerror=redirect`}
            className="w-full h-48 object-cover object-center max-sm:h-32"
          />
          <div className="flex flex-col gap-2 p-4">
            <h2 className="w-full text-white font-luckiest-guy text-3xl">
              {round.name}
            </h2>
            <div className="flex flex-col gap-2">
              <Markdown markdown={round.content} readOnly />
            </div>
          </div>
        </div>
        <ProposalEditor round={round} user={user.id} />
      </div>
    </div>
  );
}
