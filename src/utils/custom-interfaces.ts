import {
  DatePeriodEnum,
  ContentSectionEnum,
  DrawerScreenEnum,
} from './custom-enums';
import { NavigationAction, NavigationState } from '@react-navigation/native';
import { MainState } from '@redux/main-state';
import { SettingsState } from '@features/settings/provider';
import { ContentState } from '@features/game-content/provider';
import { ScreenEnumType } from './custom-types';
import { AuthState } from '@redux/auth';
import { GameKey } from '@api/';

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

export interface GameContentState {
  quests: GameContentItem[];
  collectables: GameContentItem[];
  locations: GameContentItem[];
  miscellaneous: GameContentItem[];
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

export interface SteamAchievementItem {
  id?: string;
  name?: string;
  description?: string;
  icon?: string;
  unlocked?: boolean;
}

export interface SteamAchievementsState {
  hasPermission: boolean;
  items: SteamAchievementItem[];
  noOfLocked: number;
}

export interface GlobalSteamAchievementsState {
  gameId: GameKey;
  items: SteamAchievementsState[];
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
  auth: AuthState;
  main: MainState;
  settings: SettingsState;
  content: ContentState;
}

export interface EnvironmentConfig {
  ACCESS_TOKEN: string;
  WEB_CLIENT_ID: string;
  IOS_LOCAL_URL: string;
  ANDROID_LOCAL_URL: string;
  STEAM_API_TOKEN: string;
  STRIPE_LIVE_TOKEN: string;
  STRIPE_TEST_TOKEN: string;
  STRIPE_SECRET_KEY: string;
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
  SelectGameLanguage: [gameId: GameKey];
  GlobalSettings: undefined;
  GlobalAccountDetails: undefined;
  GlobalAchievements: undefined;
  GlobalSteamAchievements: undefined;
  PurchaseGame: [gameId: GameKey];
  SteamProfile: [steamId: string, viewType: 'add' | 'view'];
  DrawerStack: undefined;
};

export type DrawerStackParamList = {
  Quests: undefined;
  Collectables: undefined;
  Miscellaneous: undefined;
  Locations: undefined;
  SendRequest: undefined;
  Achievements: undefined;
  LinkSteamProfile: undefined;
  Payments: undefined;
  GameSettings: undefined;
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

export interface LoginFormData {
  userId: string;
  username: string;
  email: string;
  googleId?: string;
  pw?: string;
}
