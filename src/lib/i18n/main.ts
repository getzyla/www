import { addMessages, init } from 'svelte-i18n';
import { getLanguage } from '$lib/stores/language';

import en from '../../locales/en.json';
import tr from '../../locales/tr.json';
import de from '../../locales/de.json';

addMessages('en', en);
addMessages('tr', tr);
addMessages('de', de);

init({
  fallbackLocale: 'en',
  initialLocale: getLanguage()
});
