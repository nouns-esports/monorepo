"use client";

import { List, X } from "phosphor-react-sc";
import Logo from "./Logo";
import { useState } from "react";
import Link from "@/components/Link";
import ConnectButton from "./ConnectButton";
import Text from "@/components/Text";

export default function Menu(props: { locale: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <List
        weight="bold"
        onClick={() => setOpen(true)}
        className="w-8 h-8 hidden max-lg:flex text-white"
      />
      <div
        style={{
          opacity: open ? "1" : "0",
          pointerEvents: open ? "auto" : "none",
        }}
        className="fixed top-0 pt-[4.25rem] left-0 w-full h-full flex flex-col p-8 backdrop-blur-xl transition-opacity z-50"
      >
        <div className="w-full flex flex-col gap-8">
          <div className="flex justify-between items-center w-full">
            <Link
              href={`/${props.locale}/`}
              className="flex gap-4 group items-center cursor-pointer select-none"
            >
              <Logo className="group-hover:rotate-[14deg] w-12 transition-transform duration-150" />
              <p className="text-white font-luckiest-guy text-4xl select-none">
                Nouns
              </p>
            </Link>
            <div className="w-8 h-8 flex items-center justify-center">
              <X
                weight="bold"
                onClick={() => setOpen(false)}
                className="w-8 h-8 hidden max-lg:flex text-white"
              />
            </div>
          </div>
          <div className="items-center justify-end gap-8 hidden max-[700px]:flex">
            <ConnectButton />
          </div>
        </div>
        <div className="h-full flex justify-center">
          <div className="h-full flex flex-col justify-center items-center gap-16">
            <MenuLink href="/getfunded">
              <Text en="Get Funded" pt="Seja financiado" />
            </MenuLink>
            <MenuLink href={`/${props.locale}/collect`}>
              <Text en="Collect" pt="Coletar" />
            </MenuLink>
            <MenuLink href="/shop">
              <Text en="Shop" pt="Comprar" />
            </MenuLink>
          </div>
        </div>
      </div>
    </>
  );
}

function MenuLink(props: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={props.href}
      className="text-white font-bebas-neue select-none text-4xl font-medium"
    >
      {props.children}
    </Link>
  );
}
