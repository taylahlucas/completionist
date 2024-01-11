import { Dispatch } from 'redux';
import { 
  setSearchValue,
  triggerShowSearchResults, 
  setSelectedCategory
} from '../CollectableState';
import { useAppDispatch } from '@redux/store';

interface CollectableDispatch {
  setSearchValue: (value: string) => void;
  triggerShowSearchResults: (value: boolean) => void;
  setSelectedCategory: (category: string) => void;
}

const useCollectableDispatch = (): CollectableDispatch => {
  const dispatch: Dispatch = useAppDispatch();

  return {
    setSearchValue(value: string): void {
      dispatch(setSearchValue(value));
    },
    triggerShowSearchResults(value: boolean): void {
      dispatch(triggerShowSearchResults(value));
    },
    setSelectedCategory(category: string): void {
      dispatch(setSelectedCategory(category));
    },
  }
}

export default useCollectableDispatch;
