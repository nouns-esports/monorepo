"use client"

import { useEffect } from "react";

export default function Redirect() {
    useEffect(() => {
        window.location.href = "https://nouns.wtf/vote/466"
    }, []);

    return <></>
}