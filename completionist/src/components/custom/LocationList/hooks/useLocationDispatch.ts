import { Dispatch } from 'redux';
import { 
  setSearchValue,
  setSelectedCategory
} from '../LocationState';
import { useAppDispatch } from '@redux/store';
import { DropDownType } from '@utils/CustomInterfaces';

interface LocationDispatch {
  setSearchValue: (value: string) => void;
  setSelectedCategory: (category: DropDownType) => void;
}

const useLocationDispatch = (): LocationDispatch => {
  const dispatch: Dispatch = useAppDispatch();

  return {
    setSearchValue(value: string): void {
      dispatch(setSearchValue(value));
    },
    setSelectedCategory(category: DropDownType): void {
      dispatch(setSelectedCategory(category));
    },
  }
}

export default useLocationDispatch;
