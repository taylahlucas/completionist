import { GameKeyEnum } from './CustomEnums';

export const CACHE_KEY = 'REST_GET_CACHE';
export const CACHE_EXPIRY_TIME = 60 * 60 * 1000;    // 1 hour in milliseconds

export const renderAmountConst = 20;

export const games = [
	GameKeyEnum.FALLOUT_3,
	GameKeyEnum.FALLOUT_4,
  GameKeyEnum.SKYRIM,
	GameKeyEnum.WITCHER_3,
]

export const requestCodes = {
  SUCCESS: 200,
	FAILURE: 205,
	UNAUTHORIZED: 405,
  EMAIL_TAKEN: 600,
	EMAIL_NOT_FOUND: 602,
  NO_USER_FOUND: 605,
  WRONG_PASSWORD: 610
}