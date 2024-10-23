import { LinkIt } from "react-linkify-it";
import Link from "./Link";

const tokens: Record<string, string> = {
  nouns: "0x0a93a7be7e7e426fc046e204c44d6b03a302b631",
  higher: "",
  degen: "",
  eth: "",
  usdc: "",
};

const vanityUrls: Record<string, string> = {
  "/rounds": "Rounds",
  "/quests": "Quests",
};

const vanityHandles: Record<string, string> = {
  "@matchaxyz": "Matcha",
  "@esports": "Nouns Esports",
};

export default function RichText(props: { children: string }) {
  return (
    <MatchTicker>
      <MatchLink>
        <MatchHandle>{props.children}</MatchHandle>
      </MatchLink>
    </MatchTicker>
  );
}

function MatchTicker(props: { children: React.ReactNode }) {
  return (
    <LinkIt
      component={(match, key) => {
        const token = tokens[match.replace("$", "").toLowerCase()];
        return (
          <Link
            href={token ? `/matcha/tokens/base/${token}` : "/matcha"}
            key={key}
            newTab
            className="text-red hover:opacity-70 transition-opacity"
          >
            {match}
          </Link>
        );
      }}
      regex={/\$[A-Za-z]+/}
    >
      {props.children}
    </LinkIt>
  );
}

function MatchLink(props: { children: React.ReactNode }) {
  return (
    <LinkIt
      component={(match, key) => {
        const url = new URL(
          match.startsWith("http") ? match : `https://${match}`
        );

        return (
          <Link
            href={url.hostname === "nouns.gg" ? url.pathname : url.href}
            key={key}
            newTab={url.hostname !== "nouns.gg"}
            className="text-red hover:opacity-70 transition-opacity"
          >
            {url.pathname in vanityUrls ? vanityUrls[url.pathname] : match}
          </Link>
        );
      }}
      regex={
        /\b(?:https?:\/\/(?:[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*))|(?:www\.)?(?:[-a-zA-Z@:%._\+~#=]{1,256}\.[a-zA-Z()]{1,6}|(?!.*\d)[-a-zA-Z@:%._\+~#=]{1,256}\.[a-zA-Z]{2,6}))\b(?:[-a-zA-Z()@:%_\+.~#?&//=]*)/
      }
    >
      {props.children}
    </LinkIt>
  );
}

function MatchHandle(props: { children: React.ReactNode }) {
  return (
    <LinkIt
      component={(match, key) => {
        return (
          <Link
            href={`/users/${match.replace("@", "")}`}
            key={key}
            className="text-red hover:opacity-70 transition-opacity"
          >
            {match in vanityHandles ? vanityHandles[match] : match}
          </Link>
        );
      }}
      regex={/@[\w-]+/g}
    >
      {props.children}
    </LinkIt>
  );
}
