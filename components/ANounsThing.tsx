"use client";

import Link from "next/link";
import Text from "@/components/Text";
import { useContext, useEffect, useState } from "react";
import { useMouse } from "@uidotdev/usehooks";
import { PrimaryColorContext } from "@/providers";

export default function ANounsThing() {
  const [mouse, ref] = useMouse();

  const [rotate, setRotate] = useState(0);
  const [lockRotation, setLockRotation] = useState(false);

  const primaryColor = useContext(PrimaryColorContext);

  useEffect(() => {
    if (window.innerWidth > 768 && !lockRotation) {
      setRotate(
        (Math.atan2(mouse.elementY - 8, mouse.elementX - 8) * 180) / Math.PI
      );
    } else if (rotate !== 0) {
      setRotate(0);
    }
  }, [mouse, lockRotation]);

  return (
    <Link
      onMouseEnter={() => setLockRotation(true)}
      onMouseLeave={() => setLockRotation(false)}
      href="https://nouns.wtf"
      target="_blank"
      rel="noopener noreferrer"
      className="flex gap-2 items-center text-white w-fit font-londrina-solid"
    >
      <Text en="A" pt="Um" />
      <div
        // @ts-ignore
        ref={ref}
        className="w-10 origin-center"
        style={{ rotate: `${rotate}deg` }}
      >
        <svg viewBox="0 0 16 6" fill="none">
          <path
            d="M3 3V6H9V3H10V6H16V0H10V2H9V0H3V2H0V5H1V3H3Z"
            fill={primaryColor}
            className="transition-colors"
          />
          <path d="M3.99982 5V1H5.99982V5H3.99982Z" fill="white" />
          <path d="M5.99985 5V1H7.99985V5H5.99985Z" fill="black" />
          <path d="M10.9998 5V1H12.9998V5H10.9998Z" fill="white" />
          <path d="M12.9998 5V1H14.9998V5H12.9998Z" fill="black" />
        </svg>
      </div>

      <Text en="thing" pt="coisa" />
    </Link>
  );
}
