import Link from "@/components/Link";
import {
  TwitterLogo,
  YoutubeLogo,
  DiscordLogo,
  InstagramLogo,
} from "phosphor-react-sc";
import ANounsThing from "@/components/ANounsThing";

export default async function Footer() {
  return (
    <footer className="flex justify-center w-full mt-8 relative z-10">
      <div className="flex max-w-[1920px] w-full max-lg:flex-col gap-16 justify-between items-center py-8 px-16">
        <div className="flex flex-col gap-8 max-lg:items-center">
          <div className="flex flex-col gap-4">
            <Link
              href=""
              className="flex gap-3 group max-lg:justify-center items-center cursor-pointer select-none"
            >
              <img
                src="/logo/logo.svg"
                draggable={false}
                className="group-hover:rotate-[14deg] w-10 transition-transform duration-150 select-none"
              />
              <p className="text-white font-luckiest-guy text-3xl select-none">
                Nouns
              </p>
            </Link>
            <p className="w-64 max-lg:text-center max-xl:w-48 max-lg:w-64">
              Leading the revolution in community driven esports
            </p>
          </div>
          <ANounsThing />
        </div>
        <div className="flex gap-40 max-2xl:gap-20 max-[500px]:flex-col max-[500px]:gap-8">
          <Group title="Esports">
            <Item href="/about">Our Story</Item>
            <Item href="/partners">Partners</Item>
            <Item href="/rosters">Rosters</Item>
          </Group>
          <Group title="Get Involved">
            <Item href="/rounds">Rounds</Item>
            <Item href="/discord">Discord</Item>
            <Item href="/creations">Creator Spotlight</Item>
          </Group>
          <Group title="Resources">
            <Item
              href="https://app.termly.io/policy-viewer/policy.html?policyUUID=0d491517-c891-4103-8c31-d6246f954ae6"
              newTab
            >
              Privacy Policy
            </Item>
            <Item
              href="https://app.termly.io/policy-viewer/policy.html?policyUUID=d9d85cf5-1c21-4874-901b-e83ad58f7320"
              newTab
            >
              Terms of Service
            </Item>
            <Item href="mailto:esports@nouns.gg" newTab>
              Contact
            </Item>
          </Group>
        </div>
        <div className="flex max-lg:flex-row max-[300px]:flex-col gap-4 items-center justify-center text-white">
          <div className="flex flex-col gap-4 max-lg:flex-row">
            <Link href="/discord">
              <DiscordLogo
                className="w-7 h-7 text-white hover:text-white/60 cursor-pointer transition-colors"
                weight="fill"
              />
            </Link>
            <Link href="/instagram">
              <InstagramLogo
                className="w-7 h-7 text-white hover:text-white/60 cursor-pointer transition-colors"
                weight="fill"
              />
            </Link>
            <Link href="/twitter">
              <TwitterLogo
                className="w-7 h-7 text-white hover:text-white/60 cursor-pointer transition-colors"
                weight="fill"
              />
            </Link>
            <Link href="/youtube">
              <YoutubeLogo
                className="w-7 h-7 text-white hover:text-white/60 cursor-pointer transition-colors"
                weight="fill"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Group(props: { title: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex flex-col max-[500px]:items-center gap-2">
      <h3 className="text-2xl font-bebas-neue text-white max-lg:text-center">
        {props.title}
      </h3>
      <div className="flex flex-col gap-2 max-[500px]:flex-row max-[500px]:gap-6">
        {props.children}
      </div>
    </div>
  );
}

function Item(props: {
  href: string;
  children: React.ReactNode;
  newTab?: boolean;
}) {
  return (
    <Link
      href={props.href}
      newTab={props.newTab}
      className="hover:text-white select-none transition-colors max-lg:text-center text-nowrap"
    >
      {props.children}
    </Link>
  );
}
