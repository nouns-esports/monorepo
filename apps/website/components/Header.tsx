import Link from "@/components/Link";
import Logo from "./Logo";
import Banner from "./Banner";
import { query } from "@/app/api/query/server";
import Navbar from "./Navbar";

export default async function Header(props: { locale: string }) {
  const events = await query.getEvents();

  return (
    <>
      <Banner events={events} locale={props.locale} />
      <header className="sticky top-0 w-full z-20 flex justify-center">
        <div className="relative w-full max-w-[1920px]">
          <div className="pointer-events-none absolute top-0 w-full flex items-center justify-between p-8 max-sm:p-4 z-40">
            <Link
              href={`/${props.locale}/`}
              className="pointer-events-auto flex gap-4 max-sm:gap-3 group items-center cursor-pointer select-none"
            >
              <Logo className="group-hover:rotate-[14deg] w-12 max-sm:w-10 transition-transform duration-150" />
              <p className="text-white font-luckiest-guy text-4xl max-sm:text-3xl select-none">
                Nouns
              </p>
            </Link>
            <Navbar />
          </div>
        </div>
      </header>
    </>
  );
}
