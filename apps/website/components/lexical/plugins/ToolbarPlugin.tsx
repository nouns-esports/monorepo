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
  ElementNode,
  type RangeSelection,
  TextNode,
  $createParagraphNode,
  $isParagraphNode,
  $createTextNode,
} from "lexical";
import { $isAtNodeEnd, $setBlocksType } from "@lexical/selection";
import {
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import {
  $isLinkNode,
  TOGGLE_LINK_COMMAND,
  $createLinkNode,
} from "@lexical/link";
import {
  ArrowCounterClockwise,
  ArrowClockwise,
  TextB,
  TextItalic,
  TextUnderline,
  Image,
  Link,
  ListBullets,
  ListNumbers,
} from "phosphor-react-sc";
import { useRef, useState, useCallback, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { mergeRegister } from "@lexical/utils";
import { INSERT_IMAGE_COMMAND } from "./ImagePlugin";
import toast from "react-hot-toast";
import Button from "@/components/Button";
import { $createHeadingNode, $isHeadingNode } from "@lexical/rich-text";
import { pinImage } from "@/server/actions/pinImage";

const LowPriority = 1;

function Divider() {
  return (
    <div className="w-[1px] h-[calc(100%_-_16px)] my-2 bg-grey-500 mx-2" />
  );
}

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  // const [isLink, setIsLink] = useState(false);

  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkName, setLinkName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));

      const anchorNode = selection.anchor.getNode();
      const blockNode = anchorNode.getTopLevelElementOrThrow();

      if ($isHeadingNode(blockNode)) {
        const tag = blockNode.getTag();

        if (tag === "h1" || tag === "h2" || tag === "h3") {
          setBlockType(tag);
        }
      }

      if ($isParagraphNode(blockNode)) {
        setBlockType("paragraph");
      }

      if ($isListNode(blockNode)) {
        if (blockNode.__listType === "number") {
          setBlockType("number");
        }
        if (blockNode.__listType === "bullet") {
          setBlockType("bullet");
        }
      }

      // Update links
      // const node = getSelectedNode(selection);
      // const parent = node.getParent();
      // if ($isLinkNode(parent) || $isLinkNode(node)) {
      //   setIsLink(true);
      // } else {
      //   setIsLink(false);
      // }
    }
  }, []);

  const blockTypeToBlockName = {
    bullet: "Bullet List",
    number: "Number List",
    paragraph: "Normal",
    h1: "Heading 1",
    h2: "Heading 2",
    h3: "Heading 3",
  };

  const [blockType, setBlockType] =
    useState<keyof typeof blockTypeToBlockName>("paragraph");

  const formatList = (listType: "bullet" | "number") => {
    if (listType === "number" && blockType !== "number") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else if (listType === "bullet" && blockType !== "bullet") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  function insertLink(url: string) {
    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        const anchorNode = selection.anchor.getNode();

        // Create the link node with the specified URL
        const linkNode = $createLinkNode(url);

        // Create a text node with placeholder text for the link
        const textNode = $createTextNode("Link");

        // Append the text node to the link node
        linkNode.append(textNode);

        // Insert the link node at the anchor point
        anchorNode.insertAfter(linkNode);
      }
    });
  }

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

  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };

  const formatHeading = (type: "h1" | "h2" | "h3") => {
    if (blockType !== type) {
      editor.update(() => {
        const selection = $getSelection();
        $setBlocksType(selection, () => $createHeadingNode(type));
      });
    }
  };

  return (
    <div
      className="bg-grey-600 rounded-lg h-9 overflow-hidden w-full flex px-1"
      ref={toolbarRef}
    >
      <button
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        className="h-full aspect-square flex items-center justify-center group cursor-pointer max-sm:hidden"
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
        className="h-full aspect-square flex items-center justify-center group cursor-pointer max-sm:hidden"
        aria-label="Redo"
      >
        <ArrowClockwise
          className="w-4 h-4 text-grey-400 group-hover:text-white transition-colors"
          weight="bold"
        />
      </button>
      <Divider />
      <select
        value={blockType}
        onChange={(e) => {
          setBlockType(e.target.value as keyof typeof blockTypeToBlockName);
          console.log(e.target.value);
          if (["h1", "h2", "h3"].includes(e.target.value)) {
            return formatHeading(e.target.value as "h1" | "h2" | "h3");
          }

          if (["bullet", "number"].includes(e.target.value)) {
            return formatList(e.target.value as "bullet" | "number");
          }

          formatParagraph();
        }}
        className="bg-transparent outline-none text-sm font-semibold"
      >
        <option value="paragraph">Normal</option>
        <option value="h1">Heading 1</option>
        <option value="h2">Heading 2</option>
        <option value="h3">Heading 3</option>
        <option value="bullet">Bullet List</option>
        <option value="number">Number List</option>
      </select>
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
      <Divider />
      <button
        onClick={() => setIsLinkModalOpen(true)}
        className="h-full aspect-square flex items-center justify-center group cursor-pointer"
      >
        <Link
          className={
            "w-4 h-4 text-grey-400 group-hover:text-white transition-colors"
          }
          weight="bold"
        />
        <div
          onClick={() => setIsLinkModalOpen(false)}
          className={twMerge(
            "fixed top-0 flex items-center justify-center w-screen h-screen bg-black/40 transition-opacity duration-150",
            isLinkModalOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="bg-grey-800 rounded-xl p-4 flex flex-col gap-4 border border-grey-600 w-80"
          >
            <div className="flex flex-col items-start gap-2">
              <label className="text-white font-semibold">Name</label>
              <input
                type="text"
                placeholder="Enter a name..."
                value={linkName}
                onChange={(event) => setLinkName(event.target.value)}
                className="bg-grey-600 rounded-xl px-4 py-2 text-white placeholder:text-white outline-none w-full"
              />
            </div>

            <div className="flex flex-col items-start gap-2">
              <label className="text-white font-semibold">Link</label>
              <input
                type="text"
                placeholder="Enter a link..."
                value={linkUrl}
                onChange={(event) => setLinkUrl(event.target.value)}
                className="bg-grey-600 rounded-xl px-4 py-2 text-white placeholder:text-white outline-none w-full"
              />
            </div>
            <div className="flex gap-4">
              <Button
                animate="bg"
                onClick={() => {
                  insertLink(linkUrl);

                  setIsLinkModalOpen(false);
                  setLinkName("");
                  setLinkUrl("");
                }}
              >
                Create Link
              </Button>
              <button
                className="text-red"
                onClick={() => {
                  setIsLinkModalOpen(false);
                  setLinkName("");
                  setLinkUrl("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </button>
      <label className="h-full aspect-square flex items-center justify-center group cursor-pointer">
        <input
          type="file"
          accept="image/*"
          onChange={async (event) => {
            const files = event.target.files;

            if (files && files.length > 0) {
              const file = files[0];

              // 25 MB in bytes
              if (file.size > 25 * 1024 * 1024) {
                toast.error("Image size should be less than 25 MB");
                return;
              }

              const formData = new FormData();
              formData.append("file", file);

              try {
                const hash = await pinImage(formData);

                editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                  altText: "",
                  src: `https://ipfs.nouns.gg/ipfs/${hash}`,
                });
              } catch (error) {
                toast.error("Could not upload image");
                console.log(error);
              }

              event.target.value = "";
            }
          }}
          style={{ display: "none" }}
        />
        <Image
          className="w-4 h-4 text-grey-400 group-hover:text-white transition-colors"
          weight="bold"
        />
      </label>
    </div>
  );
}
