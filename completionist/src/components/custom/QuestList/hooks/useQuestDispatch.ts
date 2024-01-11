import { Dispatch } from 'redux';
import { 
  setSearchValue,
  setSelectedCategory
} from '../QuestState';
import { useAppDispatch } from '@redux/store';
import { DropDownType } from '@utils/CustomInterfaces';

interface QuestDispatch {
  setSearchValue: (value: string) => void;
  setSelectedCategory: (category: DropDownType) => void;
}

const useQuestDispatch = (): QuestDispatch => {
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

export default useQuestDispatch;
