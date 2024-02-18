import Vercel from "@/vercel.json";
import NextLink from "next/link";

export default function Link(
  props: {
    href: string;
    scroll?: boolean;
    newTab?: boolean;
    passHref?: boolean;
    legacyBehavior?: boolean;
  } & React.AnchorHTMLAttributes<HTMLAnchorElement>
) {
  const newTab = props.newTab ?? isNewTab(props.href);

  const Component = newTab ? "a" : NextLink;

  return (
    <Component
      {...props}
      target={newTab ? "_blank" : ""}
      rel={newTab ? "noopener noreferrer" : ""}
      draggable={false}
      passHref={props.passHref || undefined}
      legacyBehavior={props.legacyBehavior || undefined}
      style={{
        userSelect: "none",
        ...props.style,
      }}
    >
      {props.children}
    </Component>
  );
}

function isNewTab(url: string) {
  // Check for Vercel HTTP redirects
  for (const redirect of Vercel.redirects) {
    if (redirect.source === url) {
      return true;
    }
  }

  // Check for protocol
  if (url.includes("://")) {
    return true;
  }

  return false;
}
