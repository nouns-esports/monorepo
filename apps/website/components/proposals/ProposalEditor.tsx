"use client";

import { useCallback, useState } from "react";
import TextInput from "../form/TextInput";
import Button from "../Button";
import { createProposal } from "@/server/actions/createProposal";
import { $generateHtmlFromNodes } from "@lexical/html";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import LimitMeter from "../LimitMeter";
import { updateProposal } from "@/server/actions/updateProposal";
import { getProposal } from "@/server/queries/proposals";
import dynamic from "next/dynamic";
import Shimmer from "../Shimmer";

const Markdown = dynamic(() => import("../lexical/Markdown"), {
  ssr: false,
  loading: () => <Shimmer />,
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

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const onChangeCallback = useCallback(
    (value: any) => {
      if (value.length <= 100) setTitle(value);
    },
    [title]
  );

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
          onChange={onChangeCallback}
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
          loading={loading}
          animate="bg"
          disabled={
            loading ||
            title.length < 15 ||
            parsedMarkdown.split(" ").length - 1 < 150
          }
          onClick={async () => {
            if (!props.user) return;

            if (props.proposal) {
              setLoading(true);
              toast.promise(
                updateProposal({
                  user: props.user,
                  round: props.round,
                  title,
                  content: editorState,
                }),
                {
                  loading: "Updating proposal",
                  success: () => {
                    router.push(`/rounds/${props.round}`);
                    return "Successfully updated proposal";
                  },
                  error: () => {
                    setLoading(false);
                    return "Failed to update proposal";
                  },
                }
              );

              return;
            }

            setLoading(true);
            toast.promise(
              createProposal({
                title,
                content: editorState,
                round: props.round,
                user: props.user,
              }),
              {
                loading: "Creating proposal",
                success: () => {
                  router.push(`/rounds/${props.round}`);
                  return "Successfully created proposal";
                },
                error: () => {
                  setLoading(false);
                  return "Failed to create proposal";
                },
              }
            );
          }}
        >
          {props.proposal ? "Update Proposal" : "Create Proposal"}
        </Button>
      </div>
    </div>
  );
}
