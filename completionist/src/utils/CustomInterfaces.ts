import {
  SettingsOptionEnum,
  GameKeyEnum,
  DatePeriodEnum,
  ContentSectionEnum,
  DrawerScreenEnum,
} from './CustomEnums';
import { NavigationAction, NavigationState } from '@react-navigation/native';
import { MainState } from '@redux/MainState';
import { SettingsState } from '@components/custom/Settings/provider/SettingsState';
import { LoginState } from '@components/custom/LoginForm/provider/LoginState';
import { ContentState } from '@components/custom/ContentList/provider/ContentState';
import { SubscriptionState } from '@components/custom/SubscriptionContent/provider/SubscriptionState';
import { LanguageType, ScreenEnumType } from './CustomTypes';

export interface ContentItem {
  id: string;
  title: string;
  isActive: boolean;
}

export interface GameContentItem {
  id: string;
  section: ContentSectionEnum;
  mainCategory: string;
  subCategory?: string;
  subCategoryType?: string;
  title: string;
  location?: string;
  hold?: string;
  dlc: string;
  href?: string;
}

export interface DropDownType {
  category: string;
  subCategory?: string;
  type?: string;
}

export interface PriceProps {
  type: DatePeriodEnum;
  title: string;
  value: number;
}

export interface AchievementItem {
  id: string;
  name: string;
  description?: string;
  icon: string;
  unlocked: boolean;
}

export interface SteamProfile {
  steamId: string;
  username: string;
  name?: string;
  profileImg?: string;
  country?: string;
  level: string;
}

export interface BadgeItem {
  id: string;
  title: string;
  icon: string;
}

export interface ProgressItemData {
  id: string;
  current: number;
  total: number;
}

export interface ProgressItem {
  id: string;
  data: ProgressItemData[];
}

// State & Environment

export interface Base {
  children?: React.ReactNode;
}

export interface StoreState {
  main: MainState;
  login: LoginState;
  settings: SettingsState;
  content: ContentState;
  subscription: SubscriptionState;
}

export interface EnvironmentConfig {
  ACCESS_TOKEN: string;
  WEB_CLIENT_ID: string;
  IOS_LOCAL_URL: string;
  ANDROID_LOCAL_URL: string;
  STEAM_API_TOKEN: string;
}

// Navigation Interfaces

export interface NavigationDrawerItemData {
  id: DrawerScreenEnum;
  title: string;
  subTitle: string;
  isEnabled: boolean;
  isHidden: boolean;
}

export type UnauthorizedStackParamList = {
  Landing: undefined;
  Login: undefined;
  VerifyAccount: undefined;
  SelectInitialPlan: undefined;
  SetUsername: undefined;
  SelectFirstGame: undefined;
  LinkAccount: undefined;
  ForgotPassword: undefined;
  VerifyNewPassword: undefined;
};

export type AuthStackParamList = {
  Landing: undefined;
  GameSelection: undefined;
  GlobalSettings: undefined;
  GlobalAccountDetails: undefined;
  GlobalAchievements: undefined;
  GlobalSteamAchievements: undefined;
  PurchaseGame: [gameId: GameKeyEnum];
  DrawerStack: undefined;
};

export type DrawerStackParamList = {
  Quests: undefined;
  Collectables: undefined;
  Miscellaneous: undefined;
  Locations: undefined;
  SendRequest: undefined;
  Achievements: undefined;
  SteamAchievements: undefined;
  Payments: undefined;
  Settings: undefined;
  AccountDetails: undefined;
};

export interface NativeNavigation {
  navigate: (page: ScreenEnumType, params?: any) => void;
  dispatch: (
    action: NavigationAction | ((state: NavigationState) => NavigationAction),
  ) => void;
  goBack: () => void;
  setOptions: (options: any) => void;
}

// Data Interfaces

export interface SteamAchievement {
  displayName: string;
  description: string;
  icon: string;
  icongray: string;
  name: string;
  achieved?: boolean;
}

export interface SteamPlayerAchievement {
  achieved: boolean;
  name: string;
}

export interface CachedData {
  data: any;
  timestamp: number;
}

export interface Item {
  id: string;
  isComplete: boolean;
}

export interface SettingsOptionItem {
  id: SettingsOptionEnum;
  isActive: boolean;
}

export interface UserSettings {
  lang: LanguageType;
  configs: SettingsOptionItem[];
}

export interface SettingsConfig {
  general: SettingsConfigItem[];
  dlc: IsActive[];
}

export interface SettingsConfigItem {
  section: IsActive;
  categories: IsActive[];
  dlc: IsActive[];
}

export interface IsActive {
  id: GameKeyEnum | string;
  isActive: boolean;
}

export interface GameData {
  id: GameKeyEnum;
  appId: number;
  quests: Item[];
  collectables: Item[];
  locations: Item[];
  miscellaneous: Item[];
  settingsConfig: SettingsConfig;
}

export interface SignupData {
  verification: boolean;
  setUsername: boolean;
  selectGame: boolean;
}

export interface User extends LoginFormData {
  steamId?: string;
  signup: SignupData;
  settings: UserSettings;
  gameData: GameData[];
}

export interface LoginFormData {
  userId: string;
  username: string;
  email: string;
  googleId?: string;
  pw?: string;
}
