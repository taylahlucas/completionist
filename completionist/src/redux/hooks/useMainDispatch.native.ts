import { Dispatch } from 'redux';
import { 
  setSearchValue, 
  triggerShowSearchResults, 
  reset,
  setCompletedBookIds
} from '../MainState.native';
import { useAppDispatch } from '../store.native';

interface MainDispatch {
  setSearchValue: (value: string) => void;
  triggerShowSearchResults: (value: boolean) => void;
  setCompletedBookIds: (value: string[]) => void;
  reset: () => void;
}

const useMainDispatch = (): MainDispatch => {
  const dispatch: Dispatch = useAppDispatch();

  return {
    setSearchValue(value: string): void {
      dispatch(setSearchValue(value));
    },
    triggerShowSearchResults(value: boolean): void {
      dispatch(triggerShowSearchResults(value));
    },
    setCompletedBookIds(value: string[]): void {
      dispatch(setCompletedBookIds(value));
    },
    reset(): void {
      dispatch(reset());
    }
  }
}

export default useMainDispatch;
