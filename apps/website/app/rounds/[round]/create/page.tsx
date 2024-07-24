import Link from "@/components/Link";
import { ArrowLeft } from "phosphor-react-sc";
import { notFound } from "next/navigation";
import { getRound } from "@/server/queries/rounds";
import { getProposal } from "@/server/queries/proposals";
import { getAuthenticatedUser } from "@/server/queries/users";
import ProposalEditor from "@/components/proposals/ProposalEditor";
import Shimmer from "@/components/Shimmer";
import dynamic from "next/dynamic";

const Markdown = dynamic(() => import("@/components/lexical/Markdown"), {
  ssr: false,
  loading: () => <Shimmer className="min-h-96" />,
});

export default async function Create(props: { params: { round: string } }) {
  const round = await getRound({ id: props.params.round });

  if (!round) {
    return notFound();
  }

  const user = await getAuthenticatedUser();
  const proposal = user
    ? await getProposal({ user, round: props.params.round })
    : undefined;

  return (
    <div className="flex flex-col gap-4 pt-32 max-xl:pt-28 max-sm:pt-20 px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
      <Link
        href={`/rounds/${props.params.round}`}
        className="text-red flex items-center gap-1 group"
      >
        <ArrowLeft className="w-5 h-5 text-red group-hover:-translate-x-1 transition-transform" />
        Back to round
      </Link>
      <div className="bg-grey-800 rounded-xl overflow-hidden">
        <img
          src={round.banner}
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
      <ProposalEditor
        round={props.params.round}
        proposal={proposal}
        user={user}
      />
    </div>
  );
}
