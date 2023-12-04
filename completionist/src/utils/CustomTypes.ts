import { ScreenEnum } from './CustomEnums';
import { NavigationAction, NavigationState, RouteProp } from '@react-navigation/native';

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

export interface Collectable {
  id: string;
  type: string;
  subType?: string;
  name: string;
  prerequisite?: string;
}

export type RootDrawerParamList = {
  Quests: undefined;
  Collectables: undefined;
  Locations: undefined;
};

export interface NativeNavigation {
  navigate: (page: ScreenEnum, params?: any) => void;
  dispatch: (action: NavigationAction | ((state: NavigationState) => NavigationAction)) => void;
  getCurrentScreenName: () => ScreenEnum | null;
  goBack: () => void;
  setOptions: (options: any) => void;
}