import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import * as React from "react";

import type { InsertImagePayload } from "./ImagePlugin";
import { INSERT_IMAGE_COMMAND } from "./ImagePlugin";

export function FillURL() {
  const srcfile = prompt("Enter the URL of the image:", "");

  return srcfile as string;
}

export default function ToolbarPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const onClick = (payload: InsertImagePayload) => {
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
  };

  return (
    <div className="toolbar">
      <button
        onClick={() =>
          onClick({
            altText: "Pink flowers",
            src: "https://images.pexels.com/photos/5656637/pexels-photo-5656637.jpeg?auto=compress&cs=tinysrgb&w=200",
          })
        }
        className={"toolbar-item spaced "}
      >
        <span className="text">Insert Sample</span>
      </button>
      <button
        onClick={() =>
          onClick({
            altText: "URL image",
            src: FillURL(),
          })
        }
        className={"toolbar-item spaced "}
      >
        <span className="text">Insert from URL</span>
      </button>
    </div>
  );
}
