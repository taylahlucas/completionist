import useGetGameData from '@data/hooks/useGetGameData.native';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';
import { SettingsConfigItem } from '@utils/CustomInterfaces';

// TODO: Add return type
const useGetSettingsQuestCategories = () => {
  const getSettingsQuestCategories = (selectedGameSettings: SubscriptionTypeEnum): string[] => {
    const { mapDataToQuests } = useGetGameData(selectedGameSettings);
    const quests = mapDataToQuests();
    let questCategories: string[] = [];
    quests.map(quest => {
      if (!questCategories.find(item => item === quest.mainCategory)) {
        questCategories.push(quest.mainCategory);
      }
    });
    return questCategories;
  }

  const getSettingsQuestSubCategories = (selectedGameSettings: SubscriptionTypeEnum, category: string): string[] => {
    const { mapDataToQuests } = useGetGameData(selectedGameSettings);
    const quests = mapDataToQuests();
    const filteredQuests = quests.filter(quest => quest.mainCategory === category);
    let questSubCategories: string[] = [];
    filteredQuests.map(quest => {
      if (!questSubCategories.find(item => item === quest.subCategory)) {
        if (!!quest.subCategory) {
          questSubCategories.push(quest.subCategory);
        }
      }
    });
    return questSubCategories;
  }

  return {
    getSettingsQuestCategories,
    getSettingsQuestSubCategories
  }
};

export default useGetSettingsQuestCategories;