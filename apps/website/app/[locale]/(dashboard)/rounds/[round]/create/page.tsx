import Link from "@/components/Link";
import dynamic from "next/dynamic";
import { ArrowLeft } from "phosphor-react-sc";
import { Suspense } from "react";
import "@mdxeditor/editor/style.css";
import { notFound } from "next/navigation";
import { query } from "@/app/api/query/server";

const MarkdownEditor = dynamic(() => import("@/components/MarkdownEditor"), {
  ssr: false,
});

export default async function Create(props: { params: { round: string } }) {
  const round = await query.getRound({ id: props.params.round });

  if (!round) {
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
      <div className="flex flex-col bg-darkgrey rounded-xl overflow-hidden">
        <img
          src={round.image}
          className="w-full h-48 object-cover object-center"
        />
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col gap-1">
            <p className="text-white/40 text-sm">Creating a proposal for</p>
            <h1 className="text-white font-luckiest-guy text-3xl">
              {round.name}
            </h1>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-white font-semibold">
              Your proposal should include
            </h2>
            <ul className="list-disc pl-6 text-white/40">
              <li>A detailed desciption of your background</li>
              <li>
                A convincing argument as to why someone should vote for you
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-white font-semibold">
              How to increase your odds of being voted for
            </h2>
            <ul className="list-disc pl-6 text-white/40">
              <li>Verify your identity with Farcaster</li>
              <li>Include images of you or your achivements</li>
              <li>
                Get to know the Nouns Esports community through our Discord
                server or Farcaster channels
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Suspense fallback={null}>
        <MarkdownEditor markdown="Hello **world**!" />
      </Suspense>
    </div>
  );
}
