import { ScreenEnum } from "./CustomEnums";

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

export interface NativeNavigation {
  navigate: (page: ScreenEnum, params?: any) => void;
  getCurrentScreenName: () => ScreenEnum | null;
  goBack: () => void;
  setOptions: (options: any) => void;
}