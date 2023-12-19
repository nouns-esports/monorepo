import { Metadata } from "next";
import { metadata as baseMetadata } from "@/app/[locale]/layout";
import Redirect from "@/components/Redirect";

export const metadata = {
    title: "Nouns Esports 2024",
    description:
      "We are on a mission to expand the ​ ⌐◨-◨ ​ footprint by disrupting the esports industry model with an unapologetic community and athletes-first approach.",
    keywords: [
      ...baseMetadata.keywords,
    ],
    openGraph: {
      images: ["/prop2024.png"],
    },
    twitter: {
      images: ["/prop2024.png"],
    },
  } satisfies Metadata;

export default function PropPage() {
    return <Redirect />
}