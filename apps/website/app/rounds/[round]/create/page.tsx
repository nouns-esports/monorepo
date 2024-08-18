import Link from "@/components/Link";
import { ArrowLeft } from "phosphor-react-sc";
import { notFound } from "next/navigation";
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
  const user = await getAuthenticatedUser();

  const proposal = user
    ? await getProposal({ user: user.id, round: props.params.round })
    : undefined;

  if (!proposal || !user) {
    return notFound();
  }

  return (
    <div className="flex justify-center pt-32 max-xl:pt-28 max-sm:pt-20 px-32 max-2xl:px-16 max-xl:px-8 max-sm:px-4">
      <div className="max-w-3xl flex flex-col gap-4 ">
        <Link
          href={`/rounds/${props.params.round}`}
          className="text-red flex items-center gap-1 group"
        >
          <ArrowLeft className="w-5 h-5 text-red group-hover:-translate-x-1 transition-transform" />
          Back to round
        </Link>
        <div className="bg-grey-800 rounded-xl overflow-hidden">
          <img
            src={proposal.round.image}
            className="w-full h-48 object-cover object-center max-sm:h-32"
          />
          <div className="flex flex-col gap-2 p-4">
            <h2 className="w-full text-white font-luckiest-guy text-3xl">
              {proposal.round.name}
            </h2>
            <div className="flex flex-col gap-2">
              <Markdown markdown={proposal.round.content} readOnly />
            </div>
          </div>
        </div>
        <ProposalEditor
          round={props.params.round}
          proposal={proposal}
          user={user.id}
        />
      </div>
    </div>
  );
}
