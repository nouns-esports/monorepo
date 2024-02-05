"use client";

//@ts-ignore
import { generateHTML } from "@tiptap/html";
import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Heading from "@tiptap/extension-heading";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import { useMemo } from "react";
import { Node } from "@tiptap/core";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import Underline from "@tiptap/extension-underline";

const Twitter = Node.create({
  name: "twitter",
  renderHTML() {
    return ["span", { class: "custom-twitter" }, ""];
  },
});

const FigCaption = Node.create({
  name: "figcaption",
  renderHTML() {
    return ["span", { class: "custom-figcaption" }, ""];
  },
});

const Figure = Node.create({
  name: "figure",
  renderHTML() {
    return ["span", { class: "custom-figure" }, ""];
  },
});

const Youtube = Node.create({
  name: "youtube",
  renderHTML() {
    return ["span", { class: "custom-youtube" }, ""];
  },
});

const supportedNodes: Node[] = [Document, Text, Paragraph, Heading];

type TipTapNode = {
  type: string;
  content: TipTapNode[];
};

export default function PostViewer(props: { tiptap: TipTapNode }) {
  const output = useMemo(() => {
    const tipTapNodes = Object.keys(
      supportedNodes.map((tipTapNode) => tipTapNode.type)
    );

    return generateHTML(
      {
        ...props.tiptap,
        content: props.tiptap.content.filter((node) =>
          tipTapNodes.includes(node.type)
        ),
      },
      supportedNodes
    );
  }, [props.tiptap]);

  return <div dangerouslySetInnerHTML={{ __html: output }} />;
}
