export enum AuthScreenEnum {
  Landing = 'landing',
  GameSelection = 'game-selection',
  GlobalSettings = 'global-settings',
  GlobalAccountDetails = 'global-account-details',
  GlobalSteamAchievements = 'global-steam-achievements',
  GlobalAchievements = 'global-achievements',
  PurchaseGame = 'purchase-game',
  SteamProfile = 'steam-profile',
  DrawerStack = 'drawer-stack',
}

export enum DrawerScreenEnum {
  Quests = 'quests',
  Collectables = 'collectables',
  Miscellaneous = 'miscellaneous',
  Locations = 'locations',
  SendRequest = 'send-request',
  Achievements = 'achievements',
  LinkSteamProfile = 'link-steam-profile',
  Payments = 'payments',
  GameSettings = 'game-settings',
  AccountDetails = 'account-details',
}

export enum UnauthorizedScreenEnum {
  Landing = 'landing',
  Login = 'login',
  VerifyAccount = 'verify-account',
  SelectInitialPlan = 'select-initial-plan',
  SetUsername = 'set-username',
  SelectFirstGame = 'select-first-game',
  LinkAccount = 'link-account',
  ForgotPassword = 'forgot-password',
  VerifyNewPassword = 'verify-new-password',
}

export enum IconTypeEnum {
  MaterialIcons = 'MaterialIcons',
  MaterialCommunityIcons = 'MaterialCommunityIcons',
  Ionicons = 'Ionicons',
  FontAwesome = 'FontAwesome',
}

export enum GameKeyEnum {
  ELDEN_RING = 'eldenRing',
  FALLOUT_3 = 'fallout3',
  FALLOUT_4 = 'fallout4',
  SKYRIM = 'skyrim',
  WITCHER_3 = 'witcher3',
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

export enum SettingsOptionEnum {
  COMPLETED_ITEMS = 'completedItems',
  DISABLED_SECTIONS = 'disabledSections',
}

export enum ContentSectionEnum {
  QUESTS = 'quests',
  COLLECTABLES = 'collectables',
  LOCATIONS = 'locations',
  MISCELLANEOUS = 'miscellaneous',
}
