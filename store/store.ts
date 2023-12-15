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

export const languagesSupportedMap: Record<LanguagesSupported, string> = {
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

interface SubscriptionState {
  subscription: Subscription | null | undefined;
  setSubscription: (subscription: Subscription | null) => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscription: undefined,
  setSubscription: (subscription: Subscription | null) => set({ subscription }),
}));
