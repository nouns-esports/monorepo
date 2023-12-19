import { Metadata } from "next";
import { redirect } from "next/navigation";

export function generateMetadata() {
  return {
    title: "Nouns Esports 2024",
    description: "We are on a mission to expand the ​ ⌐◨-◨ ​ footprint by disrupting the esports industry model with an unapologetic community and athletes-first approach.",
    metadataBase: new URL("https://nouns.gg"),
    openGraph: {
      type: "website",
      images: ["/2024.png"],
    },
    twitter: {
      site: "@NounsEsports",
      card: "summary_large_image",
      images: ["/2024.png"],
    },
  } satisfies Metadata
};

export default function Page() {
    redirect("https://nouns.wtf/vote/466")
    // return <div>Test</div>
}