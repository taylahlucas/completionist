import { Dispatch } from 'redux';
import { 
  setSearchValue,
  setSelectedCategory
} from '../MiscState';
import { useAppDispatch } from '@redux/store';

interface MiscDispatch {
  setSearchValue: (value: string) => void;
  setSelectedCategory: (category: string) => void;
}

const useMiscDispatch = (): MiscDispatch => {
  const dispatch: Dispatch = useAppDispatch();

  return {
    setSearchValue(value: string): void {
      dispatch(setSearchValue(value));
    },
    setSelectedCategory(category: string): void {
      dispatch(setSelectedCategory(category));
    },
  }
}

export default useMiscDispatch;
