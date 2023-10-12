import Link from "@/components/Link";
import { twMerge } from "tailwind-merge";

export default function Button(props: {
  href: string;
  backgroundColor?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={props.href} className="relative w-min cursor-pointer">
      <div
        className={twMerge(
          "absolute w-full h-full rounded-full bg-red",
          props.backgroundColor
        )}
      ></div>
      <div className="relative select-none text-darkgrey hover:translate-x-1 hover:-translate-y-1 transition-transform py-3 px-[22px] text-xl bg-white rounded-full flex items-center justify-center leading-none font-bebas-neue whitespace-nowrap">
        {props.children}
      </div>
    </Link>
  );
}
