"use client";

import Link from "@/components/Link";
import { twMerge } from "tailwind-merge";

export default function Button(props: {
  href?: string;
  onClick?: () => void;
  backgroundColor?: string;
  form?: boolean;
  children: React.ReactNode;
}) {
  const Component = props.href ? Link : props.form ? "input" : "button";

  return (
    <Component
      onClick={props.onClick}
      // @ts-ignore
      href={props.href}
      type={props.form ? "submit" : undefined}
      className="relative w-min cursor-pointer"
    >
      {props.href ? (
        <div
          style={{
            backgroundColor: props.backgroundColor,
          }}
          className="absolute w-full h-full rounded-full bg-red"
        />
      ) : (
        ""
      )}
      <div
        className={twMerge(
          "relative select-none text-darkgrey py-3 px-[22px] text-xl bg-white rounded-full flex items-center justify-center leading-none font-bebas-neue whitespace-nowrap",
          props.href
            ? "hover:translate-x-1 hover:-translate-y-1 transition-transform"
            : "hover:bg-white/80 transition-colors"
        )}
      >
        {props.children}
      </div>
    </Component>
  );
}
