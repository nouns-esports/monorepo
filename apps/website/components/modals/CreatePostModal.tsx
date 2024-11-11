"use client";

import { X } from "lucide-react";
import { Modal, useModal } from "../Modal";
import type { AuthenticatedUser } from "@/server/queries/users";
import Button from "../Button";
import LimitMeter from "../LimitMeter";
import { useEditor, EditorContent, mergeAttributes } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Paragraph from "@tiptap/extension-paragraph";
// import Mention from "@tiptap/extension-mention";
import Mention from "../MentionExtension";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { useMemo } from "react";

export default function CreatePostModal(props: {
	user?: AuthenticatedUser;
}) {
	if (!props.user?.nexus) return;

	const { close } = useModal("create-post");

	const editor = useEditor({
		extensions: [
			Document,
			Text,
			Paragraph,
			Link.configure({
				protocols: ["http", "https"],
				HTMLAttributes: {
					class: "text-red cursor-pointer hover:opacity-80 transition-opacity",
					rel: "noopener noreferrer",
				},
			}),
			Mention,
			// Mention.configure({
			// 	HTMLAttributes: {
			// 		class: "text-red cursor-pointer hover:opacity-80 transition-opacity",
			// 	},
			// 	renderHTML({ options, node }) {
			// 		return [
			// 			"a",
			// 			mergeAttributes({ href: "/profile/1" }, options.HTMLAttributes),
			// 			"Test",
			// 		];
			// 	},
			// }),
			Image.configure({
				HTMLAttributes: {
					class: "rounded-md",
				},
			}),
		],
		immediatelyRender: false,
		editorProps: {
			attributes: {
				class: "outline-none text-white",
			},
		},
	});

	const text = useMemo(
		() => (editor ? editor.getText() : ""),
		[editor?.getText()],
	);

	return (
		<Modal
			id="create-post"
			queryParam={["post", "true"]}
			className="p-4 flex flex-col w-full max-w-[700px] gap-4"
		>
			<div className="flex justify-between items-center">
				<p className="text-white text-2xl font-bebas-neue leading-none">
					Create a post
				</p>
				<button
					onClick={close}
					className="p-1 rounded-full bg-grey-600 hover:bg-grey-500 transition-colors"
				>
					<X className="w-4 h-4 text-grey-200" />
				</button>
			</div>
			<div className="flex gap-3 w-full min-h-96 h-full bg-grey-800 rounded-xl pl-2 pr-4 py-4">
				<img
					src={props.user.nexus.image}
					className="ml-2 w-12 h-12 flex-shrink-0 flex rounded-full object-cover object-center"
				/>
				<div className="flex flex-col gap-1 flex-1 min-w-0 w-full">
					<div className="flex items-center gap-2">
						<h2 className="text-white text-nowrap">{props.user.nexus.name}</h2>
						{/* {props.community ? (
							<>
								<p className="text-grey-200 font-semibold text-sm">in</p>
								<Link
									href={`/chat?c=${props.community.id}`}
									className="flex relative z-10  items-center gap-1 bg-grey-600 hover:bg-grey-500 transition-colors rounded-full px-2 py-1"
								>
									<img
										src={props.community.image}
										className="w-4 h-4 rounded-full object-cover object-center"
									/>
									<h2 className="text-white text-nowrap text-sm">
										{props.community.name}
									</h2>
								</Link>
							</>
						) : null} */}
					</div>
					<div className="relative">
						{text.length < 1 ? (
							<p className="absolute top-0 left-0 text-grey-200">
								Start typing a new post here...
							</p>
						) : null}
						<EditorContent editor={editor} />
					</div>
				</div>
			</div>
			<div className="flex items-center justify-between">
				<div />
				<div className="flex items-center gap-4">
					<LimitMeter
						type="character"
						value={new TextEncoder().encode(text).length}
						min={0}
						max={320}
					/>
					<Button size="sm">Post</Button>
				</div>
			</div>
		</Modal>
	);
}
