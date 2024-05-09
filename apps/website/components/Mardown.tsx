"use client";

import { LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HeadingNode } from "@lexical/rich-text";
import { ImageNode } from "./lexical/nodes/ImageNode";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import type { EditorState, LexicalEditor } from "lexical";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import ImagePlugin from "./lexical/plugins/ImagePlugin";
import ToolbarPlugin from "./lexical/plugins/ToolbarPlugin";

export default function Markdown(props: {
  markdown: string;
  readOnly: boolean;
  onChange?: (state: EditorState, editor: LexicalEditor) => void;
}) {
  console.log(props.markdown);

  return (
    <div>
      <LexicalComposer
        initialConfig={{
          namespace: "MyEditor",
          theme: {},
          onError: (error) => {
            console.error(error);
          },
          editable: !props.readOnly,
          nodes: [LinkNode, ListNode, ListItemNode, HeadingNode, ImageNode],
          editorState: JSON.stringify({
            root: JSON.parse(props.markdown),
          }),
        }}
      >
        {!props.readOnly ? (
          <>
            <HistoryPlugin />
            <ToolbarPlugin />
            <AutoFocusPlugin />
            <OnChangePlugin onChange={props.onChange ?? (() => {})} />
          </>
        ) : (
          ""
        )}
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="outline-none pt-2 px-1 flex flex-col gap-4 prose max-w-none prose-strong:text-white prose-a:text-red prose-p:text-grey-200 prose-p:leading-snug prose-p:my-0 prose-headings:text-white prose-li:text-grey-200 prose-headings:m-0 prose-ul:m-0 prose-ol:m-0 prose-li:m-0 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl" />
          }
          placeholder={
            <div className="text-grey-400 pointer-events-none absolute top-12 pl-1">
              Enter proposal here
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <LinkPlugin />
        <ListPlugin />
        <ImagePlugin />
      </LexicalComposer>
    </div>
  );
}
