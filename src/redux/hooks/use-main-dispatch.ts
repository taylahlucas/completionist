import { Dispatch } from 'redux';
import {
  setShowSplashScreen,
  setShouldUpdateUser,
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
import { GameData, GameKey, IsActive } from '@api/';

// TODO: Change from value to more descriptive value
interface MainDispatch {
  setShowSplashScreen: (value: boolean) => void;
  setShouldUpdateUser: (value: boolean) => void;
  setSelectedGameData: (value?: GameData) => void;
  setSelectedGameDataSettings: (value: GameKey) => void;
  setWebSignInConfigured: (value: boolean) => void;
  setSearchValue: (value: string) => void;
  setCompletedQuests: (value: IsActive[]) => void;
  setCompletedCollectables: (value: IsActive[]) => void;
  setCompletedLocations: (value: IsActive[]) => void;
  setCompletedMiscItems: (value: IsActive[]) => void;
}

export const useMainDispatch = (): MainDispatch => {
  const dispatch: Dispatch = useAppDispatch();

  return {
    setShowSplashScreen(value: boolean): void {
      dispatch(setShowSplashScreen(value));
    },
    setShouldUpdateUser(value: boolean): void {
      dispatch(setShouldUpdateUser(value));
    },
    setSelectedGameData(value?: GameData): void {
      dispatch(setSelectedGameData(value));
    },
    setSelectedGameDataSettings(value: GameKey): void {
      dispatch(setSelectedGameDataSettings(value));
    },
    setWebSignInConfigured(value: boolean): void {
      dispatch(setWebSignInConfigured(value));
    },
    setSearchValue(value: string): void {
      dispatch(setSearchValue(value));
    },
    setCompletedQuests(value: IsActive[]): void {
      dispatch(setCompletedQuests(value));
    },
    setCompletedCollectables(value: IsActive[]): void {
      dispatch(setCompletedCollectables(value));
    },
    setCompletedLocations(value: IsActive[]): void {
      dispatch(setCompletedLocations(value));
    },
    setCompletedMiscItems(value: IsActive[]): void {
      dispatch(setCompletedMiscItems(value));
    },
  };
};
