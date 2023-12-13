import { SkyrimQuest } from '@utils/CustomInterfaces';
import useMainState from '@redux/hooks/useMainState';

interface CheckQuestCompleteReturnType {
  checkQuestComplete: (id: string) => boolean;
  checkQuestsCompleteForCategory: (quests: SkyrimQuest[]) => number;
}

const useCheckQuestComplete = (): CheckQuestCompleteReturnType => {
  const { user } = useMainState();

  const checkQuestComplete = (id: string): boolean => {
    return !!user.data.skyrim.quests.find(item => item.id === id)
  };

  const checkQuestsCompleteForCategory = (quests: SkyrimQuest[]): number => {
    let count = 0;
    user.data.skyrim.quests.forEach((completedQuest) => {
      quests.forEach((quest) => {
        if (completedQuest.id === quest.id) {
          count += 1;
        }
      });
    })
    return count;
  }

  return { checkQuestComplete, checkQuestsCompleteForCategory }
}

export default useCheckQuestComplete;