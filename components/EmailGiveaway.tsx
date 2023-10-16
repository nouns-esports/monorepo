"use client";

import { useState } from "react";
import Button from "./Button";

export default function EmailGiveaway() {
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [email, setEmail] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log(email);
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <div className="flex gap-2">
        <input
          type="checkbox"
          checked={acceptTerms}
          required
          onChange={(e) => setAcceptTerms(e.currentTarget.checked)}
          className="accent-red"
        />
        <label className="text-xs">
          I give Nouns Esports permission to use this email blah blah blah legal
          jargon
        </label>
      </div>
      <div className="flex w-full bg-lightgrey/10 rounded-full">
        <input
          type="email"
          placeholder="Enter your email"
          required
          onChange={(e) => setEmail(e.currentTarget.value)}
          className="bg-transparent w-full text-lg font-bebas-neue text-white focus:outline-none px-4 py-2"
        />
        <Button backgroundColor="#1F5543">Enter</Button>
      </div>
    </form>
  );
}
