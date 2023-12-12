import { ScreenEnum, SubscriptionTypeEnum } from './CustomEnums';
import { NavigationAction, NavigationState } from '@react-navigation/native';
import { MainState } from '@redux/MainState';
import { ObjectId } from 'mongoose';

export interface UserFormData {
  userId: string;
  name: string;
  email: string;
  userAvatar?: string;
  subscription: Subscription[];
}

export interface SkyrimQuest {
  id: string;
  mainCategory: string;
  subCategory?: string;
  subCategoryType?: string;
  title: string;
  location?: string;
  hold?: string;
  href?: string;
  isComplete?: boolean;
}

export interface Location {
  id: string;
  name: string;
  isComplete?: boolean;
}

export interface MiscItem {
  id: string;
  name: string;
  type: string;
  isComplete?: boolean;
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
}

export interface EnvironmentConfig {
  APP_ID: string;
  ACCESS_TOKEN: string;
  GRAPHQL_ENDPOINT: string;
  GOOGLE_CLIENT_ID: string;
}

// Navigation Interfaces

export type RootDrawerParamList = {
  RootStackNavigator: undefined;
  // Landing: undefined;
  Login: undefined;
  Signup: undefined;
  Quests: undefined;
  Collectables: undefined;
  Miscellaneous: undefined;
  Locations: undefined;
};

export interface NativeNavigation {
  navigate: (page: ScreenEnum, params?: any) => void;
  dispatch: (action: NavigationAction | ((state: NavigationState) => NavigationAction)) => void;
  getCurrentScreenName: () => ScreenEnum | null;
  goBack: () => void;
  setOptions: (options: any) => void;
}

// GraphQL Interfaces

export interface Item {
  id: string;
  isComplete: boolean;
}

export interface SkyrimData {
  quests: Item[];
  collectables: Item[];
  books: Item[];
  locations: Item[];
}

export interface UserData {
  skyrim: SkyrimData;
}

export interface Subscription {
  id: SubscriptionTypeEnum;
  isActive: boolean;
}

export interface User {
  userId: ObjectId;
  name: string;
  email: string;
  userAvatar: string;
  subscription: Subscription[];
  data: UserData;
}