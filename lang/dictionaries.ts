import i18nConfig from "@/i18nConfig";
import { useCurrentLocale } from "next-i18n-router/client";

export const locales = {
  en: "English",
  pt: "Português",
} as const;

export type Locale = keyof typeof locales;

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
  ourGames: {
    en: "Our Games",
    pt: "Nossos Jogos",
  },
  pog: {
    en: "POG is a platform by Nouns Esports that lets anyone showcase their clips from any multiplayer game and earn real money in the process.",
    pt: "POG é uma plataforma da Nouns Esports que permite a qualquer pessoa mostrar seus clipes de qualquer jogo multiplayer e ganhar dinheiro real no processo.",
  },
  upcomingEvents: {
    en: "Upcoming Events",
    pt: "Próximos Eventos",
  },
  projects: {
    en: "Projects",
    pt: "Projetos",
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
  // Footer
  explore: {
    en: "Explore",
    pt: "Explorar",
  },
  games: {
    en: "Games",
    pt: "Jogos",
  },
  contributors: {
    en: "Contributors",
    pt: "Contribuidores",
  },
  dashboard: {
    en: "Dashboard",
    pt: "Painel",
  },
  proposals: {
    en: "Proposals",
    pt: "Propostas",
  },
  multisig: {
    en: "Multisig",
    pt: "Múltisig",
  },
  aNounsThing1: {
    en: "A",
    pt: "Um",
  },
  aNounsThing2: {
    en: "thing",
    pt: "coisa",
  },
} as const;

export function useDictionary() {
  const locale = useCurrentLocale(i18nConfig) as Locale;

  return {
    locale,
    dictionary: (item: keyof typeof dictionary) =>
      dictionary[item][(locale as Locale) || "en"],
  };
}
