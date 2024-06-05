"use client";

import Privy from "@/providers/Privy";
import { Toaster } from "react-hot-toast";
// import { init } from "@multibase/js";
// import { env } from "~/env";
import ReactQuery from "./ReactQuery";
import Wagmi from "./Wagmi";

// if (env.NEXT_PUBLIC_ENVIRONMENT === "production") {
//   init(env.NEXT_PUBLIC_MULTIBASE_API_KEY);
// }

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
