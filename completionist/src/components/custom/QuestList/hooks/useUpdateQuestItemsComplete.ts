import useMainDispatch from '@redux/hooks/useMainDispatch';
import useMainState from '@redux/hooks/useMainState';
import { Item } from '@utils/CustomInterfaces';

const useUpdateQuestItemsComplete = () => {
  const { setCompletedQuests } = useMainDispatch();
  const { user } = useMainState();
  
  // TODO: Fix update
  const updateQuestItemsComplete = (questId: string) => {
    const itemToUpdate = user.data?.skyrim.quests.find(item => item.id === questId);
    if (!!itemToUpdate) {
      const updatedObject = { id: itemToUpdate?.id, isComplete: !itemToUpdate?.isComplete }
      const updateCompletedQuests: Item[] = user.data?.skyrim?.quests.map(quest => quest.id === itemToUpdate.id ? { ...quest, ...updatedObject } : quest)
      setCompletedQuests(updateCompletedQuests);
    }
    else {
      const updateCompletedQuests: Item[] = [...user.data?.skyrim.quests, { id: questId, isComplete: true }];
      setCompletedQuests(updateCompletedQuests);
    }

  };
  
  return { updateQuestItemsComplete };
};

export default useUpdateQuestItemsComplete;