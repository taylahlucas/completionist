import { Dispatch } from 'redux';
import { ScreenEnum, GameKeyEnum } from '@utils/CustomEnums';
import { Item, User } from '@utils/CustomInterfaces';
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
	reset
} from '../MainState';
import { useAppDispatch } from '../store';

// TODO: Change from value to more descriptive value
interface MainDispatch {
	setShowSplashScreen: (value: boolean) => void;
	setAppState: (value: string) => void;
	setCurrentScreen: (value: ScreenEnum) => void;
	setSelectedGame: (value?: GameKeyEnum) => void;
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

const useMainDispatch = (): MainDispatch => {
	const dispatch: Dispatch = useAppDispatch();

	return {
		setShowSplashScreen(value: boolean): void {
			dispatch(setShowSplashScreen(value));
		},
		setAppState(value: string): void {
			dispatch(setAppState(value));
		},
		setCurrentScreen(value: string): void {
			dispatch(setCurrentScreen(value));
		},
		setSelectedGame(value?: GameKeyEnum): void {
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
		}
	}
}

export default useMainDispatch;
