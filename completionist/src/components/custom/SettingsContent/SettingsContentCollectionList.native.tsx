import React from 'react';
import { IconTypeEnum, SubscriptionTypeEnum } from '@utils/CustomEnums';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import { style, SettingsContentMainItem, SettingsContentMainItemTitle } from './SettingsContentStyledComponents.native';
import IconButton from '@components/general/Icon/IconButton.native';
import useMainState from '@redux/hooks/useMainState';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import { SettingsConfigItem } from '@utils/CustomInterfaces';
import useUpdateSettingsConfig from './hooks/useUpdateSettingConfig';
import useGetUserGameData from '@data/hooks/useGetUserGameData.native';

const SettingsContentCollectionList = () => {
  const theme = useGetTheme();
  const { setSettingsConfig } = useMainDispatch();
  const { user, selectedGameSettings } = useMainState();
  const { updateConfig } = useUpdateSettingsConfig();
  const { getUserSettingsConfig } = useGetUserGameData();
  
  return (
    <ScrollableList style={{ ...style.scrollView, borderColor: theme.midGrey }}>
      {getUserSettingsConfig().map((item: SettingsConfigItem, index: number) => (
        <SettingsContentMainItem key={index} color={theme.darkGrey}>
          <SettingsContentMainItemTitle align={'left'} type={'ListItemTitleBold'}>{item.category}</SettingsContentMainItemTitle>
          <IconButton 
            name={item.isActive ? 'checkbox-outline' : 'square-outline'} 
            type={IconTypeEnum.Ionicons} 
            color={theme.lightGrey}
            size={22}
            onPress={() => {
              switch (selectedGameSettings) {
                case SubscriptionTypeEnum.SKYRIM:
                  const skyrimConfig = updateConfig(user.data.skyrim.settingsConfig, item)
                  setSettingsConfig(skyrimConfig);
                  return

                case SubscriptionTypeEnum.FALLOUT_4:
                  const fallout4Config = updateConfig(user.data.fallout4.settingsConfig, item)
                  setSettingsConfig(fallout4Config);
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