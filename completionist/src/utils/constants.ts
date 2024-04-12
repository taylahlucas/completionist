import { GameKeyEnum } from './CustomEnums';

export const CACHE_KEY = 'REST_GET_CACHE';
export const CACHE_EXPIRY_TIME = 60 * 60 * 1000;    // 1 hour in milliseconds

export const renderAmountConst = 20;

export const generalSections = ['Quests', 'Collectables', 'Locations', 'Miscellaneous'];

export const games = [
  GameKeyEnum.SKYRIM,
  GameKeyEnum.FALLOUT_4
]

export const requestCodes = {
  SUCCESS: 200,
	UNAUTHORIZED: 403,
	NOT_FOUND: 500,
  EMAIL_TAKEN: 600,
	EMAIL_NOT_FOUND: 602,
  NO_USER_FOUND: 605,
  WRONG_PASSWORD: 610
}