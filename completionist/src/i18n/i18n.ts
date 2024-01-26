import i18n from 'i18next';
import { languages, namespace } from './i18n-common';
import XHR from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import resources from './locales/resources.json';

i18n
  .use(XHR)
  .use(LanguageDetector)
  .init({
    compatibilityJSON: 'v3',
    supportedLngs: languages,
    nonExplicitSupportedLngs: true,
    fallbackLng: 'en',
    ns: namespace,
    resources,
    detection: {
      lookupLocalStorage: 'language',
      caches: ['localStorage']
    },
    debug: false,
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: true
    }
  } as any);

export default i18n;
