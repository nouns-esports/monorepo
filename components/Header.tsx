import Link from "next/link";
import { ArrowRight } from "phosphor-react-sc";
import { SelectLanguage } from "./SelectLanguage";
import Text from "@/components/Text";
import ConnectButton from "@/components/ConnectButton";
import Logo from "./Logo";
import Banner from "./Banner";

export default function Header() {
  return (
    <>
      <Banner />
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
            <SelectLanguage />
          </div>
          <nav className="flex items-center gap-8 cursor-pointer">
            <div className="flex gap-6 max-lg:hidden">
              <HeaderLink href="/getfunded">
                <Text en="Get Funded" pt="Seja financiado" />
              </HeaderLink>
              <HeaderLink href="/about">
                <Text en="About" pt="Sobre" />
              </HeaderLink>
              <HeaderLink href="/shop">
                <Text en="Shop" pt="Comprar" />
              </HeaderLink>
            </div>
            <a
              href="https://pog.nouns.gg"
              className="flex gap-2 items-center group max-[700px]:hidden"
            >
              <img
                src="/logo-white.svg"
                alt="POG logo"
                className="w-6 h-6 group-hover:rotate-[14deg] transition-transform duration-150"
              />
              <p className="text-white font-luckiest-guy text-xl">POG</p>
            </a>
            <div className="max-[700px]:hidden">
              {/* <Button href="https://nouns.wtf">
                <Text en="Join us" pt="Junte-se a nós" />
              </Button> */}
              <ConnectButton />
            </div>
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
