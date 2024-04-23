"use client";

import ReactFastMarquee from "react-fast-marquee";
import LogoWhite from "@/public/logo/logo-white.svg";
import Image from "next/image";
import Text from "@/components/Text";

export default function Marquee() {
  return (
    <ReactFastMarquee autoFill className="bg-red flex items-center h-8">
      <Image
        src={LogoWhite}
        alt="Nouns Esports logo in white"
        className="w-4 h-4 select-none"
      />
      <p className="px-4 text-white text-lg font-bebas-neue pt-[0.19rem]">
        <Text en="Join the revolution" pt="Junte-se à revolução" />
      </p>
    </ReactFastMarquee>
  );
}
