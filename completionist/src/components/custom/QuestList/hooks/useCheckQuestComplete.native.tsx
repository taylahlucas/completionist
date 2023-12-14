import { Quest } from '@utils/CustomInterfaces';
import useMainState from '@redux/hooks/useMainState';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';

interface CheckQuestCompleteReturnType {
  checkQuestComplete: (id: string) => boolean;
  checkQuestsCompleteForCategory: (quests: Quest[]) => number;
}

const useCheckQuestComplete = (): CheckQuestCompleteReturnType => {
  const { user, selectedGame } = useMainState();

  const checkQuestComplete = (id: string): boolean => {
    switch (selectedGame) {
      case SubscriptionTypeEnum.SKYRIM:
        return !!user.data?.skyrim.quests.find(item => item.id === id && item.isComplete);
      case SubscriptionTypeEnum.FALLOUT_4:
        return !!user.data?.fallout4.quests.find(item => item.id === id && item.isComplete)
      default:
        return false
    }
  };

  const checkQuestsCompleteForCategory = (quests: Quest[]): number => {
    let count = 0;
    switch (selectedGame) {
      case SubscriptionTypeEnum.SKYRIM:
        user.data?.skyrim.quests.forEach((quest) => {
          quests.forEach((item) => {
            if (quest.id === item.id && quest.isComplete) {
              count += 1;
            }
          });
        })
        return count;
      case SubscriptionTypeEnum.FALLOUT_4:
        user.data?.fallout4.quests.forEach((quest) => {
          quests.forEach((item) => {
            if (quest.id === item.id && quest.isComplete) {
              count += 1;
            }
          });
        })
        return count;
      default:
        return 0;
    }
    
  }

  return { checkQuestComplete, checkQuestsCompleteForCategory }
}

export default useCheckQuestComplete;