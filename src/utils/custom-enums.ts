export enum AuthScreenEnum {
  Landing = 'Landing',
  GameSelection = 'GameSelection',
  SelectGameLanguage = 'SelectGameLanguage',
  GlobalSettings = 'GlobalSettings',
  GlobalAccountDetails = 'GlobalAccountDetails',
  GlobalSteamAchievements = 'GlobalSteamAchievements',
  GlobalAchievements = 'GlobalAchievements',
  PurchaseGame = 'PurchaseGame',
  SteamProfile = 'SteamProfile',
  DrawerStack = 'DrawerStack',
}

export enum DrawerScreenEnum {
  Quests = 'Quests',
  Collectables = 'Collectables',
  Miscellaneous = 'Miscellaneous',
  Locations = 'Locations',
  SendRequest = 'SendRequest',
  Achievements = 'Achievements',
  LinkSteamProfile = 'LinkSteamProfile',
  Payments = 'Payments',
  GameSettings = 'GameSettings',
  AccountDetails = 'AccountDetails',
}

export enum UnAuthorizedScreenEnum {
  Landing = 'Landing',
  Login = 'Login',
  VerifyAccount = 'VerifyAccount',
  SelectInitialPlan = 'SelectInitialPlan',
  SetUsername = 'SetUsername',
  SelectFirstGame = 'SelectFirstGame',
  LinkAccount = 'LinkAccount',
  ForgotPassword = 'ForgotPassword',
  VerifyNewPassword = 'VerifyNewPassword',
}

export enum IconTypeEnum {
  MaterialIcons = 'MaterialIcons',
  MaterialCommunityIcons = 'MaterialCommunityIcons',
  Ionicons = 'Ionicons',
  FontAwesome = 'FontAwesome',
}

export enum PaymentTierEnum {
  SMALL,
  MEDIUM,
  LARGE,
}

export enum DatePeriodEnum {
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}

export enum ContentSectionEnum {
  QUESTS = 'quests',
  COLLECTABLES = 'collectables',
  LOCATIONS = 'locations',
  MISCELLANEOUS = 'miscellaneous',
}
