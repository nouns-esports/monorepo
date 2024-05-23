import NextLink from "next/link";
import { twMerge } from "tailwind-merge";

export default function Link(
  props: React.ComponentProps<typeof NextLink> & { newTab?: boolean }
) {
  const newTab = props.newTab;

  return (
    <NextLink
      {...props}
      target={newTab ? "_blank" : ""}
      rel={newTab ? "noopener noreferrer" : ""}
      draggable={false}
      scroll={props.scroll}
      className={twMerge("select-none", props.className)}
    >
      {props.children}
    </NextLink>
  );
}
