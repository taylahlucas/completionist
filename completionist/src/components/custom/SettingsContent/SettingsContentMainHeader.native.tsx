import IconButton from '@components/general/Icon/IconButton.native';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useMainState from '@redux/hooks/useMainState';
import useGetTheme from '@styles/hooks/useGetTheme';
import { IconTypeEnum, SubscriptionTypeEnum } from '@utils/CustomEnums';
import { SettingsConfigItem } from '@utils/CustomInterfaces';
import React from 'react';
import useUpdateSettingsConfig from './hooks/useUpdateSettingConfig';
import { SettingsContentMainItem, SettingsContentMainItemTitle } from './SettingsContentStyledComponents.native';

interface SettingsContentMainHeaderProps {
  item: SettingsConfigItem;
}

const SettingsContentMainHeader = ({ item }: SettingsContentMainHeaderProps) => {
  const theme = useGetTheme();
  const { setSettingsConfig } = useMainDispatch();
  const { user, selectedGameSettings } = useMainState(); 
  const { updateConfig } = useUpdateSettingsConfig();

  return (
    <SettingsContentMainItem color={theme.darkGrey}>
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
  );
};

export default SettingsContentMainHeader;