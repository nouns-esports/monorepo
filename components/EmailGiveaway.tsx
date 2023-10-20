"use client";

import { useState } from "react";
import Button from "./Button";
import toast from "react-hot-toast";
import fireworks from "@/utils/confetti/fireworks";

export default function EmailGiveaway() {
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [email, setEmail] = useState("");

  const [success, setSuccess] = useState<null | boolean>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await fetch("/api/ti-giveaway", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    const { success } = await response.json();

    setSuccess(success);

    if (success) fireworks();
  }

  if (success === true) {
    return (
      <p className="text-white max-sm:text-center">
        <span className="text-2xl mr-2">🎉</span>You are entered! Follow{" "}
        <a href="/twitter" className="text-red font-bold">
          @NounsEsports
        </a>{" "}
        on Twitter for updates!
      </p>
    );
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <div className="flex gap-2">
        <input
          type="checkbox"
          checked={acceptTerms}
          required
          onChange={(e) => setAcceptTerms(e.currentTarget.checked)}
          className="accent-[#1F5543]"
        />
        <label className="text-xs">
          I agree to receive emails from Nouns Esports
        </label>
      </div>
      <div className="flex flex-col gap-2 max-sm:items-center">
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
        {success === false ? (
          <small className="text-red">This email was already entered!</small>
        ) : (
          ""
        )}
      </div>
    </form>
  );
}
