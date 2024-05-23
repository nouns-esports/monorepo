"use client";

import { useEffect, useState } from "react";
import TextInput from "../form/TextInput";
import Button from "../Button";
import { createProposal } from "@/server/actions/createProposal";
import { $generateHtmlFromNodes } from "@lexical/html";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import LimitMeter from "../LimitMeter";
import { updateProposal } from "@/server/actions/updateProposal";
import { getProposal } from "@/server/queries/proposals";
import dynamic from "next/dynamic";

const Markdown = dynamic(() => import("../lexical/Markdown"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent before:animate-shimmer rounded-xl relative before:absolute before:inset-0 overflow-hidden" />
  ),
});

export default function MarkdownEditor(props: {
  round: string;
  user?: string;
  proposal?: Awaited<ReturnType<typeof getProposal>>;
}) {
  const [title, setTitle] = useState(props.proposal?.title ?? "");

  const [editorState, setEditorState] = useState(
    props.proposal?.content ??
      JSON.stringify({
        children: [
          {
            children: [],
            direction: null,
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1,
            textFormat: 0,
          },
        ],
        direction: null,
        format: "",
        indent: 0,
        type: "root",
        version: 1,
      })
  );

  const [parsedMarkdown, setParsedMarkdown] = useState(
    props.proposal?.content ?? ""
  );

  const { user, authenticated } = usePrivy();

  const router = useRouter();

  useEffect(() => {
    if (authenticated && !user) {
      router.refresh();
    }
  }, [authenticated]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between mt-4">
          <h2 className="font-luckiest-guy text-white text-2xl">Title</h2>
          <LimitMeter
            type="character"
            value={title.length}
            min={15}
            max={100}
          />
        </div>
        <TextInput
          placeholder="Enter a title for your proposal"
          onChange={(value) => {
            if (value.length <= 100) setTitle(value);
          }}
          value={title}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="font-luckiest-guy text-white text-2xl">Proposal</h2>
          <LimitMeter
            type="word"
            value={parsedMarkdown.split(" ").length - 1}
            min={150}
            max={Infinity}
          />
        </div>
        <div className="relative bg-grey-800 border border-grey-600 rounded-xl overflow-hidden p-2 min-h-60">
          <Markdown
            markdown={editorState}
            readOnly={false}
            onChange={(state, editor) => {
              state.read(() => {
                setEditorState(
                  JSON.stringify(editor.toJSON().editorState.root)
                );
                setParsedMarkdown(
                  $generateHtmlFromNodes(editor).replaceAll(/<[^>]*>/g, "")
                );
              });
            }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="font-luckiest-guy text-white text-2xl">Submit</h2>
          <p>
            Double check to make sure your poposal includes all necessary
            requirements
          </p>
        </div>
        <Button
          animate="bg"
          loading={false}
          disabled={
            title.length < 15 || parsedMarkdown.split(" ").length - 1 < 150
          }
          onClick={async () => {
            if (!props.user) return;

            if (props.proposal) {
              await updateProposal({
                user: props.user,
                round: props.round,
                title,
                content: editorState,
              });

              router.push(`/rounds/${props.round}`);

              return;
            }

            await createProposal({
              title,
              content: editorState,
              round: props.round,
              user: props.user,
            });

            router.push(`/rounds/${props.round}`);
          }}
        >
          {props.proposal ? "Update Proposal" : "Create Proposal"}
        </Button>
      </div>
    </div>
  );
}
