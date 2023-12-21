import { useEffect } from 'react';
import useMainState from '@redux/hooks/useMainState';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';
import useGetQuestCategories from '@components/custom/QuestList/hooks/useGetQuestCategories';
import { SettingsConfigItem } from '@utils/CustomInterfaces';
import useSaveUserData from '@data/hooks/useSaveUserData.native';
import { generalSections } from '@utils/constants';
import useGetCollectableCategories from '@components/custom/CollectableList/hooks/useGetCollectableCategories';
import useGetLocationCategories from '@components/custom/LocationList/hooks/useGetLocationCategories';
import useGetMiscItemCategories from '@components/custom/MiscList/hooks/useGetMiscItemCategories';

const useInitSettingsConfig = () => {
  const { user } = useMainState();
  const { getQuestCategories } = useGetQuestCategories();
  const { getCollectableCategories } = useGetCollectableCategories();
  const { getLocationDLC } = useGetLocationCategories();
  const { getMiscItemCategories } = useGetMiscItemCategories();
  const settingsData = [
    { game: SubscriptionTypeEnum.SKYRIM, config: user.data?.skyrim.settingsConfig },
    { game: SubscriptionTypeEnum.FALLOUT_4, config: user.data?.fallout4.settingsConfig },
  ];
  const { saveUserData } = useSaveUserData();

  useEffect(() => {
    settingsData.map((settings) => {
      // If settings config does not exist
      if (settings.config.length === 0) {
        const configs: SettingsConfigItem[] = [];
        
        generalSections.map((section: string) => {
          // Add sections to settings data
          configs.push({
            section: section,
            category: "",
            isActive: true
          })
          let categories: string[] = [];

          switch (section) {
            case 'Quests':
              categories = getQuestCategories(settings.game);
              break;
            case 'Collectables':
              categories = getCollectableCategories(settings.game);
              break;
            case 'Location':
              categories = getLocationDLC(settings.game);
              break;
            case 'Miscellaneous':
              categories = getMiscItemCategories(settings.game);
              break;
          }
          // Add categories to settings data
          categories.map((category: string): void => {
            configs.push({
              section: section,
              category: category,
              isActive: true
            });
          });
        })
        switch (settings.game) {
          case SubscriptionTypeEnum.SKYRIM:
            saveUserData({
              ...user,
              data: {
                ...user.data,
                skyrim: {
                  ...user.data.skyrim,
                  // settingsConfig: [],
                  settingsConfig: configs
                }
              }
            });
            return;
          case SubscriptionTypeEnum.FALLOUT_4:
            saveUserData({
              ...user,
              data: {
                ...user.data,
                fallout4: {
                  ...user.data.fallout4,
                  // settingsConfig: []
                  settingsConfig: configs
                }
              }
            });
            return;
        }
      }
    });
  }, []);
};

export default useInitSettingsConfig;
