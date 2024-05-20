"use client";

import { useState } from "react";
import TextInput from "../form/TextInput";
import Button from "../Button";
import { useAction } from "next-safe-action/hooks";
import { createProposal } from "@/server/actions/createProposal";
import { $generateHtmlFromNodes } from "@lexical/html";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import LimitMeter from "../LimitMeter";
import Markdown from "../lexical/Mardown";
import { Proposal } from "@/db/schema";
import { updateProposal } from "@/server/actions/updateProposal";

export default function MarkdownEditor(props: {
  round: string;
  proposal?: Proposal;
}) {
  const [title, setTitle] = useState(props.proposal?.title ?? "");

  const [editorState, setEditorState] = useState(
    props.proposal?.description ??
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
    props.proposal?.description ?? ""
  );

  const router = useRouter();

  const { execute: executeCreateProposal, status: createProposalStatus } =
    useAction(createProposal, {
      onSuccess: () => {
        router.push(`/rounds/${props.round}`);
      },
      onError: (error) => {
        console.error(error);
        toast.error(
          error.fetchError ?? error.serverError ?? "An error occurred"
        );
      },
    });

  const { execute: executeUpdateProposal, status: updateProposalStatus } =
    useAction(updateProposal, {
      onSuccess: () => {
        router.push(`/rounds/${props.round}`);
      },
      onError: (error) => {
        console.error(error);
        toast.error(
          error.fetchError ?? error.serverError ?? "An error occurred"
        );
      },
    });

  const { user } = usePrivy();

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
          loading={
            createProposalStatus === "executing" ||
            updateProposalStatus === "executing"
          }
          disabled={
            title.length < 15 || parsedMarkdown.split(" ").length - 1 < 150
          }
          onClick={() => {
            if (!user) return;

            if (props.proposal) {
              executeUpdateProposal({
                user: user.id,
                round: props.round,
                proposal: props.proposal.id,
                title,
                description: editorState,
              });
              return;
            }

            executeCreateProposal({
              title,
              description: editorState,
              round: props.round,
              user: user.id,
            });
          }}
        >
          {props.proposal ? "Update Proposal" : "Create Proposal"}
        </Button>
      </div>
    </div>
  );
}
