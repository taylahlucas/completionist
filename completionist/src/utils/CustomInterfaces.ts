import { ScreenEnum, SubscriptionTypeEnum } from './CustomEnums';
import { NavigationAction, NavigationState } from '@react-navigation/native';
import { MainState } from '@redux/MainState';
import { SettingsState } from '@components/custom/SettingsContent/SettingsState';

export interface UserFormData {
  userId: string;
  name: string;
  email: string;
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
}

export interface MiscItem {
  id: string;
  name: string;
  type: string;
}

export interface Collectable {
  id: string;
  type: string;
  subType?: string;
  name: string;
  prerequisite?: string;
}

// State & Environment

export interface Base {
  children?: React.ReactNode;
}

export interface StoreState {
  main: MainState;
  settings: SettingsState;
}

export interface EnvironmentConfig {
  APP_ID: string;
  ACCESS_TOKEN: string;
  GOOGLE_CLIENT_ID: string;
  LOCAL_URL: string;
}

// Navigation Interfaces

export type RootDrawerParamList = {
  RootStackNavigator: undefined;
  // Landing: undefined;
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  Quests: undefined;
  Collectables: undefined;
  Miscellaneous: undefined;
  Locations: undefined;
  Settings: undefined;
};

export interface NativeNavigation {
  navigate: (page: ScreenEnum, params?: any) => void;
  dispatch: (action: NavigationAction | ((state: NavigationState) => NavigationAction)) => void;
  getCurrentScreenName: () => ScreenEnum | null;
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

export interface GeneralData {
  quests: Item[];
  collectables: Item[];
  locations: Item[];
  miscellaneous: Item[];
}

export interface UserData {
  skyrim: GeneralData;
  fallout4: GeneralData;
}

export interface Subscription {
  id: SubscriptionTypeEnum;
  isActive: boolean;
}

export interface User {
  userId: string;
  name: string;
  email: string;
  userAvatar: string;
  subscription: Subscription[];
  data: UserData;
}