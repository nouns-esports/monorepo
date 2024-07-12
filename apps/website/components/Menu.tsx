"use client";

import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Menu() {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();
  const params = useParams();

  useEffect(() => {
    setOpen(false);
  }, [params]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);
}
