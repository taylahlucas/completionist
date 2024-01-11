import { Dispatch } from 'redux';
import { 
  setSearchValue,
  setSelectedCategory
} from '../MiscState';
import { useAppDispatch } from '@redux/store';
import { DropDownType } from '@utils/CustomInterfaces';

interface MiscDispatch {
  setSearchValue: (value: string) => void;
  setSelectedCategory: (category: DropDownType) => void;
}

const useMiscDispatch = (): MiscDispatch => {
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

export default useMiscDispatch;
