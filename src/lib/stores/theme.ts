import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { themes } from '$lib/utils/themes';

type SupportedTheme = (typeof themes)[number]['code'];

export const getTheme = (): SupportedTheme => {
  if (browser) {
    const savedTheme = localStorage.getItem('zyla_theme');
    const validThemeCodes = themes.map((theme) => theme.code);

    if (savedTheme && validThemeCodes.includes(savedTheme)) {
      return savedTheme as SupportedTheme;
    }

    const systemPrefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const systemTheme = systemPrefers ? 'dark' : 'light';

    if (validThemeCodes.includes(systemTheme)) {
      return systemTheme as SupportedTheme;
    }
  }
  return themes[0].code;
};

export const theme = writable<SupportedTheme>(getTheme());

export function setTheme(th: SupportedTheme) {
  const validThemeCodes = themes.map((theme) => theme.code);

  if (!validThemeCodes.includes(th)) return;

  theme.set(th);
  if (browser) {
    localStorage.setItem('zyla_theme', th);
  }
}

export const deleteTheme = () => {
  if (browser) {
    localStorage.removeItem('zyla_theme');
  }
};
