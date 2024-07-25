"use client";

import { X } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function Menu() {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();
  const params = useParams();

  useEffect(() => {
    setOpen(false);
  }, [params]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      {open ? (
        <X
          onClick={() => setOpen(false)}
          className="w-6 h-6 text-white relative z-[60]"
        />
      ) : (
        <img
          onClick={() => setOpen(true)}
          src="/menu.svg"
          alt=""
          className="w-6 h-6 hidden max-md:flex relative z-[60]"
        />
      )}
      <div
        className={twMerge(
          "fixed w-full h-full bg-black top-0 left-0 pointer-events-none opacity-0 transition-opacity",
          open && "opacity-100 pointer-events-auto"
        )}
      ></div>
    </>
  );
}
