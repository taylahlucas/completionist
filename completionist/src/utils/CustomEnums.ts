export type ScreenEnum = AuthScreenEnum | UnauthorizedScreenEnum;

export enum AuthScreenEnum {
  GameSelection = 'GameSelection',
  LeftMenu = 'LeftMenu',
  Quests = 'Quests',
  Collectables = 'Collectables',
  Miscellaneous = 'Miscellaneous',
  Locations = 'Locations',
  SendRequest = 'SendRequest',
	SteamAchievements = 'SteamAchievements',
  Subscriptions = 'Subscriptions',
	SelectPlan = 'SelectPlan',
  Payments = 'Payments',
  Settings = 'Settings',
	AccountDetails = 'AccountDetails'
}

export enum UnauthorizedScreenEnum {
  Landing = 'Landing',
  Login = 'Login',
	AccountVerification = 'AccountVerification',
	SelectInitialPlan = 'SelectInitialPlan',
	SelectFirstGame = 'SelectFirstGame',
	LinkAccount = 'LinkAccount',
}

export enum IconTypeEnum {
  MaterialIcons = 'MaterialIcons',
  MaterialCommunityIcons = 'MaterialCommunityIcons',
  Ionicons = 'Ionicons',
  FontAwesome = 'FontAwesome'
}

export enum GameKeyEnum {
	FALLOUT_3 = 'fallout3',
  FALLOUT_4 = 'fallout4',
	SKYRIM = 'skyrim',
	WITCHER_3 = 'witcher3'
}

export enum SubscriptionTypeEnum {
  FREE = 'free',
	PREMIUM = 'premium'
}

export enum DatePeriodEnum {
  MONTHLY = 'monthly',
  YEARLY = 'yearly'
}

export enum SettingsOptionEnum {
  COMPLETED_ITEMS = 'completedItems',
  DISABLED_SECTIONS = 'disabledSections'
}

export enum ContentSectionEnum {
  QUESTS = 'quests',
  COLLECTABLES = 'collectables',
  LOCATIONS = 'locations',
  MISCELLANEOUS = 'miscellaneous'
}