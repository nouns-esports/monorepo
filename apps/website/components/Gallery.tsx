"use client";

import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { twMerge } from "tailwind-merge";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    title: "We're redefining esports",
    sub: "Learn about our mission",
    href: "/about",
    button: "Learn more",
    type: "video",
    mp4: "/landing.mp4",
    webp: "/landing.webm",
  },
  {
    title: "Nouns Fest Showcase",
    sub: "Coming in October",
    href: "/about",
    button: "Learn more",
    type: "image",
    url: "/artwork/1.png",
  },
  {
    title: "We're redefining esports",
    sub: "Learn about our mission",
    href: "/about",
    button: "Learn more",
    type: "image",
    url: "/artwork/2.png",
  },
] satisfies Array<
  { title: string; sub: string; href: string; button: string } & (
    | { type: "video"; mp4: string; webp: string }
    | { type: "image"; url: string }
  )
>;

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [backwards, setBackwards] = useState(false);

  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (backwards) {
        backgroundRef.current?.scrollTo({
          left: backgroundRef.current.clientWidth * (index - 1),
          behavior: "smooth",
        });

        return;
      }

      backgroundRef.current?.scrollTo({
        left: backgroundRef.current.clientWidth * (index + 1),
        behavior: "smooth",
      });
    }, 5000);
    return () => clearInterval(intervalId);
  }, [index, backwards]);

  return (
    <div className="relative rounded-xl h-96 max-lg:h-80 aspect-[7/4] flex-shrink-0 overflow-hidden animate-in fade-in-15 zoom-in-90">
      <div className="absolute z-10 top-0 left-0 w-full h-full flex flex-col justify-between p-6 pointer-events-none">
        <div>
          <p className="text-white text-lg">{slides[index].sub}</p>
          <h1 className="text-white font-luckiest-guy text-4xl">
            {slides[index].title}
          </h1>
        </div>
        <div className="flex items-center justify-between pointer-events-auto">
          <Button href={slides[index].href}>{slides[index].button}</Button>
          <div className="flex items-center gap-1 pr-6">
            <ChevronLeft
              onClick={() => {
                if (index < 1) return;

                backgroundRef.current?.scrollTo({
                  left: backgroundRef.current.clientWidth * (index - 1),
                  behavior: "smooth",
                });
              }}
              className={twMerge(
                "w-5 h-5 text-white/40",
                index > 0 && "text-white cursor-pointer"
              )}
            />
            {slides.map((_, slideIndex) => (
              <button
                key={slideIndex}
                className={twMerge(
                  "w-3 h-3 rounded-full bg-white/40",
                  slideIndex === index && "bg-white"
                )}
                onClick={() => {
                  backgroundRef.current?.scrollTo({
                    left: slideIndex * backgroundRef.current.clientWidth,
                    behavior: "smooth",
                  });
                }}
              />
            ))}
            <ChevronRight
              onClick={() => {
                if (index > slides.length) return;

                backgroundRef.current?.scrollTo({
                  left: backgroundRef.current.clientWidth * (index + 1),
                  behavior: "smooth",
                });
              }}
              className={twMerge(
                "w-5 h-5 text-white/40",
                index < slides.length - 1 && "text-white cursor-pointer"
              )}
            />
          </div>
        </div>
      </div>
      <div
        ref={backgroundRef}
        className="w-full h-full flex scrollbar-hidden overflow-scroll snap-x snap-mandatory scroll-smooth"
        onScroll={(e) => {
          const nextIndex = Math.round(
            e.currentTarget.scrollLeft / e.currentTarget.clientWidth
          );

          if (nextIndex === 0) setBackwards(false);
          if (nextIndex === slides.length - 1) setBackwards(true);

          setIndex(nextIndex);
        }}
      >
        {slides.map((slide, slideIndex) => {
          if (slide.type === "video") {
            return (
              <video
                key={slideIndex}
                autoPlay
                muted
                loop
                playsInline
                className="select-none w-full h-full object-cover object-top brightness-75 snap-center"
              >
                <source src={slide.webp} type="video/webm" />
                <source src={slide.mp4} type="video/mp4" />
              </video>
            );
          }

          return (
            <img
              key={slideIndex}
              src={slide.url}
              draggable={false}
              className="object-cover w-full h-full snap-center"
            />
          );
        })}
      </div>
    </div>
  );
}
