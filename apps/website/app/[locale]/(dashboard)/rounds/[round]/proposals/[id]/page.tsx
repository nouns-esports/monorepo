import Link from "@/components/Link";
import Markdown from "@/components/Mardown";
import { notFound } from "next/navigation";
import { ArrowLeft } from "phosphor-react-sc";
import { getFrameMetadata } from "frog/next";
import type { Metadata } from "next";
import { getProposal } from "@/server/queries/proposals";

export async function generateMetadata(props: {
  params: { round: string; id: string };
}): Promise<Metadata> {
  return {
    other: await getFrameMetadata(
      `http://localhost:3000/frames/round/${props.params.round}/proposal${props.params.id}`
    ),
  };
}

export default async function Proposal(props: {
  params: { round: string; id: string };
}) {
  const proposal = await getProposal({ id: Number(props.params.id) });

  if (!proposal) {
    return notFound();
  }

  return (
    <div className="flex flex-col gap-4">
      <Link
        href={`/rounds/${props.params.round}`}
        className="text-red flex items-center gap-1 group"
      >
        <ArrowLeft className="w-5 h-5 text-red group-hover:-translate-x-1 transition-transform" />
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
