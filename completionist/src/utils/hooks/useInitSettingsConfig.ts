import { useEffect, useState } from 'react';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useMainState from '@redux/hooks/useMainState';
import useGetQuestCategories from '@components/custom/QuestList/hooks/useGetQuestCategories';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';
import useGetSettingsQuestCategories from '@components/custom/SettingsContent/hooks/useGetSettingsQuestCategories';
import { games } from '@utils/constants';
import { GeneralData } from '@utils/CustomInterfaces';

const useInitSettingsConfig = () => {
  const { setSettingsConfig } = useMainDispatch();
  const { user } = useMainState();
  const { getSettingsQuestCategories, getSettingsQuestSubCategories } = useGetSettingsQuestCategories();
  const [settingsData, updateSettingsData] = useState([
    { game: SubscriptionTypeEnum.SKYRIM, config: user.data?.skyrim.settingsConfig },
    { game: SubscriptionTypeEnum.FALLOUT_4, config: user.data?.fallout4.settingsConfig },
  ]);
  
  // TODO: Update settingsConfig with all categories and sub categories if it does not exist
  useEffect(() => {
    settingsData.map((settings, index) => {
      // Check if settings config exists
      if (settings.config.length === 0) {
        const categories = getSettingsQuestCategories(settings.game);
        // Add categories
        categories.map((category: string): void => {

          // let updatedConfig = settings.config;
          const updatedConfig = [
            ...settings.config,
            {
              category: category,
              isActive: true
            }
          ];
          settingsData.findIndex(item => item.game === settings.game)

          // testConfig.push({
          //   category: category,
          //   isActive: true
          // });
          
          // console.log("TEST: ", test)
          // updateSettingsData(test);

          // Add sub categories
          // const subCategories = getSettingsQuestSubCategories(settings.game, category);
          // subCategories.map((subCategory: string): void => {
          //   settings.data.settingsConfig.push({
          //     category: subCategory,
          //     isActive: true
          //   });
          // })
        })
      }
    });

    //   const categories = getSettingsQuestCategories(game);
    //   let gameSettings = [];

    //   categories.map((category) => {
    //     settingsData.push({
    //       category: category,
    //       isActive: true
    //     });
    //     const subCategories = getSettingsQuestSubCategories(game, category);
    //   })


    // })

    // setSettingsConfig({
    //   ...settingsConfig,
    //   skyrim: {},
    //   fallout4: {}
    // })
  }, []);
};

export default useInitSettingsConfig;