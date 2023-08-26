import currentLocale from "next-i18n-router/dist/currentLocale";
import Button from "./Button";
import { getDictionary } from "./dictionaries";
import Link from "next/link";

export default function Header() {
  const dictionary = getDictionary(currentLocale());

  return (
    <>
      <Banner />
      <header className="sticky top-0 w-full z-20">
        <div className="absolute top-0 w-full flex items-center justify-between p-8">
          <div className="flex items-center gap-8">
            <a
              href="/"
              draggable={false}
              className="flex gap-4 group items-center cursor-pointer select-none"
            >
              <img
                src="/logo.svg"
                className="group-hover:rotate-[14deg] w-12 transition-transform duration-150"
              />
              <p className="text-white font-luckiest-guy text-4xl select-none">
                Nouns
              </p>
            </a>
          </div>
          <nav className="flex items-center gap-8 cursor-pointer">
            <div className="flex gap-6 max-lg:hidden">
              <HeaderLink href="/getfunded">
                {dictionary("getFunded")}
              </HeaderLink>
              <HeaderLink href="/about">{dictionary("about")}</HeaderLink>
              <HeaderLink href="/shop">{dictionary("shop")}</HeaderLink>
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
              <Button href={"https://nouns.wtf"}>{dictionary("joinUs")}</Button>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}

function Banner() {
  //   const start = new Date(schedule[0].start.dateTime);
  //   const end = new Date(
  //     schedule[0].end?.dateTime || Date.now() + 60 * 60 * 1000
  //   );

  //   const live = Date.now() > start.getTime() && Date.now() < end.getTime();
  return (
    <Link
      href="/mint"
      // href={live ? schedule[0].htmlLink : banner.url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative z-20 h-9 bg-red hover:brightness-[85%] transition-all text-white text-sm font-semibold w-full whitespace-nowrap flex items-center justify-center"
    >
      {/* {live ? (
        <img
          src="/icons/dot.svg"
          className="mr-2 w-2 animate-pulse"
          alt="Live event icon"
        />
      ) : (
        ""
      )}
      {live
        ? `${schedule[0].summary.split("] ")[1]} is happening now`
        : banner.message} */}
      Celebrate esports summer with us!
      <img src="/icons/arrow2.svg" className="ml-2 w-3 h-3" alt="Arrow icon" />
    </Link>
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
      className="hover:text-white transition-colors select-none text-lg font-medium"
    >
      {props.children}
    </Link>
  );
}
