import { SubscriptionTypeEnum } from './CustomEnums';
import { GeneralData } from './CustomInterfaces';

export const CACHE_KEY = 'REST_GET_CACHE';
export const CACHE_EXPIRY_TIME = 60 * 60 * 1000;    // 1 hour in milliseconds

export const expectedDataKeys: Array<keyof GeneralData> = ['quests', 'collectables', 'locations', 'miscellaneous', 'settingsConfig'];

export const games = [
  SubscriptionTypeEnum.SKYRIM,
  SubscriptionTypeEnum.FALLOUT_4
]