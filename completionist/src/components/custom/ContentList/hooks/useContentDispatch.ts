import { Dispatch } from 'redux';
import { 
  setSectionType,
  setSearchValue,
  setSelectedCategory
} from '../ContentState';
import { useAppDispatch } from '@redux/store';
import { DropDownType } from '@utils/CustomInterfaces';
import { ContentSection } from '@utils/CustomTypes';

interface ContentDispatch {
  setSectionType: (type: ContentSection) => void;
  setSearchValue: (value: string) => void;
  setSelectedCategory: (category: DropDownType) => void;
}

const useContentDispatch = (): ContentDispatch => {
  const dispatch: Dispatch = useAppDispatch();

  return {
    setSectionType(type: ContentSection): void {
      dispatch(setSectionType(type));
    },
    setSearchValue(value: string): void {
      dispatch(setSearchValue(value));
    },
    setSelectedCategory(category: DropDownType): void {
      dispatch(setSelectedCategory(category));
    },
  }
}

export default useContentDispatch;
