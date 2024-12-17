const getLocales = (): {
  countryCode: string;
  languageTag: string;
  languageCode: string;
  isRTL: boolean;
}[] => [
  { countryCode: 'AR', languageTag: 'ar-AR', languageCode: 'ar', isRTL: false },
  { countryCode: 'DE', languageTag: 'de-DE', languageCode: 'de', isRTL: false },
  { countryCode: 'EN', languageTag: 'en-EN', languageCode: 'en', isRTL: false },
  { countryCode: 'ES', languageTag: 'es-ES', languageCode: 'es', isRTL: false },
  { countryCode: 'FR', languageTag: 'fr-FR', languageCode: 'fr', isRTL: false },
  { countryCode: 'HI', languageTag: 'hi-HI', languageCode: 'hi', isRTL: false },
  { countryCode: 'ID', languageTag: 'id-ID', languageCode: 'id', isRTL: false },
  { countryCode: 'IT', languageTag: 'it-IT', languageCode: 'it', isRTL: false },
  { countryCode: 'JA', languageTag: 'ja-JA', languageCode: 'ja', isRTL: false },
  { countryCode: 'PT', languageTag: 'pt-PT', languageCode: 'pt', isRTL: false },
  { countryCode: 'TR', languageTag: 'tr-TR', languageCode: 'tr', isRTL: false },
  { countryCode: 'VI', languageTag: 'vi-VI', languageCode: 'vi', isRTL: false },
  { countryCode: 'ZH', languageTag: 'zh-ZH', languageCode: 'zh', isRTL: false },
];

const findBestAvailableLanguage = (): {
  languageTag: string;
  isRTL: boolean;
} => ({
  languageTag: 'en',
  isRTL: false,
});

const getCountry = (): string => 'EN';

const addEventListener: jest.Mock = jest.fn();
const removeEventListener: jest.Mock = jest.fn();

export {
  findBestAvailableLanguage,
  getLocales,
  getCountry,
  addEventListener,
  removeEventListener,
};
