import Button from "@/components/Button";
import notFound from "@/public/404/shrug.webp";
import Image from "next/image";

export default function NotFound(props: { params: { locale: string } }) {
  return (
    <main className="relative h-screen bg-[url(/404/stars.svg)] bg-repeat bg-[length:250px] flex flex-col gap-8 px-8 items-center justify-center">
      <Image
        src={notFound}
        alt="Page not found image"
        width={600}
        className="w-[600px] select-none"
        draggable={false}
      />
      <h1 className="font-luckiest-guy text-5xl max-md:text-4xl max-sm:text-3xl text-white text-center">
        Sorry, we couldn't find that page!
      </h1>
      <Button href={`/${props.params.locale}/`} animate="hover">
        Home
      </Button>
      <div className="from-transparent to-black bg-gradient-to-b h-64 w-full bottom-0 absolute pointer-events-none" />
    </main>
  );
}
