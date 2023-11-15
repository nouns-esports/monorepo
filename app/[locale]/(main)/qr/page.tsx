"use client";

import { useState, useRef, useEffect } from "react";
import QRCodeStyling from "qr-code-styling";

export default function QRPage() {
  const [value, setValue] = useState("https://nouns.gg");
  const [inverted, setInverted] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const qrCode = new QRCodeStyling({
        width: 300,
        height: 300,
        data: value,
        margin: 4,
        qrOptions: { typeNumber: 0, mode: "Byte", errorCorrectionLevel: "Q" },
        imageOptions: { hideBackgroundDots: true, imageSize: 0.6, margin: 8 },
        dotsOptions: {
          type: "rounded",
          color: inverted ? "#ffffff" : "#000000",
        },
        backgroundOptions: { color: inverted ? "#000000" : "#ffffff" },
        image: "/logo.svg",
        cornersSquareOptions: {
          type: "extra-rounded",
          color: inverted ? "#ffffff" : "#000000",
        },
        cornersDotOptions: { color: inverted ? "#ffffff" : "#000000" },
      });
      ref.current.innerHTML = "";
      qrCode.append(ref.current);
    }
  }, [value, inverted]);

  return (
    <div className="h-screen flex flex-col gap-16 items-center justify-center">
      <h1 className="text-6xl text-white font-luckiest-guy">
        Nouns Esports QR Code Generator
      </h1>
      <div ref={ref} />
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2">
          <input
            type="checkbox"
            onChange={(e) => setInverted(e.currentTarget.checked)}
            className="accent-red"
          />
          <label className="text-white">Invert</label>
        </div>
        <input
          className="text-black border-2 text-lg border-black rounded-full px-4 py-2 font-bebas-neue"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
}
