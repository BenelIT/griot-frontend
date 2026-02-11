import "flag-icons/css/flag-icons.min.css";
export interface Translation {
  language: string;
  value: string;
}

export interface Word {
  id: string;
  word: string;
  translations: Translation[];
  createdAt: string;
}

export const LANGUAGES = [
  { code: "en", label: "English", countryCode: "gb" },
  { code: "es", label: "Español", countryCode: "mx" },
  { code: "it", label: "Italiano", countryCode: "it" },
  { code: "fr", label: "Français", countryCode: "fr" },
  { code: "de", label: "Deutsch", countryCode: "de" },
  { code: "pt", label: "Português", countryCode: "br" },
  { code: "ja", label: "日本語", countryCode: "jp" },
  { code: "ko", label: "한국어", countryCode: "kr" },
  { code: "zh", label: "中文", countryCode: "cn" },
  { code: "ru", label: "Русский", countryCode: "ru" },
] as const;
