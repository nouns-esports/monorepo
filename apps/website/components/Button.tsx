"use client";

import Link from "@/components/Link";
import { twMerge } from "tailwind-merge";

export default function Button(props: {
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
  backgroundColor?: string;
  form?: boolean;
  large?: boolean;
  animate: "hover" | "bg";
  loading?: boolean;
  children: React.ReactNode;
}) {
  const Component = props.href ? Link : props.form ? "input" : "button";

  return (
    <Component
      disabled={props.disabled}
      onClick={props.onClick}
      // @ts-ignore
      href={props.href}
      type={props.form ? "submit" : undefined}
      className="relative w-min cursor-pointer"
    >
      {props.animate === "hover" ? (
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
          "relative select-none text-darkgrey bg-white rounded-full flex items-center justify-center leading-none font-bebas-neue whitespace-nowrap",
          props.large ? "py-3 px-[22px] text-xl" : "py-1.5 px-4 text-xl",

          props.disabled
            ? "brightness-50 cursor-not-allowed"
            : props.animate === "hover"
              ? "hover:translate-x-1 hover:-translate-y-1 transition-transform"
              : "hover:brightness-75 transition-all",

          props.loading && "gap-2 pl-5 pr-6"
        )}
      >
        {props.loading ? (
          <img src="/spinner.svg" className="h-[18px] animate-spin" />
        ) : (
          ""
        )}
        {props.children}
      </div>
    </Component>
  );
}
