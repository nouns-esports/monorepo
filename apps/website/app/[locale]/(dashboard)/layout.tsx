import Button from "@/components/Button";
import DashboardNavigation from "@/components/DashboardNavbar";
import Link from "@/components/Link";
import Sidebar from "@/components/Sidebar";

export default async function DashboardLayout(props: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center w-full my-32 max-sm:my-24">
      <div className="w-full  flex gap-36 max-[1920px]:gap-16 max-2xl:gap-8 px-16 max-2xl:px-8 max-sm:px-4 max-w-[1920px]">
        <aside className="flex flex-col gap-4 w-60 h-full sticky top-32 flex-shrink-0 max-lg:hidden">
          <Sidebar />
        </aside>
        <div className="flex w-full justify-center min-h-screen">
          <div className="flex flex-col w-full max-w-3xl gap-8">
            <DashboardNavigation />
            {props.children}
          </div>
        </div>
        <aside className="flex flex-col gap-4 sticky h-full top-32 flex-shrink-0 max-[1350px]:hidden">
          <div className="relative flex flex-shrink-0 gap-4 h-48 w-80 bg-red rounded-xl">
            <div className="p-4 flex flex-col justify-between h-full w-full">
              <p className="font-bebas-neue text-white text-3xl max-w-36 leading-none">
                Become a pass member
              </p>
              <p className="text-white text-sm leading-snug max-w-[180px]">
                Help shape the future of Nouns Esports
              </p>
              <Button href="/pass" animate="bg">
                Get Started
              </Button>
            </div>
            <img
              src="/squirtles.png"
              className="h-[calc(100%_+_8px)] absolute right-2 -top-4"
            />
          </div>
          <Link
            href="/discord"
            className="relative h-40 w-80 bg-grey-800 rounded-xl overflow-hidden"
          >
            <img
              src="/prop.webp"
              className="w-full h-full object-cover object-center brightness-75"
            />
            <div className="absolute top-0 w-full h-full text-white flex items-center justify-center font-bebas-neue text-3xl">
              Join the Discord server!
            </div>
          </Link>
        </aside>
      </div>
    </div>
  );
}
