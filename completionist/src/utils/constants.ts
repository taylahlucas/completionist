import { GameKeyEnum } from './CustomEnums';
import { LanguageType } from './CustomTypes';

export const REFRESH_CACHE_KEY = 'REFRESH_EXPIRY_CACHE';
export const CACHE_EXPIRY_TIME = 60 * 60 * 1000; // 1 hour in milliseconds
export const VERIFICATION_ENTRY_LENGTH = 6;
export const renderAmountConst = 20;
export const maxPwAttempts = 3;

// MARK: Update with new game data
export const games = [
  GameKeyEnum.FALLOUT_3,
  GameKeyEnum.FALLOUT_4,
  GameKeyEnum.SKYRIM,
  GameKeyEnum.WITCHER_3,
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

// MARK: Update with new game data
export const gameLanguages: { key: GameKeyEnum; langs: LanguageType[] }[] = [
  {
    key: GameKeyEnum.ELDEN_RING,
    langs: ['ar', 'de', 'en', 'es', 'fr', 'it', 'ja', 'pt', 'zh'],
  },
  {
    key: GameKeyEnum.FALLOUT_3,
    langs: ['de', 'en', 'es', 'fr', 'it'],
  },
  {
    key: GameKeyEnum.FALLOUT_4,
    langs: ['de', 'en', 'es', 'fr', 'it', 'ja', 'pt', 'zh'],
  },
  {
    key: GameKeyEnum.SKYRIM,
    langs: ['de', 'en', 'es', 'fr', 'it', 'ja', 'zh'],
  },
  {
    key: GameKeyEnum.WITCHER_3,
    langs: ['ar', 'de', 'en', 'es', 'fr', 'it', 'ja', 'pt', 'tr', 'zh'],
  },
];
