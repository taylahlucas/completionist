import React from 'react';
import { IconTypeEnum, SubscriptionTypeEnum } from '@utils/CustomEnums';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import useGetSettingsQuestCategories from './hooks/useGetSettingsQuestCategories';
import useGetTheme from '@styles/hooks/useGetTheme';
import { style, SettingsContentMainItem, SettingsContentMainItemTitle } from './SettingsContentStyledComponents.native';
import IconButton from '@components/general/Icon/IconButton.native';
import useSettingsState from './hooks/useSettingsState';
import useMainState from '@redux/hooks/useMainState';
import useMainDispatch from '@redux/hooks/useMainDispatch';

const SettingsContentCollectionList = () => {
  const theme = useGetTheme();
  const { setSettingsConfig } = useMainDispatch();
  const { user } = useMainState();
  const { selectedGameSettings } = useSettingsState();
  const { getSettingsQuestCategories } = useGetSettingsQuestCategories();

  return (
    <ScrollableList 
      style={{ ...style.scrollView, borderColor: theme.midGrey }}
      contentContainerStyle={style.scrollContent}
    >
      {getSettingsQuestCategories(selectedGameSettings).map((category: string, index: number) => (
        <SettingsContentMainItem key={index} color={theme.darkGrey}>
          <SettingsContentMainItemTitle align={'left'} type={'ListItemTitleBold'}>{category}</SettingsContentMainItemTitle>
          <IconButton 
            name={'checkbox-outline'} 
            type={IconTypeEnum.Ionicons} 
            color={theme.lightGrey}
            size={22}
            onPress={() => {
              switch (selectedGameSettings) {
                case SubscriptionTypeEnum.SKYRIM:
                  const config = user.data.skyrim.settingsConfig.find(config => config.category === category);
                  if (!!config) {
                   const updatedConfig = user.data.skyrim.settingsConfig.map(item => {
                      if (item.category === category) {
                        return {
                          ...item,
                          isActive: !item.isActive
                        }
                      }
                      else {
                        return item;
                      }
                    });
                    // TODO: Won't work since setSettingsConfig uses selectedGame not selectedGameSettings
                    // setSettingsConfig(updatedConfig);
                  }
                  return

                case SubscriptionTypeEnum.FALLOUT_4:
                  // TODO Move to custom function
                  const config2 = user.data.fallout4.settingsConfig.find(config => config.category === category);
                  if (!!config2) {
                   const updatedConfig = user.data.skyrim.settingsConfig.map(item => {
                      if (item.category === category) {
                        return {
                          ...item,
                          isActive: !item.isActive
                        }
                      }
                      else {
                        return item;
                      }
                    });
                    // setSettingsConfig(updatedConfig);
                  }
                  return
              }
            }} 
          />
        </SettingsContentMainItem>
      ))}
    </ScrollableList>
  );
};

export default SettingsContentCollectionList;