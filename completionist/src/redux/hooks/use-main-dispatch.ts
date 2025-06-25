import { Dispatch } from 'redux';
import { GameKeyEnum } from '@utils/custom-enums';
import { GameData, Item, User } from '@utils/custom-interfaces';
import { ScreenEnumType } from '@utils/custom-types';
import {
  setShowSplashScreen,
  setAppState,
  setCurrentScreen,
  setSelectedGame,
  setSelectedGameSettings,
  setWebSignInConfigured,
  setUser,
  setShouldUpdateUser,
  setSearchValue,
  setCompletedQuests,
  setCompletedCollectables,
  setCompletedMiscItems,
  setCompletedLocations,
  reset,
} from '../main-state';
import { useAppDispatch } from '../store';

// TODO: Change from value to more descriptive value
interface MainDispatch {
  setShowSplashScreen: (value: boolean) => void;
  setAppState: (value: string) => void;
  setCurrentScreen: (value: ScreenEnumType) => void;
  setSelectedGame: (value?: GameData) => void;
  setSelectedGameSettings: (value: GameKeyEnum) => void;
  setWebSignInConfigured: (value: boolean) => void;
  setUser: (value: User) => void;
  setShouldUpdateUser: (value: boolean) => void;
  setSearchValue: (value: string) => void;
  setCompletedQuests: (value: Item[]) => void;
  setCompletedCollectables: (value: Item[]) => void;
  setCompletedLocations: (value: Item[]) => void;
  setCompletedMiscItems: (value: Item[]) => void;
  reset: () => void;
}

export const useMainDispatch = (): MainDispatch => {
  const dispatch: Dispatch = useAppDispatch();

  return {
    setShowSplashScreen(value: boolean): void {
      dispatch(setShowSplashScreen(value));
    },
    setAppState(value: string): void {
      dispatch(setAppState(value));
    },
    setCurrentScreen(value: ScreenEnumType): void {
      dispatch(setCurrentScreen(value));
    },
    setSelectedGame(value?: GameData): void {
      dispatch(setSelectedGame(value));
    },
    setSelectedGameSettings(value: GameKeyEnum): void {
      dispatch(setSelectedGameSettings(value));
    },
    setWebSignInConfigured(value: boolean): void {
      dispatch(setWebSignInConfigured(value));
    },
    setUser(value: User): void {
      dispatch(setUser(value));
    },
    setShouldUpdateUser(value: boolean): void {
      dispatch(setShouldUpdateUser(value));
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
    reset(): void {
      dispatch(reset());
    },
  };
};
