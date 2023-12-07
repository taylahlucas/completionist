import { Dispatch } from 'redux';
import { 
  setLoggedIn,
  setSearchValue, 
  triggerShowSearchResults, 
  setCompletedQuestIds,
  setCompletedCollectableIds,
  setCompletedBookIds,
  setCompletedLocationIds,
  reset
} from '../MainState';
import { useAppDispatch } from '../store';

interface MainDispatch {
  setLoggedIn: (value: boolean) => void;
  setSearchValue: (value: string) => void;
  triggerShowSearchResults: (value: boolean) => void;
  setCompletedQuestIds: (value: string[]) => void;
  setCompletedCollectableIds: (value: string[]) => void;
  setCompletedBookIds: (value: string[]) => void;
  setCompletedLocationIds: (value: string[]) => void;
  reset: () => void;
}

const useMainDispatch = (): MainDispatch => {
  const dispatch: Dispatch = useAppDispatch();

  return {
    setLoggedIn(value: boolean): void {
      dispatch(setLoggedIn(value));
    },
    setSearchValue(value: string): void {
      dispatch(setSearchValue(value));
    },
    triggerShowSearchResults(value: boolean): void {
      dispatch(triggerShowSearchResults(value));
    },
    setCompletedQuestIds(value: string[]): void {
      dispatch(setCompletedQuestIds(value));
    },
    setCompletedCollectableIds(value: string[]): void {
      dispatch(setCompletedCollectableIds(value));
    },
    setCompletedBookIds(value: string[]): void {
      dispatch(setCompletedBookIds(value));
    },
    setCompletedLocationIds(value: string[]): void {
      dispatch(setCompletedLocationIds(value));
    },
    reset(): void {
      dispatch(reset());
    }
  }
}

export default useMainDispatch;
