import Sidebar from "@/components/Sidebar";
import Link from "@/components/Link";

export default async function DashboardLayout(props: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col items-center w-full mt-32">
      <div className="relative flex gap-8 max-w-[1920px] w-full px-16">
        <Sidebar />
        <div className="ml-60 mr-80 px-8 w-full h-[calc(100vh_-_128px)]">
          {props.children}
        </div>
        <aside className="absolute right-16 flex flex-col gap-4">
          <div className="flex flex-col gap-4 h-60 w-80 bg-darkgrey p-4 rounded-xl" />
          <Link href="/discord">
            <img
              src="https://cdn2.unrealengine.com/what-is-discord-1920x1080-c3d90ca45f57.jpg"
              className="flex flex-col gap-4 h-40 w-80 bg-darkgrey rounded-xl"
            />
          </Link>
        </aside>
      </div>
    </main>
  );
}
