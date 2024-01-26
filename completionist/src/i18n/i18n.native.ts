// import i18n, { LanguageDetectorAsyncModule } from 'i18next';
// import { languages, namespace } from './i18n-common';
// import { initReactI18next } from 'react-i18next';
// import * as RNLocalize from 'react-native-localize';
// import resources from '../locales/resources.json';
// import { LogBox } from 'react-native';

// // useSuspense is still experimental
// LogBox.ignoreLogs([
//   'react-i18next:: It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.'
// ]);

// const languageDetector: LanguageDetectorAsyncModule = {
//   type: 'languageDetector',
//   async: true,
//   detect: (callback: (lng: string) => void): void => callback(RNLocalize.getLocales()[0].languageCode),
//   init: (): void => {},
//   cacheUserLanguage: (): void => {}
// };

// i18n
//   .use(languageDetector)
//   .use(initReactI18next)
//   .init({
//     compatibilityJSON: 'v3',
//     supportedLngs: languages,
//     nonExplicitSupportedLngs: true,
//     fallbackLng: 'en',
//     ns: namespace,
//     resources,
//     debug: false,
//     interpolation: {
//       escapeValue: false
//     },
//     react: {
//       useSuspense: true
//     }
//   } as any);

// export default i18n;
