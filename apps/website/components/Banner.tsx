"use client";

import { ArrowRight } from "lucide-react";
import Link from "@/components/Link";
import { usePathname } from "next/navigation";

export default function Banner() {
  const pathname = usePathname();

  if (pathname === "/") {
    return (
      <Link
        href="/rounds"
        className="bg-red relative z-[70] h-9 hover:brightness-[85%] transition-all text-white text-sm font-semibold w-full whitespace-nowrap flex items-center justify-center"
      >
        <div className="flex items-center justify-center overflow-hidden">
          Explore rounds, vote for your favorite proposals, and more!
          <ArrowRight className="w-4 h-4 ml-1.5" />
        </div>
      </Link>
    );
  }
}
