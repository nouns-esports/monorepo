import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { DecorationSet, Decoration } from "@tiptap/pm/view";

export default Extension.create({
	name: "mention",

	addProseMirrorPlugins() {
		const mentionRegex = /@(\w+)/g;

		return [
			new Plugin({
				key: new PluginKey("mentionExtension"),
				props: {
					decorations: (state) => {
						const decorations: Decoration[] = [];
						const doc = state.doc;

						doc.descendants((node, pos) => {
							if (!node.isText) return;

							const text = node.text as string;
							const matches: RegExpExecArray[] = [];
							let currentMatch: RegExpExecArray | null = null;
							// Collect all matches first
							currentMatch = mentionRegex.exec(text);
							while (currentMatch !== null) {
								matches.push(currentMatch);
								currentMatch = mentionRegex.exec(text);
							}

							// Process matches
							for (const match of matches) {
								const start = pos + match.index;
								const end = start + match[0].length;
								const username = match[1];

								decorations.push(
									Decoration.inline(start, end, {
										nodeName: "a",
										class:
											"text-red cursor-pointer hover:opacity-80 transition-opacity",
										href: `/users/${username}`,
									}),
								);
							}
						});

						return DecorationSet.create(doc, decorations);
					},
				},
			}),
		];
	},
});
