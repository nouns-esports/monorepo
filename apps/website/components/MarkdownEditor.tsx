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
export default function MarkdownEditor(props: {
  round: string;
  markdown?: string;
}) {
  const [title, setTitle] = useState("");

  const [markdown, setMarkdown] = useState(
    props.markdown ?? "Enter your proposal here"
  );

  const parsedMarkdown = useMemo(() => {
    return markdown.replaceAll(/<[^>]*>/g, "");
  }, [markdown]);

  const router = useRouter();

  const { execute, result, status } = useAction(createProposal, {
    onSuccess: () => {
      router.push(`/rounds/${props.round}`);
    },
    onError: (error) => {
      console.error(error);
      toast.error("An error occurred");
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
        <div className="relative bg-darkgrey border border-grey rounded-xl overflow-hidden p-2 prose max-w-none prose-strong:text-white prose-a:text-red prose-p:text-lightgrey prose-p:leading-snug prose-p:my-0 prose-headings:text-white prose-">
          <LexicalComposer
            initialConfig={{
              namespace: "MyEditor",
              theme: {},
              onError: (error) => {
                console.error(error);
              },
            }}
          >
            <ToolbarPlugin />
            <RichTextPlugin
              contentEditable={
                <ContentEditable className="outline-none pt-2 px-1" />
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
                  setMarkdown($generateHtmlFromNodes(editor));
                });
              }}
            />
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
              description: markdown,
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
