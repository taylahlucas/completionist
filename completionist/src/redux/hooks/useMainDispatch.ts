import { Item, User, UserFormData } from '@utils/CustomInterfaces';
import { Dispatch } from 'redux';
import { 
  setAppState,
  setWebSignInConfigured,
  setLoggedIn,
  setUserFormData,
  setUser,
  setSearchValue, 
  triggerShowSearchResults, 
  setCompletedQuests,
  setCompletedCollectables,
  setCompletedMiscItems,
  setCompletedLocations,
  reset
} from '../MainState';
import { useAppDispatch } from '../store';

interface MainDispatch {
  setAppState: (value: string) => void;
  setWebSignInConfigured: (value: boolean) => void;
  setLoggedIn: (value: boolean) => void;
  setUserFormData: (value: UserFormData) => void;
  setUser: (value: User) => void;
  setSearchValue: (value: string) => void;
  triggerShowSearchResults: (value: boolean) => void;
  setCompletedQuests: (value: Item[]) => void;
  setCompletedCollectables: (value: Item[]) => void;
  setCompletedLocations: (value: Item[]) => void;
  setCompletedMiscItems: (value: Item[]) => void;
  reset: () => void;
}

const useMainDispatch = (): MainDispatch => {
  const dispatch: Dispatch = useAppDispatch();

  return {
    setAppState(value: string): void {
      dispatch(setAppState(value));
    },
    setWebSignInConfigured(value: boolean): void {
      dispatch(setWebSignInConfigured(value));
    },
    setLoggedIn(value: boolean): void {
      dispatch(setLoggedIn(value));
    },
    setUserFormData(value: UserFormData): void {
      dispatch(setUserFormData(value));
    },
    setUser(value: User): void {
      dispatch(setUser(value));
    },
    setSearchValue(value: string): void {
      dispatch(setSearchValue(value));
    },
    triggerShowSearchResults(value: boolean): void {
      dispatch(triggerShowSearchResults(value));
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
