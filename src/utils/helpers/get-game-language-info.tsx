import { GameKey, LanguageType } from '@api/';
import { gameLanguages, DEFAULT_LANG } from '@utils/index';

export const getLanguageInEn = (lang: LanguageType): string => {
  switch (lang) {
    case 'ar':
      return 'Arabic';
    case 'de':
      return 'German';
    case 'en':
      return 'English';
    case 'es':
      return 'Spanish';
    case 'fr':
      return 'French';
    case 'hi':
      return 'Hindi';
    case 'id':
      return 'Indonesian';
    case 'it':
      return 'Italian';
    case 'ja':
      return 'Japanese';
    case 'pt':
      return 'Portuguese';
    case 'tr':
      return 'Turkish';
    case 'vi':
      return 'Vietnamese';
    case 'zh':
      return 'Chinese';
    default:
      return '';
  }
};
export const getGameLanguages = (game: GameKey): LanguageType[] => {
  return gameLanguages.find(item => item.key === game)?.langs ?? [DEFAULT_LANG];
};

export const isLangAvailableInGame = (lang: LanguageType, game: GameKey) =>
  (gameLanguages.find(item => item.key === game)?.langs ?? [DEFAULT_LANG]).find(
    item => item === lang,
  );
