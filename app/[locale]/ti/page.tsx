import EmailGiveaway from "@/components/EmailGiveaway";

export default function TI() {
  return (
    <div className="flex flex-col gap-16 max-[860px]:gap-8 mb-16 items-center">
      <div className="relative flex items-center justify-center h-[500px] max-sm:h-[400px] w-full">
        <img
          src="/ti.png"
          className="absolute top-0 h-full object-cover object-top w-full blur-sm// brightness-75"
        />
        <h1 className="relative z-10 font-luckiest-guy text-5xl max-sm:text-4xl max-[350px]:text-3xl px-8 max-w-4xl text-white text-center">
          Nouns Esports x Adidas Signed Jersey Giveaway
        </h1>
        <div className="from-transparent to-black bg-gradient-to-b h-1/2 w-full bottom-0 absolute" />
      </div>
      <div className="flex flex-col gap-16 items-center px-8">
        <div className="flex max-[860px]:flex-col gap-16 max-lg:gap-8 items-center">
          <img src="/jersey.webp" className="h-full max-h-80 rounded-2xl" />
          <EmailGiveaway />
        </div>
      </div>
    </div>
  );
}
