import Link from "@/components/Link";
import Logo from "../Logo";
import Banner from "./Banner";
import Navbar from "./Navbar";
import { getEvents } from "@/server/queries/events";
import { getAuthenticatedUser } from "@/server/queries/users";

export default async function Header() {
  const events = await getEvents();

  const user = await getAuthenticatedUser(true);

  return (
    <>
      <Banner events={events} />
      <header className="sticky top-0 w-full z-20 flex justify-center">
        <div className="relative w-full max-w-[1920px]">
          <div className="pointer-events-none absolute top-0 w-full flex items-center justify-between p-8 max-sm:p-4 z-40">
            <Link
              href="/"
              className="pointer-events-auto flex gap-4 max-sm:gap-3 group items-center cursor-pointer select-none"
            >
              <Logo className="group-hover:rotate-[14deg] w-12 max-sm:w-10 transition-transform duration-150" />
              <div className="text-white font-luckiest-guy text-4xl max-sm:text-3xl select-none">
                Nouns
              </div>
            </Link>
            <Navbar user={user} />
          </div>
        </div>
      </header>
    </>
  );
}
