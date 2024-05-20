import type { LexicalEditor, NodeKey } from "lexical";

export default function ImageComponent({
  src,
  altText,
  // width,
  // height,
  // maxWidth,
}: {
  altText: string;
  // caption: LexicalEditor;
  // height: "inherit" | number;
  // maxWidth: number;
  nodeKey: NodeKey;
  resizable: boolean;
  // showCaption: boolean;
  src: string;
  // width: "inherit" | number;
  // captionsEnabled: boolean;
}): JSX.Element {
  return (
    <img
      src={src}
      alt={altText}
      // style={{
      //   height,
      //   maxWidth,
      //   width,
      // }}
    />
  );
}
