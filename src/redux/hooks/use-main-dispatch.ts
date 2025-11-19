import { Dispatch } from 'redux';
import { GameKeyEnum, GameData, Item } from '@utils/index';
import {
  setShowSplashScreen,
  setSelectedGameData,
  setSelectedGameDataSettings,
  setWebSignInConfigured,
  setSearchValue,
  setCompletedQuests,
  setCompletedCollectables,
  setCompletedMiscItems,
  setCompletedLocations,
} from '../main-state';
import { useAppDispatch } from '../store';

// TODO: Change from value to more descriptive value
interface MainDispatch {
  setShowSplashScreen: (value: boolean) => void;
  setSelectedGameData: (value?: GameData) => void;
  setSelectedGameDataSettings: (value: GameKeyEnum) => void;
  setWebSignInConfigured: (value: boolean) => void;
  setSearchValue: (value: string) => void;
  setCompletedQuests: (value: Item[]) => void;
  setCompletedCollectables: (value: Item[]) => void;
  setCompletedLocations: (value: Item[]) => void;
  setCompletedMiscItems: (value: Item[]) => void;
}

export const useMainDispatch = (): MainDispatch => {
  const dispatch: Dispatch = useAppDispatch();

  return {
    setShowSplashScreen(value: boolean): void {
      dispatch(setShowSplashScreen(value));
    },
    setSelectedGameData(value?: GameData): void {
      dispatch(setSelectedGameData(value));
    },
    setSelectedGameDataSettings(value: GameKeyEnum): void {
      dispatch(setSelectedGameDataSettings(value));
    },
    setWebSignInConfigured(value: boolean): void {
      dispatch(setWebSignInConfigured(value));
    },
    setSearchValue(value: string): void {
      dispatch(setSearchValue(value));
    },
    setCompletedQuests(value: Item[]): void {
      dispatch(setCompletedQuests(value));
    },
    setCompletedCollectables(value: Item[]): void {
      dispatch(setCompletedCollectables(value));
    },
    setCompletedLocations(value: Item[]): void {
      dispatch(setCompletedLocations(value));
    },
    setCompletedMiscItems(value: Item[]): void {
      dispatch(setCompletedMiscItems(value));
    },
  };
};
