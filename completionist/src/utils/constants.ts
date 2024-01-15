import { SubscriptionTypeEnum } from './CustomEnums';
import { GeneralData, UserData } from './CustomInterfaces';

export const CACHE_KEY = 'REST_GET_CACHE';
export const CACHE_EXPIRY_TIME = 60 * 60 * 1000;    // 1 hour in milliseconds

export const renderAmountConst = 20;

export const expectedUserDataKeys: Array<keyof UserData> = ['skyrim', 'fallout4'];
export const expectedSubscriptionDataKeys: SubscriptionTypeEnum[] = [SubscriptionTypeEnum.SKYRIM, SubscriptionTypeEnum.FALLOUT_4];
export const expectedGeneralDataKeys: Array<keyof GeneralData> = ['quests', 'collectables', 'locations', 'miscellaneous', 'settingsConfig'];

export const generalSections = ['Quests', 'Collectables', 'Locations', 'Miscellaneous'];

export const games = [
  SubscriptionTypeEnum.SKYRIM,
  SubscriptionTypeEnum.FALLOUT_4
]

export const skyrimDLC = ['Dawnguard', 'Dragonborn'];
export const fallout4DLC = ['Automatron', 'Far Harbor', 'Nuka-World', 'Vault-Tec Workshop'];

export const requestCodes = {
  SUCCESS: 200,
  NOT_FOUND: 404,
  EMAIL_TAKEN: 600,
  NO_USER_FOUND: 605,
  WRONG_PASSWORD: 610
}