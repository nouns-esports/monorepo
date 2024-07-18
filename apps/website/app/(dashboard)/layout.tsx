import Button from "@/components/Button";
import DashboardNavigation from "@/components/DashboardNavbar";
import Link from "@/components/Link";
import Sidebar from "@/components/Sidebar";
import { getChannels } from "@/server/queries/channel";
import {
  DiscordLogo,
  InstagramLogo,
  TwitterLogo,
  YoutubeLogo,
} from "phosphor-react-sc";

export default async function DashboardLayout(props: {
  children: React.ReactNode;
}) {
  const channels = await getChannels();
  //
  return (
    <div className="flex flex-col items-center w-full my-32 max-sm:my-24">
      <div className="w-full flex gap-36 max-[1920px]:gap-16 max-2xl:gap-8 px-16 max-2xl:px-8 max-sm:px-4 max-w-[1920px]">
        <aside className="flex flex-col gap-4 w-60 h-full sticky top-32 flex-shrink-0 max-lg:hidden">
          <Sidebar channels={channels} />
        </aside>
        <div className="flex w-full justify-center min-h-screen">
          <div className="flex flex-col w-full max-w-3xl gap-8">
            <DashboardNavigation channels={channels} />
            {props.children}
          </div>
        </div>
        <aside className="flex flex-col gap-4 sticky h-full top-32 flex-shrink-0 max-[1350px]:hidden">
          <div className="relative flex flex-shrink-0 gap-4 h-48 w-80 bg-red rounded-xl">
            <div className="p-4 flex flex-col justify-center gap-4 h-full w-full">
              <p className="font-bebas-neue text-white text-3xl leading-none">
                Enter the Nexus
              </p>
              <p className="text-white text-sm leading-snug max-w-[180px]">
                Help shape the future of Nouns Esports
              </p>
              <Button href="/nexus" animate="bg">
                Get Started
              </Button>
            </div>
            <img
              src="/squirtles.png"
              className="h-[calc(100%_+_8px)] absolute right-2 -top-4"
            />
          </div>
          <Link href="/matcha" newTab>
            <img src="/matcha-sidebar.png" className="w-80 rounded-xl" />
          </Link>
          <div className="flex flex-col gap-2 bg-blue-500 rounded-xl p-4">
            <p className="font-bebas-neue text-white text-[1.75rem] leading-none">
              Join the community!
            </p>
            <div className="flex gap-3">
              <Link href="/discord" newTab>
                <DiscordLogo
                  className="w-8 h-8 text-white hover:text-white/60 cursor-pointer transition-colors"
                  weight="fill"
                />
              </Link>
              <Link href="/instagram" newTab>
                <InstagramLogo
                  className="w-8 h-8 text-white hover:text-white/60 cursor-pointer transition-colors"
                  weight="fill"
                />
              </Link>
              <Link href="/twitter" newTab>
                <TwitterLogo
                  className="w-8 h-8 text-white hover:text-white/60 cursor-pointer transition-colors"
                  weight="fill"
                />
              </Link>
              <Link href="/youtube" newTab>
                <YoutubeLogo
                  className="w-8 h-8 text-white hover:text-white/60 cursor-pointer transition-colors"
                  weight="fill"
                />
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
