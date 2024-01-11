import { ScreenEnum, SubscriptionTypeEnum } from './CustomEnums';
import { NavigationAction, NavigationState } from '@react-navigation/native';
import { MainState } from '@redux/MainState';
import { SettingsState } from '@components/custom/SettingsContent/SettingsState';
import { LoginState } from '@components/custom/LoginForm/LoginState';
import { MiscState } from '@components/custom/MiscList/MiscState';
import { CollectableState } from '@components/custom/CollectableList/CollectableState';
import { LocationState } from '@components/custom/LocationList/LocationState';
import { QuestState } from '@components/custom/QuestList/QuestState';

export interface LoginFormData {
  userId: string;
  name: string;
  email: string;
  password?: string;
  userAvatar?: string;
  subscription: Subscription[];
}

export interface Quest {
  id: string;
  mainCategory: string;
  subCategory?: string;
  subCategoryType?: string;
  title: string;
  location?: string;
  hold?: string;
  href?: string;
}

export interface Location {
  id: string;
  name: string;
  hold: string;
  dlc: string;
}

export interface MiscItem {
  id: string;
  name: string;
  mainCategory: string;
  dlc: string;
}

export interface Collectable {
  id: string;
  mainCategory: string;
  subCategory?: string;
  name: string;
  prerequisite?: string;
}

export interface DropDownType {
  category: string;
  subCategory?: string;
  type?: string;
}

// State & Environment

export interface Base {
  children?: React.ReactNode;
}

export interface StoreState {
  main: MainState;
  login: LoginState;
  settings: SettingsState;
  quest: QuestState;
  collectable: CollectableState;
  location: LocationState;
  misc: MiscState;
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
  Home: undefined;
  Quests: undefined;
  Collectables: undefined;
  Miscellaneous: undefined;
  Locations: undefined;
  RequestGame: undefined;
  Settings: undefined;
};

export interface NativeNavigation {
  navigate: (page: ScreenEnum, params?: any) => void;
  dispatch: (action: NavigationAction | ((state: NavigationState) => NavigationAction)) => void;
  goBack: () => void;
  setOptions: (options: any) => void;
}

// Data Interfaces

export interface CachedData {
  data: any;
  timestamp: number;
}

export interface Item {
  id: string;
  isComplete: boolean;
}

export interface SettingsConfigItem {
  section: string;
  category: string;
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

export interface Subscription {
  id: SubscriptionTypeEnum;
  isActive: boolean;
}

export interface User extends LoginFormData {
  data: UserData;
}