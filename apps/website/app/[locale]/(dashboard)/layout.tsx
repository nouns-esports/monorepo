import DashboardNavigation from "@/components/DashboardNavbar";
import Sidebar from "@/components/Sidebar";

export default async function DashboardLayout(props: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col items-center w-full mt-32 max-sm:mt-24">
      <div className="relative flex max-[500px]:flex-col gap-8 max-w-[1920px] w-full px-16 max-[500px]:px-4">
        <DashboardNavigation />
        <Sidebar />
        <div className="ml-60 mr-80 max-2xl:ml-52 max-2xl:mr-72 max-sm:ml-48 max-[500px]:ml-0 max-[500px]:mr-0 max-[500px]:px-0 px-8 w-full">
          {props.children}
        </div>
      </div>
    </main>
  );
}
