import { createSignal } from "solid-js";
import getLanguage, { languages } from "../../utils/getLanguage";

export default function MultiLangText(
  props: Record<keyof typeof languages, string>
) {
  const [language, setLanguages] = createSignal<keyof typeof languages>(
    getLanguage()
  );

  return <span>{props[language()]}</span>;
}
