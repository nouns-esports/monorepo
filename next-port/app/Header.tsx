import Button from "./Button";

export default function Header() {
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
            <div className="flex gap-6 max-lg:hidden"></div>
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
              <Button href={"https://nouns.wtf"}>Join Us</Button>
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
    <a
      //   href={live ? schedule[0].htmlLink : banner.url}
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
    </a>
  );
}
