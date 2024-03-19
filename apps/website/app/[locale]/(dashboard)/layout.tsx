import Sidebar from "@/components/Sidebar";
import Link from "@/components/Link";

export default async function DashboardLayout(props: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col items-center w-full mt-32 max-sm:mt-24">
      <div className="relative flex gap-8 max-w-[1920px] w-full px-16">
        <Sidebar />
        <div className="ml-60 mr-80 max-2xl:ml-52 max-2xl:mr-72 max-sm:ml-48 px-8 w-full">
          {props.children}
        </div>
      </div>
    </main>
  );
}
