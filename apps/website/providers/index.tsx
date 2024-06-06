"use client";

import Privy from "@/providers/Privy";
import { Toaster } from "react-hot-toast";
import ReactQuery from "./ReactQuery";
import Wagmi from "./Wagmi";

export default function Providers(props: {
  user?: string;
  children: React.ReactNode;
}) {
  return (
    <Privy user={props.user}>
      <ReactQuery>
        <Wagmi>
          {props.children}
          <Toaster position="top-center" />
        </Wagmi>
      </ReactQuery>
    </Privy>
  );
}
