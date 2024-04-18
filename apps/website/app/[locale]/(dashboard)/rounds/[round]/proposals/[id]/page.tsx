import { query } from "@/app/api/query/server";
import Link from "@/components/Link";
import Markdown from "@/components/Mardown";
import { notFound } from "next/navigation";
import { ArrowLeft } from "phosphor-react-sc";

export default async function Proposal(props: {
  params: { round: string; id: string };
}) {
  const proposal = await query.getProposal({ id: Number(props.params.id) });

  if (!proposal) {
    return notFound();
  }

  return (
    <div className="flex flex-col gap-4">
      <Link
        href={`/rounds/${props.params.round}`}
        className="text-red flex items-center gap-1"
      >
        <ArrowLeft className="w-5 h-5 text-red" />
        Back to round
      </Link>
      <div className="flex flex-col gap-2 bg-darkgrey rounded-xl p-4">
        <h2 className="text-white font-luckiest-guy text-3xl">
          {proposal.title}
        </h2>
        <Markdown markdown={proposal.description} style />
      </div>
    </div>
  );
}
