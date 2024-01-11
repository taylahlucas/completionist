import { useSelector } from 'react-redux';
import { QuestState } from '../QuestState';
import { StoreState } from '@utils/CustomInterfaces';

const useQuestState = (): QuestState => {
  return useSelector((state: StoreState) => state.quest);
}

export default useQuestState;