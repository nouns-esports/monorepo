"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
} from "react";
import TextInput from "./form/TextInput";
import Button from "./Button";
import { useAction } from "next-safe-action/hooks";
import { createProposal } from "@/server/actions/createProposal";

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { LinkNode } from "@lexical/link";

import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { ListNode, ListItemNode } from "@lexical/list";
import { HeadingNode } from "@lexical/rich-text";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { $generateHtmlFromNodes } from "@lexical/html";
import {
  TextItalic,
  ArrowCounterClockwise,
  ArrowClockwise,
  TextUnderline,
  TextB,
  TextStrikethrough,
} from "phosphor-react-sc";
import { twMerge } from "tailwind-merge";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { ImageNode } from "./lexical/nodes/ImageNode";
import ImagePlugin from "./lexical/plugins/ImagePlugin";

export default function MarkdownEditor(props: {
  round: string;
  markdown?: string;
}) {
  const [title, setTitle] = useState("");

  const [editorState, setEditorState] = useState("");

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
        <div className="relative bg-darkgrey border border-grey rounded-xl overflow-hidden p-2 prose max-w-none prose-strong:text-white prose-a:text-red prose-p:text-lightgrey prose-p:leading-snug prose-p:my-0 prose-headings:text-white prose-li:text-lightgrey prose-headings:m-0 prose-ul:m-0 prose-ol:m-0 prose-li:m-0 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl">
          <LexicalComposer
            initialConfig={{
              namespace: "MyEditor",
              theme: {},
              onError: (error) => {
                console.error(error);
              },
              nodes: [LinkNode, ListNode, ListItemNode, HeadingNode, ImageNode],
              editorState: JSON.stringify({
                root: {
                  children: [
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "[A version of this proposal may be also read using this notion link with some more visual elements: ",
                          type: "text",
                          version: 1,
                        },
                        {
                          children: [
                            {
                              detail: 0,
                              format: 0,
                              mode: "normal",
                              style: "",
                              text: "here",
                              type: "text",
                              version: 1,
                            },
                          ],
                          direction: "ltr",
                          format: "",
                          indent: 0,
                          type: "link",
                          version: 1,
                          rel: "noreferrer",
                          target: "_blank",
                          title: null,
                          url: "https://metasports.notion.site/Metasports-x-Nouns-Esports-Prop-House-Grant-1-bdba41500b3e441abfb6516e4379104c",
                        },
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "]",
                          type: "text",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "paragraph",
                      version: 1,
                      textFormat: 0,
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 1,
                          mode: "normal",
                          style: "",
                          text: "OBJECTIVES AND OVERVIEW",
                          type: "text",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "heading",
                      version: 1,
                      tag: "h1",
                    },
                    {
                      children: [],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "list",
                      version: 1,
                      listType: "number",
                      start: 1,
                      tag: "ul",
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "At Metasports, one of our most beloved IPs is Community Showdown (or ComShow). ComShow is a modular IP we use to hold tournaments featuring a variety of titles to allow casual players to experience what it is like to play in a professionally-produced esports tournaments. Some titles we’ve done in recent years:",
                          type: "text",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "paragraph",
                      version: 1,
                      textFormat: 0,
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "ComShow Valorant, with Grab and Legion by Lenovo",
                          type: "text",
                          version: 1,
                        },
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "ComShow CS:GO, with VP Game",
                          type: "text",
                          version: 1,
                        },
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "ComShow Pokemon VGC, with Razer and Mogul",
                          type: "text",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "list",
                      version: 1,
                      listType: "bullet",
                      start: 1,
                      tag: "ul",
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 1,
                          mode: "normal",
                          style: "",
                          text: "“Nouns ComShow: Marvel Snap”",
                          type: "text",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "paragraph",
                      version: 1,
                      textFormat: 0,
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "We would love to bring Nouns Esports to it’s first touch in APAC/SEA through our dedicated ComShow series for Marvel Snap—with Nouns Esports to be called: ",
                          type: "text",
                          version: 1,
                        },
                        {
                          detail: 0,
                          format: 1,
                          mode: "normal",
                          style: "",
                          text: "Nouns ComShow: Marvel Snap",
                          type: "text",
                          version: 1,
                        },
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: ".",
                          type: "text",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "paragraph",
                      version: 1,
                      textFormat: 0,
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "10-12 Campaign",
                          type: "text",
                          version: 1,
                        },
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "8 Weekly Tournaments",
                          type: "text",
                          version: 1,
                        },
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "64 Participants",
                          type: "text",
                          version: 1,
                        },
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "$225 Prizepool each week",
                          type: "text",
                          version: 1,
                        },
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "$125 from Nouns Esports to takeover Lead Sponsor and main brand integration",
                          type: "text",
                          version: 1,
                        },
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "Remaining $100 provided from existing grant from Community Gaming",
                          type: "text",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "list",
                      version: 1,
                      listType: "bullet",
                      start: 1,
                      tag: "ul",
                    },
                    {
                      children: [
                        {
                          children: [
                            {
                              altText: "",
                              caption: {
                                editorState: {
                                  root: {
                                    children: [],
                                    direction: "ltr",
                                    format: "",
                                    indent: 0,
                                    type: "root",
                                    version: 1,
                                  },
                                },
                              },
                              height: 0,
                              maxWidth: 500,
                              showCaption: false,
                              src: "https://prophouse.mypinata.cloud/ipfs/QmSzvCtbT1ong2RvzqHmPoLMgpwnPFWowaG2YkAkQfocom",
                              type: "image",
                              version: 1,
                              width: 0,
                            },
                          ],
                          direction: null,
                          format: "",
                          indent: 0,
                          type: "paragraph",
                          version: 1,
                          textFormat: 0,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "paragraph",
                      version: 1,
                      textFormat: 0,
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 1,
                          mode: "normal",
                          style: "",
                          text: "TARGET AUDIENCE",
                          type: "text",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "heading",
                      version: 1,
                      tag: "h1",
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "By utilizing a web2 title, Metasports aims to reach web2-leaning casual players looking to test their mettle against other enthusiasts. Key metrics from our last ComShow featuring Marvel Snap:",
                          type: "text",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "paragraph",
                      version: 1,
                      textFormat: 0,
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "We had initially planned room for 64 players per tournament, but had to adjust as we received well over 64 entries for all three tournaments, resulting in 376 total players joining.",
                          type: "text",
                          version: 1,
                        },
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "186 total matches were played with $800 total being disbursed to the top players of each tournament.",
                          type: "text",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "list",
                      version: 1,
                      listType: "bullet",
                      start: 1,
                      tag: "ul",
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "As a tournament will be ran every week for eight weeks, we’re aiming to fill all 64 slots for each Swiss-style tournament, amounting to 512 total players but definitely expecting a little over that number to register based on previous experience. Registration will be open to casual and competitive players alike, and each player will also be asked for a wallet address in order to register for the tournaments. This will be how we distribute the POAP SBTs through Nouns allowing you to have a record of our participants as well as allowing them to be soft-onboarded to Nouns.",
                          type: "text",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "paragraph",
                      version: 1,
                      textFormat: 0,
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 1,
                          mode: "normal",
                          style: "",
                          text: "BRAND INTEGRATION",
                          type: "text",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "heading",
                      version: 1,
                      tag: "h1",
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "We would honored to have Nouns Esports come on as a Title Sponsor for this ComShow run, to be titled “Nouns ComShow: Marvel Snap”",
                          type: "text",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "paragraph",
                      version: 1,
                      textFormat: 0,
                    },
                    {
                      children: [
                        {
                          children: [
                            {
                              altText: "",
                              caption: {
                                editorState: {
                                  root: {
                                    children: [],
                                    direction: "ltr",
                                    format: "",
                                    indent: 0,
                                    type: "root",
                                    version: 1,
                                  },
                                },
                              },
                              height: 0,
                              maxWidth: 500,
                              showCaption: false,
                              src: "https://prophouse.mypinata.cloud/ipfs/Qmf1fUjjfnxpDL4EPfpK6AyhMxHHxc1utTgCNZuT8zevAM",
                              type: "image",
                              version: 1,
                              width: 0,
                            },
                          ],
                          direction: null,
                          format: "",
                          indent: 0,
                          type: "paragraph",
                          version: 1,
                          textFormat: 0,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "paragraph",
                      version: 1,
                      textFormat: 0,
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 1,
                          mode: "normal",
                          style: "",
                          text: "MARKETING AND PROMOTION",
                          type: "text",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "heading",
                      version: 1,
                      tag: "h1",
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 1,
                          mode: "normal",
                          style: "",
                          text: "World Class Asset Production",
                          type: "text",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "paragraph",
                      version: 1,
                      textFormat: 0,
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "Our creative engine, ",
                          type: "text",
                          version: 1,
                        },
                        {
                          children: [
                            {
                              detail: 0,
                              format: 1,
                              mode: "normal",
                              style: "",
                              text: "Overdrive Studios",
                              type: "text",
                              version: 1,
                            },
                          ],
                          direction: "ltr",
                          format: "",
                          indent: 0,
                          type: "link",
                          version: 1,
                          rel: "noreferrer",
                          target: "_blank",
                          title: null,
                          url: "https://overdrive.gg/",
                        },
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: ", has created stunning key visuals and broadcast assets for tournaments all across the globe, and will be ready to facilitate the creation of the aforementioned for our Nouns ComShow. Overdrive is an award winning Esports design studio in Southeast Asia with clients globally:",
                          type: "text",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "paragraph",
                      version: 1,
                      textFormat: 0,
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "Overdrive Website: ",
                          type: "text",
                          version: 1,
                        },
                        {
                          children: [
                            {
                              detail: 0,
                              format: 0,
                              mode: "normal",
                              style: "",
                              text: "https://overdrive.gg/",
                              type: "text",
                              version: 1,
                            },
                          ],
                          direction: "ltr",
                          format: "",
                          indent: 0,
                          type: "link",
                          version: 1,
                          rel: "noreferrer",
                          target: "_blank",
                          title: null,
                          url: "https://overdrive.gg/",
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "paragraph",
                      version: 1,
                      textFormat: 0,
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 1,
                          mode: "normal",
                          style: "",
                          text: "The Right Distribution Channel",
                          type: "text",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "paragraph",
                      version: 1,
                      textFormat: 0,
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 1,
                          mode: "normal",
                          style: "",
                          text: "Facebook Page.",
                          type: "text",
                          version: 1,
                        },
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: " Nouns ComShow will be pushed through the SEAesport facebook page, a long-standing media and community IP in Southeast Asian esports—having been official media for events like The International in Singapore and ESL Genting.",
                          type: "text",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "paragraph",
                      version: 1,
                      textFormat: 0,
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "SEAesport Facebook Page: ",
                          type: "text",
                          version: 1,
                        },
                        {
                          children: [
                            {
                              detail: 0,
                              format: 0,
                              mode: "normal",
                              style: "",
                              text: "https://www.facebook.com/SEAesport",
                              type: "text",
                              version: 1,
                            },
                          ],
                          direction: "ltr",
                          format: "",
                          indent: 0,
                          type: "link",
                          version: 1,
                          rel: "noreferrer",
                          target: "_blank",
                          title: null,
                          url: "https://www.facebook.com/SEAesport",
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "paragraph",
                      version: 1,
                      textFormat: 0,
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "Facebook is strong for streaming and content in SEA, the Philippines particularly, you’ll find the the SEAesport page stats below:",
                          type: "text",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "paragraph",
                      version: 1,
                      textFormat: 0,
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "51k followers",
                          type: "text",
                          version: 1,
                        },
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "380k+ engagements per month",
                          type: "text",
                          version: 1,
                        },
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "26.8k average peak impressions per month",
                          type: "text",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "list",
                      version: 1,
                      listType: "bullet",
                      start: 1,
                      tag: "ul",
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "Our main CALL-TO-ACTION across content will be:",
                          type: "text",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "paragraph",
                      version: 1,
                      textFormat: 0,
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "Join the official Nouns Esports Discord; and,",
                          type: "text",
                          version: 1,
                        },
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "“Learn more about Nouns and Nouns Esports at _____”, provided links or the podcast proposed in this document",
                          type: "text",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "list",
                      version: 1,
                      listType: "bullet",
                      start: 1,
                      tag: "ul",
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 1,
                          mode: "normal",
                          style: "",
                          text: "Press Release.",
                          type: "text",
                          version: 1,
                        },
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: " We’ll be creating a press release for distribution to media contacts we have in the region to bring light to Nouns Esports first foray into Southeast Asia. Some contacts we’ll distribute to:",
                          type: "text",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "paragraph",
                      version: 1,
                      textFormat: 0,
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "Yahoo Esports",
                          type: "text",
                          version: 1,
                        },
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "Inquirer Esports",
                          type: "text",
                          version: 1,
                        },
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "BitPinas",
                          type: "text",
                          version: 1,
                        },
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "The MegaMaxi",
                          type: "text",
                          version: 1,
                        },
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "WhatToPlay/TingBits",
                          type: "text",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "list",
                      version: 1,
                      listType: "bullet",
                      start: 1,
                      tag: "ul",
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 1,
                          mode: "normal",
                          style: "",
                          text: "[Optional] Podcast on Nouns with PPD + Sasquatch.",
                          type: "text",
                          version: 1,
                        },
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: " Produced in our studio, we can produce (hosting PPD and/or Sasquatch removtely) a video podcast for release in SEAesport Youtube and pushed on social media for evergreen content on what Nouns Esports is",
                          type: "text",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "paragraph",
                      version: 1,
                      textFormat: 0,
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 1,
                          mode: "normal",
                          style: "",
                          text: "Regarding Broadcast.",
                          type: "text",
                          version: 1,
                        },
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: " During ComShow, we usually do live giveaways to entice viewership, however while we are excited to broadcast live gameplay of Marvel Snap, there is no official spectator or observer mode available yet, and as such we are looking to grow the grassroots Marvel Snap scene in anticipation of this feature being released. We offer the podcast as high-value evergreen content as a great substitute.",
                          type: "text",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "paragraph",
                      version: 1,
                      textFormat: 0,
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 1,
                          mode: "normal",
                          style: "",
                          text: "POAPS SBTs and Community Gaming.",
                          type: "text",
                          version: 1,
                        },
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: " In order to bridge attendees with web3, we will be providing POAP SBTs to all participants (competitors and viewers[opt-in] alike) in an effort to bring a mainly web2-facing player base and audience on-chain. Exposure to play through Community Gaming also allows some native discovery to wallets and crypto distribution",
                          type: "text",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "paragraph",
                      version: 1,
                      textFormat: 0,
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 1,
                          mode: "normal",
                          style: "",
                          text: "OUR EXPERIENCE",
                          type: "text",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "heading",
                      version: 1,
                      tag: "h1",
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "As a media house with deep roots in esports and early natives to web3, Metasports’s expertise lies in holistic 360° Tournament Operations: total tournament production. From rulebooks and tournament formats to broadcast overlays and stage design, Metasports has been organizing events from top to bottom to deliver experiences gamers love.",
                          type: "text",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "paragraph",
                      version: 1,
                      textFormat: 0,
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "The ",
                          type: "text",
                          version: 1,
                        },
                        {
                          detail: 0,
                          format: 1,
                          mode: "normal",
                          style: "",
                          text: "Lunacian Sports League",
                          type: "text",
                          version: 1,
                        },
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: " (LSL) is one of our biggest IPs: as the first and longest-running professionally-organized esports league for one of the leading Web3 game titles: Axie Infinity. A Metasports production, LSL has been organizing with the support of Sky Mavis since early 2021.",
                          type: "text",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "paragraph",
                      version: 1,
                      textFormat: 0,
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "During our fourth season in 2022, we saw 2,050 participants fight to lay claim to their share of a $50,000 USDC prize pool in over 2900+ games played across 8 qualifiers and playoffs. With over 109.8k live views on FB and Twitch and 1.3M+ social reach across the LSL Facebook and Twitter, a captive audience watched eagerly as players all across the globe competed for top spots in our tournament. You can learn more about the Lunacian Sports League and our ongoing fifth season ",
                          type: "text",
                          version: 1,
                        },
                        {
                          children: [
                            {
                              detail: 0,
                              format: 0,
                              mode: "normal",
                              style: "",
                              text: "here",
                              type: "text",
                              version: 1,
                            },
                          ],
                          direction: "ltr",
                          format: "",
                          indent: 0,
                          type: "link",
                          version: 1,
                          rel: "noreferrer",
                          target: "_blank",
                          title: null,
                          url: "https://docs.google.com/presentation/d/1WxhwSpbv0cMXDVf8YFkMfyT-yu0D2jpu-rXB3KskBXQ/edit?usp=sharing",
                        },
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: ", as well as on our ",
                          type: "text",
                          version: 1,
                        },
                        {
                          children: [
                            {
                              detail: 0,
                              format: 0,
                              mode: "normal",
                              style: "",
                              text: "official socials",
                              type: "text",
                              version: 1,
                            },
                          ],
                          direction: "ltr",
                          format: "",
                          indent: 0,
                          type: "link",
                          version: 1,
                          rel: "noreferrer",
                          target: "_blank",
                          title: null,
                          url: "https://twitter.com/LSL_GG",
                        },
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: ".",
                          type: "text",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "paragraph",
                      version: 1,
                      textFormat: 0,
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "Website: ",
                          type: "text",
                          version: 1,
                        },
                        {
                          children: [
                            {
                              detail: 0,
                              format: 0,
                              mode: "normal",
                              style: "",
                              text: "https://www.lsl.gg/lsl-season-3",
                              type: "text",
                              version: 1,
                            },
                          ],
                          direction: "ltr",
                          format: "",
                          indent: 0,
                          type: "link",
                          version: 1,
                          rel: "noreferrer",
                          target: "_blank",
                          title: null,
                          url: "https://www.lsl.gg/lsl-season-3",
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "paragraph",
                      version: 1,
                      textFormat: 0,
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "In 2020, we held the first local ",
                          type: "text",
                          version: 1,
                        },
                        {
                          detail: 0,
                          format: 1,
                          mode: "normal",
                          style: "",
                          text: "VALORANT tournament in the Philippines co-presented by GrabFood",
                          type: "text",
                          version: 1,
                        },
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: " using the ComShow IP to support the worldwide launch of Valorant. We teamed up with GrabFood, Legion by Lenovo, Mogul, and XSplit to bring a premiere grassroots tournament for the Philippines with endorsement from Riot Games.",
                          type: "text",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "paragraph",
                      version: 1,
                      textFormat: 0,
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "The members of the tournament’s winning team later got scouted to compete for one of the PH’s leading Valorant pro teams. With over $2,000 USD in prize pool and another $2,000 in vouchers and giveaways, this 6-week campaign saw over 500 registered players compete in 350 qualifying matches with over 330,000+ minutes viewed and a staggering 620,000+ in social reach through our official channels.",
                          type: "text",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "paragraph",
                      version: 1,
                      textFormat: 0,
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 1,
                          mode: "normal",
                          style: "",
                          text: "BUDGET AND ROI",
                          type: "text",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "heading",
                      version: 1,
                      tag: "h1",
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "Budget ask: $1,000+ USDC, all going to prize pool, distributed evenly across 8 tournaments happening weekly.",
                          type: "text",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "paragraph",
                      version: 1,
                      textFormat: 0,
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "We take no profit or operations costs from the grant for this event.",
                          type: "text",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "paragraph",
                      version: 1,
                      textFormat: 0,
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "Metasports will handle the 360 Tournament Ops for the Nouns ComShow tournament production. Nouns Esports will also receive  to our SEAesport official Facebook page followers by coming on as a Title Sponsor of ComShow, and can expect 40+ social media posts with Nouns-powered branding for the duration of this campaign, as well as two (2) Facebook boosted awareness posts (1 per month of the campaign).",
                          type: "text",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "paragraph",
                      version: 1,
                      textFormat: 0,
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "Some stats about our SEAesport Facebook page:",
                          type: "text",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "paragraph",
                      version: 1,
                      textFormat: 0,
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 1,
                          mode: "normal",
                          style: "",
                          text: "51k followers",
                          type: "text",
                          version: 1,
                        },
                        {
                          detail: 0,
                          format: 1,
                          mode: "normal",
                          style: "",
                          text: "380k+ engagements per month",
                          type: "text",
                          version: 1,
                        },
                        {
                          detail: 0,
                          format: 1,
                          mode: "normal",
                          style: "",
                          text: "26.8k average peak impressions per month",
                          type: "text",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "list",
                      version: 1,
                      listType: "bullet",
                      start: 1,
                      tag: "ul",
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "Metasports also has a pre-existing grant from ",
                          type: "text",
                          version: 1,
                        },
                        {
                          detail: 0,
                          format: 1,
                          mode: "normal",
                          style: "",
                          text: "Community Gaming",
                          type: "text",
                          version: 1,
                        },
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: " that will be utilized alongside the requested budget. Winners will receive half their winnings in fiat courtesy of Community Gaming’s grant, while the other half will be from the requested prize pool budget to be disbursed on the chain, in a bid to soft-onboard winners on-chain.",
                          type: "text",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "paragraph",
                      version: 1,
                      textFormat: 0,
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "To outline this better:",
                          type: "text",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "paragraph",
                      version: 1,
                      textFormat: 0,
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 1,
                          mode: "normal",
                          style: "",
                          text: "Of the budget, $125 USDC will be awarded each week over the course of two (2) months, for a total of $1,000 awarded across 8 tournaments over 8 weeks.",
                          type: "text",
                          version: 1,
                        },
                        {
                          detail: 0,
                          format: 1,
                          mode: "normal",
                          style: "",
                          text: "Of the Community Gaming grant, $100 USD will be awarded in fiat each week over the course of two (2) months, for a total of $800 awarded across 8 tournaments over 8 weeks.",
                          type: "text",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "list",
                      version: 1,
                      listType: "bullet",
                      start: 1,
                      tag: "ul",
                    },
                    {
                      children: [
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: "With 8 tournaments and 64 players each, this would mean 512 players ",
                          type: "text",
                          version: 1,
                        },
                        {
                          detail: 0,
                          format: 1,
                          mode: "normal",
                          style: "",
                          text: "minimum",
                          type: "text",
                          version: 1,
                        },
                        {
                          detail: 0,
                          format: 0,
                          mode: "normal",
                          style: "",
                          text: " that will be engaged through this campaign to be soft-onboarded on-chain, though we are expecting greater than that in registrations from experience.",
                          type: "text",
                          version: 1,
                        },
                        {
                          detail: 0,
                          format: 1,
                          mode: "normal",
                          style: "",
                          text: " ",
                          type: "text",
                          version: 1,
                        },
                      ],
                      direction: "ltr",
                      format: "",
                      indent: 0,
                      type: "paragraph",
                      version: 1,
                      textFormat: 0,
                    },
                  ],
                  direction: "ltr",
                  format: "",
                  indent: 0,
                  type: "root",
                  version: 1,
                },
              }),
            }}
          >
            <ToolbarPlugin />
            <RichTextPlugin
              contentEditable={
                <ContentEditable
                  className="outline-none pt-2 px-1 flex flex-col gap-4 "
                  // @ts-ignore
                  spellcheck="false"
                />
              }
              placeholder={
                <div className="text-lightgrey pointer-events-none absolute top-12 pl-1">
                  Enter proposal here
                </div>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <AutoFocusPlugin />
            <OnChangePlugin
              onChange={(state, editor) => {
                state.read(() => {
                  setEditorState(JSON.stringify(editor.toJSON()));
                  setParsedMarkdown(
                    $generateHtmlFromNodes(editor).replaceAll(/<[^>]*>/g, "")
                  );
                });
              }}
            />
            <LinkPlugin />
            <ListPlugin />
            <ImagePlugin />
          </LexicalComposer>
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

function LimitMeter(props: {
  type: "character" | "word";
  value: number;
  min: number;
  max: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <small
        className={twMerge(
          props.value < props.min
            ? props.value / props.min > 0.5
              ? "text-yellow"
              : "text-red"
            : props.value < props.max
              ? props.value / props.max < 0.5
                ? "text-green"
                : props.value / props.max < 0.75
                  ? "text-yellow"
                  : "text-red"
              : "text-red"
        )}
      >
        {props.value < props.min
          ? `You need at least ${props.min - props.value} more ${props.type}${
              props.min - props.value === 1 ? "" : "s"
            }`
          : props.value >= props.max
            ? `${props.type[0].toUpperCase()}${props.type.substring(
                1
              )} limit reached`
            : props.max === Infinity
              ? `${props.type[0].toUpperCase()}${props.type.substring(
                  1
                )} requirements met`
              : `${props.max - props.value} ${props.type}${
                  props.max - props.value === 1 ? "" : "s"
                } remain${props.max - props.value === 1 ? "s" : ""}`}
      </small>
      {props.value < props.max ? (
        <svg width={16} height={16}>
          <circle
            className="fill-none stroke-grey stroke-[2px]"
            cx="8"
            cy="8"
            r="6"
          />
          <circle
            className={twMerge(
              "fill-none stroke-[2px]",
              props.value < props.min
                ? props.value / props.min > 0.5
                  ? "stroke-yellow"
                  : "stroke-red"
                : props.value < props.max
                  ? props.value / props.max < 0.5
                    ? "stroke-green"
                    : props.value / props.max < 0.75
                      ? "stroke-yellow"
                      : "stroke-red"
                  : ""
            )}
            cx="8"
            cy="8"
            r="6"
            strokeDasharray={2 * Math.PI * 6}
            strokeDashoffset={
              2 *
              Math.PI *
              6 *
              (props.value / (props.value < props.min ? props.min : props.max))
            }
          />
        </svg>
      ) : (
        ""
      )}
    </div>
  );
}

const LowPriority = 1;

function Divider() {
  return <div className="divider" />;
}
function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, newEditor) => {
          $updateToolbar();
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority
      )
    );
  }, [editor, $updateToolbar]);

  return (
    <div
      className="bg-grey rounded-lg h-9 overflow-hidden w-full flex"
      ref={toolbarRef}
    >
      <button
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        className="h-full aspect-square flex items-center justify-center group cursor-pointer"
        aria-label="Undo"
      >
        <ArrowCounterClockwise
          className="w-4 h-4 text-lightgrey group-hover:text-white transition-colors"
          weight="bold"
        />
      </button>
      <button
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        className="h-full aspect-square flex items-center justify-center group cursor-pointer"
        aria-label="Redo"
      >
        <ArrowClockwise
          className="w-4 h-4 text-lightgrey group-hover:text-white transition-colors"
          weight="bold"
        />
      </button>
      <Divider />
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
        className={twMerge(
          "h-full aspect-square flex items-center justify-center group cursor-pointer",
          isBold && "bg-lightgrey"
        )}
        aria-label="Format Bold"
      >
        <TextB
          className={twMerge(
            "w-4 h-4 text-lightgrey group-hover:text-white transition-colors",
            isBold ? "text-white" : "text-lightgrey"
          )}
          weight="bold"
        />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
        className={twMerge(
          "h-full aspect-square flex items-center justify-center group cursor-pointer",
          isItalic && "bg-lightgrey"
        )}
        aria-label="Format Italics"
      >
        <TextItalic
          className={twMerge(
            "w-4 h-4 text-lightgrey group-hover:text-white transition-colors",
            isItalic ? "text-white" : "text-lightgrey"
          )}
          weight="bold"
        />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        }}
        className={twMerge(
          "h-full aspect-square flex items-center justify-center group cursor-pointer",
          isUnderline && "bg-lightgrey"
        )}
        aria-label="Format Underline"
      >
        <TextUnderline
          className={twMerge(
            "w-4 h-4 text-lightgrey group-hover:text-white transition-colors",
            isUnderline ? "text-white" : "text-lightgrey"
          )}
          weight="bold"
        />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
        }}
        className={twMerge(
          "h-full aspect-square flex items-center justify-center group cursor-pointer",
          isStrikethrough && "bg-lightgrey"
        )}
        aria-label="Format Strikethrough"
      >
        <TextStrikethrough
          className={twMerge(
            "w-4 h-4 text-lightgrey group-hover:text-white transition-colors",
            isStrikethrough ? "text-white" : "text-lightgrey"
          )}
          weight="bold"
        />
      </button>
      <Divider />
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
        }}
        className="toolbar-item spaced"
        aria-label="Left Align"
      >
        <i className="format left-align" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
        }}
        className="toolbar-item spaced"
        aria-label="Center Align"
      >
        <i className="format center-align" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
        }}
        className="toolbar-item spaced"
        aria-label="Right Align"
      >
        <i className="format right-align" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
        }}
        className="toolbar-item"
        aria-label="Justify Align"
      >
        <i className="format justify-align" />
      </button>{" "}
    </div>
  );
}
