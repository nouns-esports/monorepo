import Link from "@/components/Link";
import Text from "@/components/Text";
import ConnectButton from "@/components/ConnectButton";
import Logo from "./Logo";
import Banner from "./Banner";
import Menu from "./Menu";
import { query } from "@/server/query";

export default async function Header(props: { locale: string }) {
  const events = await query.events();

  return (
    <>
      <Banner events={events} locale={props.locale} />
      <header className="sticky top-0 w-full z-20 flex justify-center">
        <div className="relative w-full max-w-[1920px]">
          <div className="absolute top-0 w-full flex items-center justify-between p-8">
            <Link
              href={`/${props.locale}/`}
              className="flex gap-4 group items-center cursor-pointer select-none"
            >
              <Logo className="group-hover:rotate-[14deg] w-12 transition-transform duration-150" />
              <p className="text-white font-luckiest-guy text-4xl select-none">
                Nouns
              </p>
            </Link>
            <nav className="flex items-center gap-8 cursor-pointer">
              <div className="flex gap-6 max-lg:hidden">
                <HeaderLink href="/getfunded">
                  <Text en="Get Funded" pt="Seja financiado" />
                </HeaderLink>
                <HeaderLink href="https://www.youtube.com/watch?v=SAXzMQ8pPvE">
                  <Text en="About" pt="Sobre" />
                </HeaderLink>
                <HeaderLink href="/shop">
                  <Text en="Shop" pt="Loja" />
                </HeaderLink>
              </div>
              <div className="max-[700px]:hidden">
                <ConnectButton />
              </div>
              <Menu locale={props.locale} />
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}

function HeaderLink(props: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={props.href}
      className="hover:text-white/60 text-white transition-colors select-none text-lg font-medium"
    >
      {props.children}
    </Link>
  );
}
