import { MDXRemote } from "next-mdx-remote/rsc";
import { twMerge } from "tailwind-merge";

export default function Markdown(props: { markdown: string; style?: boolean }) {
  return (
    <div
      className={twMerge(
        "flex flex-col gap-2 prose prose-p:text-lightgrey prose-p:my-0 prose-p:leading-snug prose-a:text-lightgrey",
        props.style &&
          "prose-headings:text-white prose-a:text-red prose-strong:text-white"
      )}
    >
      <MDXRemote source={props.markdown.replaceAll("<br>", "")} />
    </div>
  );
}
