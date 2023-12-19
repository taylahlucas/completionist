import { useEffect } from 'react';
import useMainState from '@redux/hooks/useMainState';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';
import useGetSettingsQuestCategories from '@components/custom/SettingsContent/hooks/useGetSettingsQuestCategories';
import { SettingsConfigItem } from '@utils/CustomInterfaces';
import useSaveUserData from '@data/hooks/useSaveUserData.native';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import { setSelectedGameSettings } from '@redux/MainState';

const useInitSettingsConfig = () => {
  const { user, selectedGameSettings } = useMainState();
  const { getSettingsQuestCategories } = useGetSettingsQuestCategories();
  const settingsData = [
    { game: SubscriptionTypeEnum.SKYRIM, config: user.data?.skyrim.settingsConfig },
    { game: SubscriptionTypeEnum.FALLOUT_4, config: user.data?.fallout4.settingsConfig },
  ];
  const { saveUserData } = useSaveUserData();

  useEffect(() => {
    settingsData.map((settings, index) => {
      // If settings config does not exist
      if (settings.config.length === 0) {
        const configs: SettingsConfigItem[] = [];

        const categories = getSettingsQuestCategories(settings.game);
        // Add categories
        categories.map((category: string): void => {
          configs.push({
            category: category,
            isActive: true
          });
        });
        settingsData[index] = {
          game: settings.game,
          config: configs
        }
        switch (settings.game) {
          case SubscriptionTypeEnum.SKYRIM:
            saveUserData({
              ...user,
              data: {
                ...user.data,
                skyrim: {
                  ...user.data.skyrim,
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
