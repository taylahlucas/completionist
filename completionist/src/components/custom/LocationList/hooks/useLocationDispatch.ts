import { Dispatch } from 'redux';
import { 
  setSearchValue,
  triggerShowSearchResults, 
  setSelectedCategory
} from '../LocationState';
import { useAppDispatch } from '@redux/store';
import { DropDownType } from '@utils/CustomInterfaces';

interface LocationDispatch {
  setSearchValue: (value: string) => void;
  triggerShowSearchResults: (value: boolean) => void;
  setSelectedCategory: (category: DropDownType) => void;
}

const useLocationDispatch = (): LocationDispatch => {
  const dispatch: Dispatch = useAppDispatch();

  return {
    setSearchValue(value: string): void {
      dispatch(setSearchValue(value));
    },
    triggerShowSearchResults(value: boolean): void {
      dispatch(triggerShowSearchResults(value));
    },
    setSelectedCategory(category: DropDownType): void {
      dispatch(setSelectedCategory(category));
    },
  }
}

export default useLocationDispatch;
