import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  SELECTION_CHANGE_COMMAND,
  CAN_UNDO_COMMAND,
  CAN_REDO_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
} from "lexical";
import {
  ArrowCounterClockwise,
  ArrowClockwise,
  TextB,
  TextItalic,
  TextUnderline,
  TextStrikethrough,
} from "phosphor-react-sc";
import { useRef, useState, useCallback, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { mergeRegister } from "@lexical/utils";

const LowPriority = 1;

function Divider() {
  return <div className="divider" />;
}
export default function ToolbarPlugin() {
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
      className="bg-grey-600 rounded-lg h-9 overflow-hidden w-full flex"
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
          className="w-4 h-4 text-grey-400 group-hover:text-white transition-colors"
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
          className="w-4 h-4 text-grey-400 group-hover:text-white transition-colors"
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
          isBold && "bg-grey-400"
        )}
        aria-label="Format Bold"
      >
        <TextB
          className={twMerge(
            "w-4 h-4 text-grey-400 group-hover:text-white transition-colors",
            isBold ? "text-white" : "text-grey-400"
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
          isItalic && "bg-grey-400"
        )}
        aria-label="Format Italics"
      >
        <TextItalic
          className={twMerge(
            "w-4 h-4 text-grey-400 group-hover:text-white transition-colors",
            isItalic ? "text-white" : "text-grey-400"
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
          isUnderline && "bg-grey-400"
        )}
        aria-label="Format Underline"
      >
        <TextUnderline
          className={twMerge(
            "w-4 h-4 text-grey-400 group-hover:text-white transition-colors",
            isUnderline ? "text-white" : "text-grey-400"
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
          isStrikethrough && "bg-grey-400"
        )}
        aria-label="Format Strikethrough"
      >
        <TextStrikethrough
          className={twMerge(
            "w-4 h-4 text-grey-400 group-hover:text-white transition-colors",
            isStrikethrough ? "text-white" : "text-grey-400"
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
