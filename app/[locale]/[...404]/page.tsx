import Button from "@/components/Button";

export default function NotFound() {
  return (
    <main className="relative h-screen bg-[url(/stars.svg)] bg-repeat bg-[length:250px] flex flex-col gap-8 px-8 items-center justify-center">
      <img src="/404.webp" className="w-[600px]" />
      <h1 className="font-luckiest-guy text-5xl max-md:text-4xl max-sm:text-3xl text-white text-center">
        Sorry, we couldn't find that page!
      </h1>
      <Button href="/">Home</Button>
      <div className="from-transparent to-black bg-gradient-to-b h-64 w-full bottom-0 absolute pointer-events-none" />
    </main>
  );
}
