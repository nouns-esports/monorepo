import NextLink from "next/link";
import { twMerge } from "tailwind-merge";

export default function Link(
  props: React.ComponentProps<typeof NextLink> & { newTab?: boolean }
) {
  return (
    <NextLink
      {...props}
      target={props.newTab ? "_blank" : undefined}
      rel={props.newTab ? "noopener noreferrer" : undefined}
      draggable={false}
      scroll={props.scroll}
      className={twMerge("select-none", props.className)}
    >
      {props.children}
    </NextLink>
  );
}
