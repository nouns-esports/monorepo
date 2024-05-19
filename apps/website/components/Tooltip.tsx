"use client";

import { Tooltip as ReactTooltip } from "react-tooltip";

export default function Tooltip(props: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <ReactTooltip
      id={props.id}
      className="bg-red text-white max-w-40 text-center"
      positionStrategy="fixed"
    >
      {props.children}
    </ReactTooltip>
  );
}
