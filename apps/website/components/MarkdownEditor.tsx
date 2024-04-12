"use client";

import {
  MDXEditor,
  MDXEditorMethods,
  headingsPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
} from "@mdxeditor/editor";
import { type MutableRefObject } from "react";
import TextInput from "./form/TextInput";
import Button from "./Button";

export default function MarkdownEditor(props: {
  editorRef?: MutableRefObject<MDXEditorMethods | null>;
  markdown: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="font-luckiest-guy text-white text-2xl">Title</h2>
        <TextInput placeholder="Enter a title for your proposal" />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-luckiest-guy text-white text-2xl">Proposal</h2>
        <div className="bg-darkgrey rounded-xl overflow-hidden">
          <MDXEditor
            className="text-white"
            ref={props.editorRef}
            markdown={props.markdown}
            plugins={[
              toolbarPlugin({
                toolbarContents: () => (
                  <div className="flex bg-grey rounded-xl">
                    <UndoRedo />
                    <BoldItalicUnderlineToggles />
                  </div>
                ),
              }),
              headingsPlugin(),
            ]}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <h2 className="font-luckiest-guy text-white text-2xl">Submit</h2>
          <p>
            Double check to make sure your poposal includes all necessary
            requirements
          </p>
        </div>

        <Button animate="bg">Submit</Button>
      </div>
    </div>
  );
}
