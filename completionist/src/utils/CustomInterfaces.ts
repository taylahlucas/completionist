import { ScreenEnum, SettingsOptionEnum, GameKeyEnum, DatePeriodEnum, SubscriptionTypeEnum, ContentSectionEnum, DrawerScreenEnum } from './CustomEnums';
import { NavigationAction, NavigationState } from '@react-navigation/native';
import { MainState } from '@redux/MainState';
import { SettingsState } from '@components/custom/Settings/SettingsState';
import { LoginState } from '@components/custom/LoginForm/LoginState';
import { ContentState } from '@components/custom/ContentList/ContentState';
import { SubscriptionState } from '@components/custom/SubscriptionContent/SubscriptionState';
import { LanguageType } from './CustomTypes';

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
	title: string;
	description?: string;
	icon: string;
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
  APP_ID: string;
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
}

export type UnauthorizedStackParamList = {
  Landing: undefined;
  Login: undefined;
	AccountVerification: undefined;
	SelectInitialPlan: undefined;
	Payments:  undefined;
	SelectFirstGame: undefined;
	LinkAccount: undefined;
	ForgotPassword: undefined;
	VerifyNewPassword: undefined;
};

export type AuthStackParamList = {
	Landing: undefined;
	GameSelection: undefined;
  Subscriptions: undefined;
	DrawerStack: undefined;
};

export type DrawerStackParamList = {
	Quests: undefined;
  Collectables: undefined;
  Miscellaneous: undefined;
  Locations: undefined;
  SendRequest: undefined;
	SteamAchievements: undefined;
	Achievements: undefined;
	Subscriptions: undefined;
	SelectPlan: undefined;
  Payments: undefined;
  Settings: undefined;
	AccountDetails: undefined;
}

export interface NativeNavigation {
  navigate: (page: ScreenEnum, params?: any) => void;
  dispatch: (action: NavigationAction | ((state: NavigationState) => NavigationAction)) => void;
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
  dlc: SettingsListItem[];
}

export interface SettingsConfigItem {
  section: SettingsListItem;
  categories: SettingsListItem[];
  dlc: SettingsListItem[];
}

export interface SettingsListItem {
  id: string;
  title: string;
  isActive: boolean;
}

export interface SubscriptionData {
  id: GameKeyEnum;
  isActive: boolean;
}

export interface Subscription {
  tier: SubscriptionTypeEnum;
  changesLeft: number;
  data: SubscriptionData[];
}

export interface GeneralData {
	appId: string;
  quests: Item[];
  collectables: Item[];
  locations: Item[];
  miscellaneous: Item[];
  settingsConfig: SettingsConfig;
}

export interface UserData {
	fallout3: GeneralData;
	fallout4: GeneralData;
  skyrim: GeneralData;
	witcher3: GeneralData;
}

export interface SignupData {
	verification: boolean;
	selectPlan: boolean;
	selectGame: boolean;
}

export interface User extends LoginFormData {
	steamId?: string;
	signup: SignupData;
  subscription: Subscription;
  settings: UserSettings;
  data: UserData;
}

export interface LoginFormData {
  userId: string;
  name: string;
  email: string;
	googleId?: string;
  pw?: string;
  userAvatar?: string;
}