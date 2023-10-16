import Button from "@/components/Button";
import EmailGiveaway from "@/components/EmailGiveaway";

export default function TI() {
  return (
    <div className="flex flex-col gap-16 max-[860px]:gap-8 mb-16 items-center">
      <div className="relative flex items-center justify-center h-[500px] w-full">
        <img
          src="/ti.png"
          className="absolute top-0 h-full object-cover object-top w-full blur-sm// brightness-75"
        />
        <h1 className="relative z-10 font-luckiest-guy text-5xl max-sm:text-4xl px-8 max-w-4xl text-white text-center">
          Nouns Esports x Adidas Signed Jersey Giveaway
        </h1>
        <div className="from-transparent to-black bg-gradient-to-b h-1/2 w-full bottom-0 absolute" />
      </div>
      <div className="flex flex-col gap-16 items-center px-8">
        <div className="flex max-[860px]:flex-col gap-16 max-lg:gap-8 items-center">
          <div className="">
            <img src="/jersey.jpg" className="h-full rounded-2xl" />
          </div>
          <div className="flex flex-col gap-6 max-[860px]:items-center max-w-lg">
            <p className="max-[860px]:text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <EmailGiveaway />
          </div>
        </div>
        <div className="flex gap-8">
          <a
            href="https://www.adidas.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="h-16"
          >
            <img src="/adidas.png" className="h-full" />
          </a>
          <a
            href="https://www.nounworks.wtf/"
            target="_blank"
            rel="noopener noreferrer"
            className="h-16"
          >
            <img src="/nounworks.png" className="h-full" />
          </a>
        </div>
      </div>
    </div>
  );
}
