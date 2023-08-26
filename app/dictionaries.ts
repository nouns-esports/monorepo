export type Locale = "en" | "pt";

const dictionary = {
  // Home
  banner: {
    en: "Celebrate esports summer with us!",
    pt: "Comemore o verão dos esportes eletrônicos conosco!",
  },
  tagline: {
    en: "Leading the revolution in community driven esports",
    pt: "Liderando a revolução nos esportes eletrônicos conduzidos pela comunidade",
  },
  learnMore: {
    en: "Learn more",
    pt: "Saber mais",
  },
  joinUs: {
    en: "Join us",
    pt: "Junte-se a nós",
  },
  watchVideo: {
    en: "Watch the video",
    pt: "Assista o vídeo",
  },
  marquee: {
    en: "Join the revolution",
    pt: "Junta-te à revolução",
  },
  redefineEsports: {
    en: "Lets redefine esports together!",
    pt: "Vamos redefinir os esportes eletrônicos juntos!",
  },
  // Header
  getFunded: {
    en: "Get Funded",
    pt: "Seja financiado",
  },
  about: {
    en: "About",
    pt: "Sobre",
  },
  shop: {
    en: "Shop",
    pt: "Comprar",
  },
} as const;

export function getDictionary(locale: string | null) {
  return (item: keyof typeof dictionary) =>
    dictionary[item][(locale as Locale) || "en"];
}
