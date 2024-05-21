"use client";

import { getAccessToken, usePrivy } from "@privy-io/react-auth";
import { useEffect } from "react";

export default function Refresh(props: { params: { from: string } }) {
  const { ready } = usePrivy();

  useEffect(() => {
    async function getToken() {
      const token = await getAccessToken();

      if (token) {
        window.location.href = props.params.from;
      }
    }

    if (ready) getToken();
  }, [ready]);
}
