"use client";

import {
  MDXEditor,
  MDXEditorMethods,
  headingsPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  CreateLink,
  InsertImage,
  ListsToggle,
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
            className="[&_.mdxeditor-root-contenteditable>div]:p-0 [&_.mdxeditor-toolbar]:p-0 p-3 w-full [&_.mdxeditor-toolbar]:bg-transparent prose max-w-none prose-strong:text-white prose-a:text-red prose-p:text-lightgrey prose-p:leading-snug prose-p:my-0 prose-headings:text-white"
            ref={props.editorRef}
            markdown={props.markdown}
            placeholder="Enter your proposal here"
            plugins={[
              toolbarPlugin({
                toolbarContents: () => (
                  <div className="flex bg-grey mb-2 rounded-lg leading-none overflow-hidden">
                    <UndoRedo />
                    <BoldItalicUnderlineToggles />
                    <BlockTypeSelect />
                    <ListsToggle />
                    <CreateLink />
                    <InsertImage />
                  </div>
                ),
              }),
              headingsPlugin(),
            ]}
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
        <Button animate="bg">Submit</Button>
      </div>
    </div>
  );
}
