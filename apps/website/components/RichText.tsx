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

export default function RichText(props: {
	children: string;
	readOnly?: boolean;
}) {
	return (
		<MatchTicker>
			<MatchHandle>
				<MatchChannel>
					<MatchLink>
						<MatchEmote>{props.children}</MatchEmote>
					</MatchLink>
				</MatchChannel>
			</MatchHandle>
		</MatchTicker>
	);
}

function MatchTicker(props: { children: React.ReactNode; readonly?: boolean }) {
	return (
		<LinkIt
			component={(match, key) => {
				const token = tokens[match.replace("$", "").toLowerCase()];

				return (
					<Link
						href={token ? `/matcha/tokens/base/${token}` : "/matcha"}
						key={key}
						className="relative z-10 text-red hover:opacity-70 transition-opacity"
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

function MatchLink(props: { children: React.ReactNode; readonly?: boolean }) {
	return (
		<LinkIt
			component={(match, key) => {
				const url = new URL(
					match.startsWith("http") ? match : `https://${match}`,
				);

				return (
					<Link
						key={key}
						href={url.hostname === "nouns.gg" ? url.pathname : url.href}
						newTab={url.hostname !== "nouns.gg"}
						className="relative z-10 text-red hover:opacity-70 transition-opacity"
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

function MatchHandle(props: { children: React.ReactNode; readonly?: boolean }) {
	return (
		<LinkIt
			component={(match, key) => {
				return (
					<Link
						key={key}
						href={`/users/${match.replace(" @", "")}`}
						className="relative z-10 text-red hover:opacity-70 transition-opacity"
					>
						{match in vanityHandles ? vanityHandles[match] : match}
					</Link>
				);
			}}
			regex={/(?:^@|[\s]@)[\w\.-]+/g}
		>
			{props.children}
		</LinkIt>
	);
}

function MatchChannel(props: {
	children: React.ReactNode;
	readonly?: boolean;
}) {
	return (
		<LinkIt
			component={(match, key) => {
				return (
					<Link
						key={key}
						href={`/users/${match.replace(" /", "")}`}
						className="relative z-10 text-red hover:opacity-70 transition-opacity"
					>
						{match}
					</Link>
				);
			}}
			regex={/\s\/[\w-]+/g}
		>
			{props.children}
		</LinkIt>
	);
}

function MatchEmote(props: { children: React.ReactNode; readonly?: boolean }) {
	return (
		<LinkIt
			component={(match, key) => {
				return (
					<img
						key={key}
						src="https://ipfs.nouns.gg/ipfs/QmQQGnQEarwqHc2VQeQhEtKwnyjXSBqpAyZKhjhhSusY4i"
						className="relative z-10 inline-flex mx-1 h-[1em]"
						title=":noggles:"
					/>
				);
			}}
			regex={/⌐◨-◨/g}
		>
			{props.children}
		</LinkIt>
	);
}
