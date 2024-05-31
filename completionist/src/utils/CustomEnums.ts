export type ScreenEnum = AuthScreenEnum | DrawerScreenEnum | UnauthorizedScreenEnum;

export enum AuthScreenEnum {
	Landing = 'Landing',
  GameSelection = 'GameSelection',
	GlobalSettings = 'GlobalSettings',
	GlobalAccountDetails = 'GlobalAccountDetails',
	GlobalSteamAchievements = 'GlobalSteamAchievements',
  GlobalAchievements = 'GlobalAchievements',
	DrawerStack = 'DrawerStack'
}

export enum DrawerScreenEnum {
	Quests = 'Quests',
  Collectables = 'Collectables',
  Miscellaneous = 'Miscellaneous',
  Locations = 'Locations',
  SendRequest = 'SendRequest',
	Achievements = 'Achievements',
	SteamAchievements = 'SteamAchievements',
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
	Payments = 'Payments',
	SelectFirstGame = 'SelectFirstGame',
	LinkAccount = 'LinkAccount',
	ForgotPassword = 'ForgotPassword',
	VerifyNewPassword = 'VerifyNewPassword'
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