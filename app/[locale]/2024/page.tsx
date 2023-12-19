import { redirect } from "next/navigation"

export const metadata = {
    title: "Nouns Esports 2024",
    description: "We are on a mission to expand the ​ ⌐◨-◨ ​ footprint by disrupting the esports industry model with an unapologetic community and athletes-first approach.",
    openGraph: {
        type: "website",
        images: ["/prop2024.png"],
      },
      twitter: {
        site: "@NounsEsports",
        card: "summary_large_image",
        images: ["/prop2024.png"],
      },


    }

    export default function Page() {
        redirect("https://nouns.wtf/vote/466")
    }