import Link from "next/link";

export default function Button(props: {
  href: string;
  backgroundColor?: string;
  children: React.ReactNode;
}) {
  const newTab = props.href.includes("://");

  return (
    <Link
      href={props.href}
      target={newTab ? "_blank" : ""}
      rel={newTab ? "noopener noreferrer" : ""}
      className="relative w-min cursor-pointer"
      draggable={false}
    >
      <div
        className={`absolute w-full h-full rounded-full ${
          props.backgroundColor ?? "bg-red"
        }`}
      ></div>
      <div className="relative select-none text-darkgrey hover:translate-x-1 hover:-translate-y-1 transition-transform py-3 px-[22px] text-xl bg-white rounded-full flex items-center justify-center leading-none font-bebas-neue whitespace-nowrap">
        {props.children}
      </div>
    </Link>
  );
}
