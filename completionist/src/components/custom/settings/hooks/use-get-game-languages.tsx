import { gameLanguages } from '@utils/constants';
import { GameKeyEnum } from '@utils/CustomEnums';
import { LanguageType } from '@utils/CustomTypes';

export const useGetGameLanguages = () => {
  const getLanguageInEn = (lang: LanguageType): string => {
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

  const getGameLanguages = (game: GameKeyEnum): LanguageType[] => {
    return gameLanguages.find(item => item.key === game)?.langs ?? ['en'];
  };

  return { getLanguageInEn, getGameLanguages };
};
