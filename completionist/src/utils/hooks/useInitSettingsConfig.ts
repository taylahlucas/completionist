import { useEffect } from 'react';
import useMainState from '@redux/hooks/useMainState';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';
import useGetSettingsQuestCategories from '@components/custom/SettingsContent/hooks/useGetSettingsQuestCategories';
import { SettingsConfigItem } from '@utils/CustomInterfaces';
import useSaveUserData from '@data/hooks/useSaveUserData.native';
import { generalSections } from '@utils/constants';

const useInitSettingsConfig = () => {
  const { user, selectedGameSettings } = useMainState();
  const { getSettingsQuestCategories } = useGetSettingsQuestCategories();
  const settingsData = [
    { game: SubscriptionTypeEnum.SKYRIM, config: user.data?.skyrim.settingsConfig },
    { game: SubscriptionTypeEnum.FALLOUT_4, config: user.data?.fallout4.settingsConfig },
  ];
  const { saveUserData } = useSaveUserData();
  const sections = ['Quests', 'Collectables', 'Locations', 'Miscellaneous']

  useEffect(() => {
    settingsData.map((settings, index) => {
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
              categories = getSettingsQuestCategories(settings.game);
              break;
            case 'Collectables':
              // categories = get
          }
        
          // TODO: Check if categories are correct on app
        // Add categories to settings data
          categories.map((category: string): void => {
            configs.push({
              section: section,
              category: category,
              isActive: true
            });
          });
          settingsData[index] = {
            game: settings.game,
            config: configs
          }
        })

        console.log("CONFIGS: ", configs);

        // switch (settings.game) {
        //   case SubscriptionTypeEnum.SKYRIM:
        //     saveUserData({
        //       ...user,
        //       data: {
        //         ...user.data,
        //         skyrim: {
        //           ...user.data.skyrim,
        //           settingsConfig: configs
        //         }
        //       }
        //     });
        //     return;
        //   case SubscriptionTypeEnum.FALLOUT_4:
        //     saveUserData({
        //       ...user,
        //       data: {
        //         ...user.data,
        //         fallout4: {
        //           ...user.data.fallout4,
        //           settingsConfig: configs
        //         }
        //       }
        //     });
        //     return;
        // }
      }
    });

  }, []);
};

export default useInitSettingsConfig;
