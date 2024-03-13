"use client";

import { usePrivy } from "@privy-io/react-auth";

export default function Profile() {
  const { logout } = usePrivy();
  return (
    <p
      onClick={() => {
        logout();
      }}
    >
      Profile
    </p>
  );
}
