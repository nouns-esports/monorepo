import Link from "@/components/Link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "phosphor-react-sc";
import { getFrameMetadata } from "frog/next";
import type { Metadata } from "next";
import { getProposal } from "@/server/queries/proposals";
import dynamic from "next/dynamic";
import Shimmer from "@/components/Shimmer";

const Markdown = dynamic(() => import("@/components/lexical/Markdown"), {
  ssr: false,
  loading: () => <Shimmer />,
});

export async function generateMetadata(props: {
  params: { round: string; proposal: string };
}): Promise<Metadata> {
  return {
    other: await getFrameMetadata(
      `http://localhost:3000/frames/round/${props.params.round}/proposal${props.params.proposal}`
    ),
  };
}

export default async function Proposal(props: {
  params: { round: string; proposal: string };
}) {
  const proposal = await getProposal({ id: Number(props.params.proposal) });

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
      <div className="flex flex-col gap-4 bg-grey-800 rounded-xl p-6 max-sm:p-3 min-h-96">
        <h2 className="text-white font-luckiest-guy text-3xl">
          {proposal.title}
        </h2>
        <Markdown markdown={proposal.content} readOnly />
      </div>
    </div>
  );
}
