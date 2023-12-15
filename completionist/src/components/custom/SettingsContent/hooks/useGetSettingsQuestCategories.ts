import useSettingsState from '@components/custom/SettingsContent/hooks/useSettingsState';
import useGetGameData from '@data/hooks/useGetGameData.native';
import { Quest } from '@utils/CustomInterfaces';

const useGetSettingsQuestCategories = () => {
  const { selectedGameSettings } = useSettingsState();
  const { mapDataToQuests } = useGetGameData(selectedGameSettings);
  const quests = mapDataToQuests();
  
  const getSettingsQuestCategories = (): string[] => {
    let questCategories: string[] = [];
    quests.map(quest => {
      if (!questCategories.find(item => item === quest.mainCategory)) {
        questCategories.push(quest.mainCategory);
      }
    });
    return questCategories;
  }

  const getSettingsQuestSubCategories = (category: string): string[] => {
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