import { SkyrimQuest } from '@utils/CustomInterfaces';
import useMainState from '@redux/hooks/useMainState';

interface CheckQuestCompleteReturnType {
  checkQuestComplete: (id: string) => boolean;
  checkQuestsCompleteForCategory: (quests: SkyrimQuest[]) => number;
}

const useCheckQuestComplete = (): CheckQuestCompleteReturnType => {
  const { completedQuests } = useMainState();

  const checkQuestComplete = (id: string): boolean => {
    return !!completedQuests.find(questId => questId === id)
  };

  const checkQuestsCompleteForCategory = (quests: SkyrimQuest[]): number => {
    let count = 0;
    completedQuests.forEach((questId) => {
      quests.forEach((quest) => {
        if (questId === quest.id) {
          count += 1;
        }
      });
    })
    return count;
  }

  return { checkQuestComplete, checkQuestsCompleteForCategory }
}

export default useCheckQuestComplete;