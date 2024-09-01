"use client";

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export function Modal(props: {
  id: string;
  children: React.ReactNode;
  queryParam?: string;
  showOnLoad?: boolean;
  className?: string;
}) {
  const [position, setPosition] = useState(0);
  const [initialTop, setInitialTop] = useState(0);

  useEffect(() => {
    const dialog = document.getElementById(
      `${props.id}-dialog`
    ) as HTMLDialogElement;

    setInitialTop(dialog.children[0].children[0].getBoundingClientRect().top);

    if (props.showOnLoad && !dialog.open) {
      const root = document.documentElement;
      const width = root.clientWidth;

      document.documentElement.classList.add("prevent-scroll");

      dialog.showModal();

      root.style.paddingRight = `${root.clientWidth - width}px`;
    }
  }, []);

  return (
    <dialog
      id={`${props.id}-dialog`}
      data-queryparam={props.queryParam}
      className={twMerge(
        "outline-none backdrop:bg-black/50 bg-transparent max-h-none backdrop:backdrop-blur-sm max-w-none max-sm:h-[100dvh] max-sm:w-full",
        "animate-in fade-in backdrop:animate-in backdrop:fade-in slide-in-from-bottom-1/2 ease-in-out"
      )}
      onClick={(e) => {
        const rect =
          e.currentTarget.children[0].children[0].getBoundingClientRect();

        if (
          e.clientX < rect.left ||
          e.clientX > rect.right ||
          e.clientY < rect.top ||
          e.clientY > rect.bottom
        ) {
          const root = document.documentElement;

          document.documentElement.classList.remove("prevent-scroll");

          e.currentTarget.close();

          root.style.paddingRight = `0px`;

          if (props.queryParam) {
            const url = new URL(window.location.toString());
            url.searchParams.delete(props.queryParam);
            window.history.pushState({}, "", url);
          }
        }
      }}
    >
      <div className="flex flex-col items-center justify-end w-full h-full pointer-events-none overflow-hidden">
        <div
          style={{
            transform: `translate(0px, ${position}px)`,
          }}
          onTouchMove={(e) => {
            setPosition(e.touches[0].clientY - initialTop);
          }}
          onTouchEnd={(e) => {
            setPosition(0);
          }}
          className={twMerge(
            "flex flex-col drop-shadow-2xl rounded-xl bg-black border border-grey-600 text-grey-200 pointer-events-auto",
            props.className
          )}
        >
          {props.children}
        </div>
      </div>
    </dialog>
  );
}

export function ToggleModal(props: {
  id: string;
  className?: string;
  children: React.ReactNode;
  tabIndex?: number;
  value?: string;
}) {
  return (
    <div
      tabIndex={props.tabIndex}
      onClick={() => toggleModal(props.id, props.value)}
      className={twMerge("cursor-pointer", props.className)}
    >
      {props.children}
    </div>
  );
}

export function toggleModal(id: string, value?: string) {
  const dialog = document.getElementById(`${id}-dialog`) as HTMLDialogElement;

  const root = document.documentElement;
  const url = new URL(window.location.toString());

  if (dialog.open) {
    document.documentElement.classList.remove("prevent-scroll");
    root.style.paddingRight = `0px`;
    dialog.close();
    if (dialog.dataset.queryparam) {
      url.searchParams.delete(dialog.dataset.queryparam);
    }
  } else {
    const width = root.clientWidth;
    document.documentElement.classList.add("prevent-scroll");

    dialog.showModal();
    root.style.paddingRight = `${root.clientWidth - width}px`;

    if (dialog.dataset.queryparam && value) {
      url.searchParams.set(dialog.dataset.queryparam, value);
    }
  }

  window.history.pushState({}, "", url);
}
