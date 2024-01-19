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
  const { updateUser } = useSaveUserData();

  useEffect(() => {   
    let updatedUser = user;
    settingsData.map((settings) => {
      const configs: SettingsConfigItem[] = [...settings.config];

      generalSections.map((section) => {
        let categories: string[] = [];
        switch (section) {
          case 'Quests':
            categories = getQuestCategories(settings.game);
            break;
          case 'Collectables':
            categories = getCollectableCategories(settings.game);
            break;
          case 'Locations':
            categories = getLocationDLC(settings.game);
            break;
          case 'Miscellaneous':
            categories = getMiscItemCategories(settings.game);
            break;
        }
        
        if (!settings.config.find(config => config.section === section && config.category === "")) {
          configs.push({
            section: section,
            category: "",
            isActive: true
          });
        }

        categories.map(category => {
          if (!settings.config.find(config => category === config.category && section === config.section)) {
            configs.push({
              section: section,
              category: category,
              isActive: true
            });
          }
        });
      });
      if (configs !== settings.config) {
        switch (settings.game) {
          case SubscriptionTypeEnum.SKYRIM:
            updatedUser = {
              ...user,
              data: {
                ...user.data,
                skyrim: {
                  ...user.data.skyrim,
                  settingsConfig: configs
                }
              }
            };
            return;
          case SubscriptionTypeEnum.FALLOUT_4:
            updatedUser = {
              ...user,
              data: {
                ...user.data,
                skyrim: {
                  ...user.data.skyrim,
                  settingsConfig: configs
                }
              }
            };
            return;
        }
      }
    });
    updateUser(updatedUser);
  }, []);
};

export default useInitSettingsConfig;
