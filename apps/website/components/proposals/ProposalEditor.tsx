"use client";

import { useState } from "react";
import TextInput from "../form/TextInput";
import Button from "../Button";
import { createProposal } from "@/server/mutations/createProposal";
import { $generateHtmlFromNodes } from "@lexical/html";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import LimitMeter from "../LimitMeter";
import { updateProposal } from "@/server/mutations/updateProposal";
import dynamic from "next/dynamic";
import Shimmer from "../Shimmer";
import { useAction } from "next-safe-action/hooks";
import type { getRoundWithProposal } from "@/server/queries/rounds";
import { pinImage } from "@/server/mutations/pinImage";
import { Edit2, Plus } from "lucide-react";

const Markdown = dynamic(() => import("../lexical/Markdown"), {
  ssr: false,
  loading: () => <Shimmer />,
});

export default function ProposalEditor(props: {
  round: NonNullable<Awaited<ReturnType<typeof getRoundWithProposal>>>;
  user: string;
}) {
  const proposal =
    props.round.proposals.length > 0 ? props.round.proposals[0] : undefined;

  const [title, setTitle] = useState(proposal?.title ?? "");

  const [image, setImage] = useState(proposal?.image);

  const [editorState, setEditorState] = useState(
    proposal?.content ??
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

  const [parsedMarkdown, setParsedMarkdown] = useState(proposal?.content ?? "");

  const router = useRouter();

  const createProposalAction = useAction(createProposal);
  const updateProposalAction = useAction(updateProposal);

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
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between mt-4">
          <h2 className="font-luckiest-guy text-white text-2xl">Cover Image</h2>
        </div>
        {image ? (
          <img
            src={image}
            className="h-32 w-fit aspect-video object-cover rounded-xl"
          />
        ) : (
          ""
        )}
        <label className="text-red flex items-center gap-1 hover:opacity-80 cursor-pointer transition-opacity">
          {image ? "Change" : "Upload"} image
          {image ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          <input
            type="file"
            accept="image/*"
            onChange={async (event) => {
              const files = event.target.files;

              if (files && files.length > 0) {
                const file = files[0];

                // 25 MB in bytes
                if (file.size > 25 * 1024 * 1024) {
                  return toast.error("Image size should be less than 25 MB");
                }

                const formData = new FormData();
                formData.append("file", file);

                const hash = await pinImage({ formData });

                if (!hash?.data || hash?.serverError) {
                  return toast.error("Could not upload image");
                }

                setImage(`https://ipfs.nouns.gg/ipfs/${hash.data}`);

                event.target.value = "";
              }
            }}
            style={{ display: "none" }}
          />
        </label>
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
          loading={
            createProposalAction.isPending || updateProposalAction.isPending
          }
          disabled={
            createProposalAction.isPending ||
            updateProposalAction.isPending ||
            title.length < 15 ||
            parsedMarkdown.split(" ").length - 1 < 150
          }
          onClick={async () => {
            if (!props.user) return;

            if (proposal) {
              const result = await updateProposalAction.executeAsync({
                round: props.round.id,
                title,
                content: editorState,
              });

              if (result?.serverError) {
                return toast.error(result.serverError);
              }

              toast.success("Successfully updated proposal");
              return router.push(`/rounds/${props.round.id}`);
            }

            const result = await createProposalAction.executeAsync({
              title,
              content: editorState,
              round: props.round.id,
              image: image ?? undefined,
            });

            if (result?.serverError) {
              return toast.error(result.serverError);
            }

            toast.success("Successfully created proposal");
            return router.push(`/rounds/${props.round.id}`);
          }}
        >
          {proposal ? "Update Proposal" : "Create Proposal"}
        </Button>
      </div>
    </div>
  );
}
