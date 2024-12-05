import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { DecorationSet, Decoration } from "@tiptap/pm/view";

export default function RegexExtension(props: {
	name: string;
	pattern: RegExp;
	href: (value: string) => string;
	render?: (value: string) => string;
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
									const value = match[0];

									decorations.push(
										Decoration.inline(
											start,
											end,
											{
												nodeName: "a",
												class:
													"relative z-10 text-red cursor-pointer hover:opacity-80 transition-opacity pointer-events-auto",
												href: props.href(value),
												"data-display-text": props.render
													? props.render(value)
													: value,
											},
											{
												innerHTML: props.render ? props.render(value) : value,
											},
										),
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
