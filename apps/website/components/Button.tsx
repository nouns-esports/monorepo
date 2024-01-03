"use client";

import Link from "@/components/Link";

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
      <div
        style={{
          backgroundColor: props.backgroundColor,
        }}
        className="absolute w-full h-full rounded-full bg-red"
      />
      <div className="relative select-none text-darkgrey hover:translate-x-1 hover:-translate-y-1 transition-transform py-3 px-[22px] text-xl bg-white rounded-full flex items-center justify-center leading-none font-bebas-neue whitespace-nowrap">
        {props.children}
      </div>
    </Component>
  );
}
