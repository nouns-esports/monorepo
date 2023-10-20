"use client";

import { useState } from "react";
import Button from "./Button";
import fireworks from "@/utils/confetti/fireworks";

export default function EmailGiveaway() {
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [email, setEmail] = useState("");
  const [twitter, setTwitter] = useState("");

  const [emailSuccess, setEmailSuccess] = useState<null | boolean>(true);
  const [twitterSuccess, setTwitterSuccess] = useState<null | boolean>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await fetch("/api/ti-giveaway", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    const { success } = await response.json();

    setEmailSuccess(success);

    if (success) fireworks();
  }

  async function submitTwitter() {
    await fetch("/api/ti-giveaway-twitter", {
      method: "POST",
      body: JSON.stringify({ email, twitter }),
    });

    setTwitterSuccess(true);
  }

  if (emailSuccess === true) {
    return (
      <div className="flex flex-col gap-6 max-w-lg">
        <p className="text-white max-sm:text-center">
          <span className="text-2xl mr-2">🎉</span>You are entered, Follow{" "}
          <a href="/twitter" className="text-red font-bold">
            @NounsEsports
          </a>{" "}
          on Twitter for updates.
        </p>
        {twitterSuccess ? (
          <p className="text-[#51D06D]">Twitter successfully submitted!</p>
        ) : (
          <>
            <div>
              Want to double your chances? Reply to this{" "}
              <a href="" className="text-red font-bold">
                tweet
              </a>{" "}
              with a selfie or screencap from the event with you wearing
              Noggles!
            </div>
            <div className="flex w-full bg-lightgrey/10 rounded-full">
              <input
                type="text"
                placeholder="@TWITTERHANDLE"
                onChange={(e) => setTwitter(e.currentTarget.value)}
                className="bg-transparent rounded-full w-full text-lg font-bebas-neue text-white focus:outline-none px-4 py-2"
              />
              <Button backgroundColor="#1F5543" onClick={submitTwitter}>
                Submit
              </Button>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-[860px]:items-center max-w-lg">
      <p className="max-[860px]:text-center flex flex-col gap-2">
        Seems like you found a pair of ⌐◨-◨ (or someone shared with you this
        link) Either way, welcome aboard! Enter your email below to participate
        in a giveaway including a signed jersey and some other swag.
        <span>
          Lo-fi ⌐◨-◨ made by{" "}
          <a
            href="https://x.com/@bigshottoyworks"
            className="text-red font-bold"
          >
            BiGSHOT
          </a>
        </span>
      </p>
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
          {emailSuccess === false ? (
            <small className="text-red">This email was already entered!</small>
          ) : (
            ""
          )}
        </div>
      </form>
    </div>
  );
}
