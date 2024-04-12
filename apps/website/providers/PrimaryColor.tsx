"use client";

import { createContext, useMemo } from "react";
import { useParams, usePathname } from "next/navigation";
import { Game } from "@/db/schema";

export const PrimaryColorContext = createContext<string>("#E93737");

export default function PrimaryColor(props: {
  children: React.ReactNode;
  games: { id: Game["id"]; color: Game["color"] }[];
}) {
  const pathname = usePathname();

  const { locale } = useParams();

  const color = useMemo(() => {
    if (pathname.includes("/rosters")) {
      const game = props.games.find(
        (_game) => _game.id === pathname.split("/")[locale === "en" ? 2 : 3]
      );

      if (game) return game?.color;
    }

    return "#E93737";
  }, [pathname]);

  return (
    <PrimaryColorContext.Provider value={color}>
      {props.children}
    </PrimaryColorContext.Provider>
  );
}
