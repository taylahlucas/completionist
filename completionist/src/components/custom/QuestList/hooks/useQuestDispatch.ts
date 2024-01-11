import { Dispatch } from 'redux';
import { 
  setSearchValue,
  triggerShowSearchResults,
  setSelectedCategory
} from '../QuestState';
import { useAppDispatch } from '@redux/store';

interface QuestDispatch {
  setSearchValue: (value: string) => void;
  triggerShowSearchResults: (value: boolean) => void;
  setSelectedCategory: (category: string) => void;
}

const useQuestDispatch = (): QuestDispatch => {
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

export default useQuestDispatch;
