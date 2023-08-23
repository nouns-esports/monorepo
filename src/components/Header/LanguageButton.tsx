import { For, createSignal } from "solid-js";
import getLanguage, { languages } from "../../utils/getLanguage";

export default function LanguageButton() {
  const [language, setLanguage] = createSignal<keyof typeof languages>(
    getLanguage()
  );

  return (
    <div class="px-2 py-2 pr-4 text-white rounded-full relative bg-black group flex cursor-pointer items-center gap-3 select-none">
      <img src={`/lang/${language()}.svg`} draggable={false} class="w-6 h-6" />
      <p>{languages[language()]}</p>
      <img src="/icons/arrow.svg" class="rotate-180 w-3 h-3" />
      <div class="bg-black absolute top-0 left-0 hidden group-hover:flex flex-col gap-4 rounded-[1.25rem] w-full px-2 py-2">
        <For each={Object.entries(languages)}>
          {([short, long]) => (
            <a
              href={`https://${short === "en" ? "" : short}${
                short === "en" ? "" : "."
              }nouns.gg/`}
              class="flex gap-3 hover:bg-darkgrey"
            >
              <img
                src={`/lang/${short}.svg`}
                draggable={false}
                class="w-6 h-6"
              />
              {long}
            </a>
          )}
        </For>
      </div>
    </div>
  );
}
