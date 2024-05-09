"use client";

import { useState } from "react";
import TextInput from "./form/TextInput";
import Button from "./Button";
import { useAction } from "next-safe-action/hooks";
import { createProposal } from "@/server/actions/createProposal";
import { $generateHtmlFromNodes } from "@lexical/html";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import LimitMeter from "./LimitMeter";
import Markdown from "./Mardown";

export default function MarkdownEditor(props: {
  round: string;
  markdown?: string;
}) {
  const [title, setTitle] = useState("");

  const [editorState, setEditorState] = useState(
    props.markdown ??
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

  const [parsedMarkdown, setParsedMarkdown] = useState(props.markdown ?? "");

  const router = useRouter();

  const { execute, result, status } = useAction(createProposal, {
    onSuccess: () => {
      router.push(`/rounds/${props.round}`);
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.fetchError ?? error.serverError ?? "An error occurred");
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
        <div className="relative bg-grey-800 border border-grey-600 rounded-xl overflow-hidden p-2 ">
          <Markdown
            markdown={editorState}
            readOnly={false}
            onChange={(state, editor) => {
              state.read(() => {
                setEditorState(JSON.stringify(editor.toJSON()));
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
          loading={status === "executing"}
          disabled={
            title.length < 15 || parsedMarkdown.split(" ").length - 1 < 150
          }
          onClick={() => {
            if (!user) return;

            execute({
              title,
              description: editorState,
              round: props.round,
              user: user?.id,
            });
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
