import { SubscriptionTypeEnum } from './CustomEnums';

export const CACHE_KEY = 'REST_GET_CACHE';
export const CACHE_EXPIRY_TIME = 60 * 60 * 1000;    // 1 hour in milliseconds

export const renderAmountConst = 20;

export const generalSections = ['Quests', 'Collectables', 'Locations', 'Miscellaneous'];

export const games = [
  SubscriptionTypeEnum.SKYRIM,
  SubscriptionTypeEnum.FALLOUT_4
]

export const skyrimDLC = [
  'dawnguard',
  'dragonborn',
  'hearthfire'
];
export const fallout4DLC = [
  'automatron',
  'farHarbor',
  'nukaWorld',
  'vaultText'
];

export const requestCodes = {
  SUCCESS: 200,
  NOT_FOUND: 404,
  EMAIL_TAKEN: 600,
  NO_USER_FOUND: 605,
  WRONG_PASSWORD: 610
}