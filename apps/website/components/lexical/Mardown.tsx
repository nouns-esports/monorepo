"use client";

import { LinkNode, AutoLinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HeadingNode } from "@lexical/rich-text";
import { ImageNode } from "./nodes/ImageNode";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import type { EditorState, LexicalEditor } from "lexical";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { AutoLinkPlugin } from "@lexical/react/LexicalAutoLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import ImagePlugin from "./plugins/ImagePlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { useState } from "react";

export default function Markdown(props: {
  markdown: string;
  readOnly: boolean;
  onChange?: (state: EditorState, editor: LexicalEditor) => void;
}) {
  return (
    <div>
      <LexicalComposer
        initialConfig={{
          namespace: "Nouns Esports Proposals",
          theme: {},
          onError: (error) => {
            console.error(error);
          },
          editable: !props.readOnly,
          nodes: [
            LinkNode,
            AutoLinkNode,
            ListNode,
            ListItemNode,
            HeadingNode,
            ImageNode,
          ],
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
            <TabIndentationPlugin />
          </>
        ) : (
          ""
        )}
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              onKeyDown={(e) => {
                if (e.key === "Tab") {
                  e.preventDefault();
                }
              }}
              className="outline-none pt-2 px-1 flex flex-col gap-4 prose max-w-none prose-strong:text-white prose-a:text-red prose-p:text-grey-200 marker:text-grey-200 prose-p:leading-snug prose-p:my-0 prose-headings:text-white prose-li:text-grey-200 prose-headings:m-0 prose-ul:m-0 prose-ol:m-0 prose-li:m-0 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl"
            />
          }
          placeholder={
            <div className="text-grey-400 pointer-events-none absolute top-12 pl-1">
              Enter proposal here
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <LinkPlugin />
        <AutoLinkPlugin
          matchers={[
            (text) => {
              const URL_MATCHER =
                /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

              const match = URL_MATCHER.exec(text);

              if (match === null) {
                return null;
              }

              const fullMatch = match[0];

              return {
                index: match.index,
                length: fullMatch.length,
                text: fullMatch,
                url: fullMatch.startsWith("http")
                  ? fullMatch
                  : `https://${fullMatch}`,
                attributes: { rel: "noreferrer", target: "_blank" },
              };
            },
          ]}
        />
        <ListPlugin />
        <ImagePlugin />
      </LexicalComposer>
    </div>
  );
}
