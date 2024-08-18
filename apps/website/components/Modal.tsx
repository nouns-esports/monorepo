"use client";

import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

export function Modal(props: {
  id: string;
  children: React.ReactNode;
  queryParam?: string;
  showOnLoad?: boolean;
  className?: string;
}) {
  useEffect(() => {
    const dialog = document.getElementById(
      `${props.id}-dialog`
    ) as HTMLDialogElement;

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
        "outline-none drop-shadow-2xl backdrop:bg-black/50",
        props.className
      )}
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();

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
      {props.children}
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
