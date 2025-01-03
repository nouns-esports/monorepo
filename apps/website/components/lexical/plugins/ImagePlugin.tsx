import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $wrapNodeInElement, mergeRegister } from "@lexical/utils";
import {
	$createParagraphNode,
	$insertNodes,
	$isRootOrShadowRoot,
	COMMAND_PRIORITY_EDITOR,
	createCommand,
	type LexicalCommand,
} from "lexical";
import { useEffect, type JSX } from "react";

import {
	$createImageNode,
	ImageNode,
	type ImagePayload,
} from "../nodes/ImageNode";

export type InsertImagePayload = Readonly<ImagePayload>;

export const INSERT_IMAGE_COMMAND: LexicalCommand<InsertImagePayload> =
	createCommand("INSERT_IMAGE_COMMAND");

export default function ImagePlugin({
	captionsEnabled,
}: {
	captionsEnabled?: boolean;
}): JSX.Element | null {
	const [editor] = useLexicalComposerContext();

	useEffect(() => {
		if (!editor.hasNodes([ImageNode])) {
			throw new Error("ImagesPlugin: ImageNode not registered on editor");
		}

		return mergeRegister(
			editor.registerCommand<InsertImagePayload>(
				INSERT_IMAGE_COMMAND,
				(payload) => {
					const imageNode = $createImageNode(payload);
					$insertNodes([imageNode]);
					if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
						$wrapNodeInElement(imageNode, $createParagraphNode).selectEnd();
					}

					return true;
				},
				COMMAND_PRIORITY_EDITOR,
			),
		);
	}, [captionsEnabled, editor]);

	return null;
}
