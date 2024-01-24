import { Dispatch } from 'redux';
import { 
  setSelectedSection,
  setSearchValue,
  setSelectedCategory
} from '../ContentState';
import { useAppDispatch } from '@redux/store';
import { DropDownType } from '@utils/CustomInterfaces';
import { ContentSection } from '@utils/CustomTypes';

interface ContentDispatch {
  setSelectedSection: (type: ContentSection) => void;
  setSearchValue: (value: string) => void;
  setSelectedCategory: (category: DropDownType) => void;
}

const useContentDispatch = (): ContentDispatch => {
  const dispatch: Dispatch = useAppDispatch();

  return {
    setSelectedSection(type: ContentSection): void {
      dispatch(setSelectedSection(type));
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
