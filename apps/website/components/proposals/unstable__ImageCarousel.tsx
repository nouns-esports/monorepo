"use client";

import { CaretLeft, CaretRight } from "phosphor-react-sc";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function ImageCarousel(props: { images: string[] }) {
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <div className="w-40 flex-shrink-0 h-[calc(100%_-_16px)] rounded-xl overflow-hidden z-20 relative group">
      {props.images.length > 1 ? (
        <div className="w-full top-0 absolute h-full flex items-center px-2 z-30">
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setImageIndex(
                imageIndex === props.images.length - 1 ? 0 : imageIndex + 1
              );
              return false;
            }}
            className="flex items-center w-full h-full"
          >
            <CaretLeft
              className="text-white opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6"
              weight="bold"
            />
          </div>
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setImageIndex(
                imageIndex === 0 ? props.images.length - 1 : imageIndex - 1
              );
            }}
            className="flex items-center justify-end w-full h-full"
          >
            <CaretRight
              className="text-white opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6"
              weight="bold"
            />
          </div>
        </div>
      ) : (
        ""
      )}
      <img
        key={imageIndex}
        src={`${props.images[imageIndex]}?img-width=250`}
        className="w-full h-full object-cover object-center"
      />
      <div
        className={twMerge(
          "bg-black w-full h-full absolute top-0 opacity-0",
          props.images.length > 1 && "group-hover:opacity-30 transition-opacity"
        )}
      />
    </div>
  );
}
