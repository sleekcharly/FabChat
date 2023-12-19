// zustand store
import { create } from 'zustand';
import { Subscription } from '@/types/Subscription';

export type LanguagesSupported =
  | 'en'
  | 'es'
  | 'de'
  | 'fr'
  | 'zh'
  | 'hr'
  | 'cs'
  | 'nl'
  | 'fil'
  | 'fi'
  | 'el'
  | 'ha'
  | 'hi'
  | 'hu'
  | 'ig'
  | 'it'
  | 'ja'
  | 'ko'
  | 'la'
  | 'no'
  | 'pt'
  | 'pl'
  | 'pa'
  | 'ro'
  | 'ru'
  | 'sw'
  | 'tr'
  | 'yo';

export const LanguagesSupportedMap: Record<LanguagesSupported, string> = {
  en: 'English',
  es: 'Spanish',
  de: 'German',
  fr: 'French',
  zh: 'Chinese',
  hr: 'Hungarian',
  cs: 'Czech',
  nl: 'Dutch',
  fil: 'Filipino (Tagalog)',
  fi: 'Finnish',
  el: 'Greek',
  ha: 'Hausa',
  hi: 'Hindi',
  hu: 'Hungarian',
  ig: 'Igbo',
  it: 'Italian',
  ja: 'Japanese',
  ko: 'Korean',
  la: 'Latin',
  no: 'Norwegian',
  pt: 'Portuguese',
  pl: 'Polish',
  pa: 'Punjabi',
  ro: 'Romanian',
  ru: 'Russian',
  sw: 'Swahili',
  tr: 'Turkish',
  yo: 'Yoruba',
};

interface LanguageState {
  language: LanguagesSupported;
  setLanguage: (language: LanguagesSupported) => void;
  getLanguages: (isPro: boolean) => LanguagesSupported[];
  getNotSupportedLanguages: (isPro: boolean) => LanguagesSupported[];
}

const LANGUAGES_IN_FREE = 2;

export const useLanguageStore = create<LanguageState>()((set, get) => ({
  language: 'en',
  setLanguage: (language: LanguagesSupported) => set({ language }),
  getLanguages: (isPro: boolean) => {
    // if the user is pro, return all supported languages
    if (isPro)
      return Object.keys(LanguagesSupportedMap) as LanguagesSupported[];

    // if not pro, return only the first two languages
    return Object.keys(LanguagesSupportedMap).slice(
      0,
      LANGUAGES_IN_FREE,
    ) as LanguagesSupported[];
  },
  getNotSupportedLanguages: (isPro: boolean) => {
    if (isPro) return []; // No unsupported languages for "pro" users
    return Object.keys(LanguagesSupportedMap).slice(
      LANGUAGES_IN_FREE,
    ) as LanguagesSupported[];
  },
}));

interface SubscriptionState {
  subscription: Subscription | null | undefined;
  setSubscription: (subscription: Subscription | null) => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscription: undefined,
  setSubscription: (subscription: Subscription | null) => set({ subscription }),
}));
