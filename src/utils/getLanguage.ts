export const languages = {
  en: "English",
  br: "Português",
};

export default function getLanguage() {
  return window.location.host === "localhost:3000" ||
    window.location.host.split(".")[0] === "nouns"
    ? "en"
    : (window.location.host.split(".")[0] as keyof typeof languages);
}
