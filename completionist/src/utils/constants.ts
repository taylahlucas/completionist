import { GameKeyEnum } from './CustomEnums';

export const REFRESH_CACHE_KEY = 'REFRESH_EXPIRY_CACHE';
export const CACHE_EXPIRY_TIME = 60 * 60 * 1000; // 1 hour in milliseconds
export const VERIFICATION_ENTRY_LENGTH = 6;
export const renderAmountConst = 20;
export const maxPwAttempts = 3;

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
