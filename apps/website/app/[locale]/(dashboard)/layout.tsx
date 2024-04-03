import DashboardNavigation from "@/components/DashboardNavbar";
import Link from "@/components/Link";
import Sidebar from "@/components/Sidebar";

export default async function DashboardLayout(props: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center w-full mt-32 max-sm:mt-24">
      <div className="w-full flex gap-36 max-[1920px]:gap-16 max-2xl:gap-8 px-16 max-2xl:px-8 max-sm:px-4 max-w-[1920px]">
        <aside className="z-50 flex flex-col gap-4 w-60 h-full sticky top-32 flex-shrink-0 max-lg:hidden">
          <Sidebar />
        </aside>
        <div className="flex flex-col gap-8 w-full text-white max-w-6xl min-h-screen">
          <DashboardNavigation />
          {props.children}
        </div>
        <aside className="z-50 flex flex-col gap-4 sticky h-full top-32 flex-shrink-0 max-[1350px]:hidden">
          <div className="flex flex-col flex-shrink-0 gap-4 h-60 w-80 bg-purple/20 p-4 rounded-xl border-4 border-purple/35" />
          <Link href="/discord">
            <img
              src="https://cdn2.unrealengine.com/what-is-discord-1920x1080-c3d90ca45f57.jpg"
              className="flex flex-col gap-4 h-40 w-80 bg-darkgrey rounded-xl"
            />
          </Link>
        </aside>
      </div>
    </div>
  );
}
