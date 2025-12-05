import { Dimensions } from 'react-native';
import { ContentSectionEnum } from './custom-enums';
import { LanguageType } from './custom-types';
import { GameKey } from '@api/';

export const DEFAULT_LANG: LanguageType = 'en';

export const windowHeight = Dimensions.get('window').height;
export const windowWidth = Dimensions.get('window').width;

export const CACHE_EXPIRY_TIME = 60 * 60 * 1000; // 1 hour in milliseconds
export const VERIFICATION_ENTRY_LENGTH = 6;
export const renderAmountConst = 20;
export const maxPwAttempts = 3;

// MARK: Update with new game data
export const games = [
  GameKey.eldenRing,
  GameKey.fallout3,
  GameKey.fallout4,
  GameKey.skyrim,
  GameKey.witcher3,
];

export const requestCodes = {
  SUCCESS: 200,
  FAILURE: 205,
  UNAUTHORIZED: 405,
  EMAIL_TAKEN: 600,
  EMAIL_NOT_FOUND: 602,
  NO_USER_FOUND: 605,
  WRONG_PASSWORD: 610,
};

export const urls = [
  'signup',
  'exists',
  'link',
  'signin',
  'reset',
  'verify',
  'id',
  'update',
  'pw',
  'send',
  'delete',
  'steam/profile',
  'steam/achievements',
  'ISteamUserStats',
];

export const languages: LanguageType[] = [
  'ar',
  'de',
  'en',
  'es',
  'fr',
  'hi',
  'id',
  'it',
  'ja',
  'pt',
  'tr',
  'vi',
  'zh',
];

export const sectionTypes = [
  ContentSectionEnum.QUESTS,
  ContentSectionEnum.COLLECTABLES,
  ContentSectionEnum.LOCATIONS,
  ContentSectionEnum.MISCELLANEOUS,
];

// MARK: Update with new game data
export const gameLanguages: { key: GameKey; langs: LanguageType[] }[] = [
  {
    key: GameKey.eldenRing,
    langs: ['ar', 'de', 'en', 'es', 'fr', 'it', 'ja', 'pt', 'zh'],
  },
  {
    key: GameKey.fallout3,
    langs: ['de', 'en', 'es', 'fr', 'it'],
  },
  {
    key: GameKey.fallout4,
    langs: ['de', 'en', 'es', 'fr', 'it', 'ja', 'pt', 'zh'],
  },
  {
    key: GameKey.skyrim,
    langs: ['de', 'en', 'es', 'fr', 'it', 'ja', 'zh'],
  },
  {
    key: GameKey.witcher3,
    langs: ['ar', 'de', 'en', 'es', 'fr', 'it', 'ja', 'pt', 'tr', 'zh'],
  },
];
