import Link from "next/link";
import { SelectLanguage } from "./SelectLanguage";
import Text from "@/components/Text";
import ConnectButton from "@/components/ConnectButton";
import Logo from "./Logo";
import Banner from "./Banner";
import Menu from "./Menu";
import fetchEvents from "@/utils/fetchEvents";

export default async function Header() {
  const events = await fetchEvents();

  return (
    <>
      <Banner events={events} />
      <header className="sticky top-0 w-full z-20">
        <div className="absolute top-0 w-full flex items-center justify-between p-8">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              draggable={false}
              className="flex gap-4 group items-center cursor-pointer select-none"
            >
              <Logo className="group-hover:rotate-[14deg] w-12 transition-transform duration-150" />
              <p className="text-white font-luckiest-guy text-4xl select-none">
                Nouns
              </p>
            </Link>
            <div className="max-[500px]:hidden">
              <SelectLanguage />
            </div>
          </div>
          <nav className="flex items-center gap-8 cursor-pointer">
            <div className="flex gap-6 max-lg:hidden">
              <HeaderLink href="/getfunded">
                <Text en="Get Funded" pt="Seja financiado" />
              </HeaderLink>
              <HeaderLink href="/collect">
                <Text en="Collect" pt="Coletar" />
              </HeaderLink>
              <HeaderLink href="/shop">
                <Text en="Shop" pt="Loja" />
              </HeaderLink>
            </div>
            <a
              href="https://pog.nouns.gg"
              className="flex gap-2 items-center group max-[750px]:hidden"
            >
              <img
                src="/logo-white.svg"
                alt="POG logo"
                className="w-6 h-6 group-hover:rotate-[14deg] transition-transform duration-150"
              />
              <p className="text-white font-luckiest-guy text-xl">POG</p>
            </a>
            <div className="max-[700px]:hidden">
              <ConnectButton />
            </div>
            <Menu />
          </nav>
        </div>
      </header>
    </>
  );
}
function HeaderLink(props: { href: string; children: React.ReactNode }) {
  const newTab =
    props.href.includes("://") || ["/shop", "/getfunded"].includes(props.href);

  return (
    <Link
      href={props.href}
      draggable={false}
      target={newTab ? "_blank" : ""}
      rel={newTab ? "noopener noreferrer" : ""}
      className="hover:text-white/60 text-white transition-colors select-none text-lg font-medium"
    >
      {props.children}
    </Link>
  );
}
