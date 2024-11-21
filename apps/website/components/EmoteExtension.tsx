import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { DecorationSet, Decoration } from "@tiptap/pm/view";

export default function EmoteExtension(props: {
	name: string;
	pattern: RegExp;
}) {
	return Extension.create({
		name: props.name,
		addProseMirrorPlugins() {
			return [
				new Plugin({
					key: new PluginKey(props.name),
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
								currentMatch = props.pattern.exec(text);
								while (currentMatch !== null) {
									matches.push(currentMatch);
									currentMatch = props.pattern.exec(text);
								}

								// Process matches
								for (const match of matches) {
									const start = pos + match.index;
									const end = start + match[0].length;

									decorations.push(
										Decoration.widget(start, () => {
											const img = document.createElement("img");
											img.src =
												"https://ipfs.nouns.gg/ipfs/QmQQGnQEarwqHc2VQeQhEtKwnyjXSBqpAyZKhjhhSusY4i";
											img.title = ":noggles:";
											img.className =
												"relative z-10 inline-flex mx-1 h-[1em] pointer-events-auto";
											return img;
										}),
									);

									decorations.push(
										Decoration.inline(start, end, {
											class: "hidden",
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
}
