import { writable } from "svelte/store";
import { browser } from "$app/environment";
import { locale } from "svelte-i18n";
import { languages } from "$lib/utils/languages";

type SupportedLanguage = typeof languages[number]["code"];

export const getLanguage = (): SupportedLanguage => {
  if (browser) {
    const savedLanguage = localStorage.getItem("zyla_language");
    const validLanguageCodes = languages.map((lang) => lang.code);

    if (savedLanguage && validLanguageCodes.includes(savedLanguage)) {
      return savedLanguage as SupportedLanguage;
    }
  }
  return languages[0].code;
};

export const language = writable<SupportedLanguage>(getLanguage());

export function setLanguage(lang: SupportedLanguage) {
  const validLanguageCodes = languages.map((lang) => lang.code);

  if (!validLanguageCodes.includes(lang)) return;

  language.set(lang);
  if (browser) {
    localStorage.setItem("zyla_language", lang);
  }
}

export const deleteLanguage = () => {
  if (browser) {
    localStorage.removeItem("zyla_language");
  }
};

if (browser) {
  language.subscribe((value) => {
    locale.set(value);
  });
}
