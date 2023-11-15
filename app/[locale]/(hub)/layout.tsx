import Link from "@/components/Link";
import Logo from "@/components/Logo";

export default async function AppLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <div className="w-[100svw] h-[100svh] flex">
      <nav className="flex flex-col flex-shrink-0 items-center p-8 w-32">
        <Link href="/">
          <Logo className="w-14" />
        </Link>
      </nav>
      <main className="bg-darkgrey w-full"></main>
    </div>
  );
}
