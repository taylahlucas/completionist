import { ScreenEnum, SettingsOptionEnum, GameKeyEnum, DatePeriodEnum } from './CustomEnums';
import { NavigationAction, NavigationState } from '@react-navigation/native';
import { MainState } from '@redux/MainState';
import { SettingsState } from '@components/custom/SettingsContent/SettingsState';
import { LoginState } from '@components/custom/LoginForm/LoginState';
import { ContentState } from '@components/custom/ContentList/ContentState';
import { SubscriptionState } from '@components/custom/SubscriptionContent/SubscriptionState';

export interface GameContentItem {
  id: string;
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

export interface CategoryType {
  id: string;
  title: string;
}

export interface PriceProps {
  type: DatePeriodEnum;
  title: string;
  value: number;
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
}

// Navigation Interfaces

export interface NavigationDrawerItemData {
  id: ScreenEnum;
  title: string;
  subTitle: string;
  isEnabled: boolean;
}

export type RootDrawerParamList = {
  RootStackNavigator: undefined;
  Landing: undefined;
  Login: undefined;
  GameSelection: undefined;
  Quests: undefined;
  Collectables: undefined;
  Miscellaneous: undefined;
  Locations: undefined;
  RequestGame: undefined;
  Subscriptions: undefined;
  Settings: undefined;
};

export interface NativeNavigation {
  navigate: (page: ScreenEnum, params?: any) => void;
  dispatch: (action: NavigationAction | ((state: NavigationState) => NavigationAction)) => void;
  goBack: () => void;
  setOptions: (options: any) => void;
}

// Data Interfaces

export interface LoginFormData {
  userId: string;
  name: string;
  email: string;
  password?: string;
  userAvatar?: string;
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

export interface SettingsConfigItem {
  section: string;
  category: string;
  isActive: boolean;
}

export interface SettingsListItem {
  id: string;
  title: string;
  isActive: boolean;
}

export interface Subscription {
  id: GameKeyEnum;
  isActive: boolean;
}

export interface GeneralData {
  quests: Item[];
  collectables: Item[];
  locations: Item[];
  miscellaneous: Item[];
  settingsConfig: SettingsConfigItem[];
}

export interface UserData {
  skyrim: GeneralData;
  fallout4: GeneralData;
}

export interface User extends LoginFormData {
  subscription: Subscription[];
  settings: SettingsOptionItem[];
  data: UserData;
}