import { twMerge } from "tailwind-merge";
import Link from "./Link";

export default function Dialog(props: {
  open: boolean;
  back: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={twMerge(
        "fixed top-0 left-0 flex items-center justify-center h-screen w-full bg-black/50 z-[60] max-xl:w-screen max-xl:h-screen opacity-0 pointer-events-none transition-opacity duration-150",
        props.open && "opacity-100 pointer-events-auto"
      )}
    >
      <Link
        className="fixed top-0 left-0 w-full h-screen z-[70] max-sm:hidden"
        href={props.back}
      />
      {props.children}
    </div>
  );
}
