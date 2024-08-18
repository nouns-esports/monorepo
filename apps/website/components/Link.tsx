import NextLink from "next/link";
import { twMerge } from "tailwind-merge";

export default function Link({
  newTab,
  ...props
}: React.ComponentProps<typeof NextLink> & { newTab?: boolean }) {
  return (
    <NextLink
      {...props}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      draggable={false}
      scroll={props.scroll ? true : undefined}
      className={twMerge("select-none", props.className)}
    >
      {props.children}
    </NextLink>
  );
}
