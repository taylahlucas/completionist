import React from 'react';
import IconButton from '@components/general/Icon/IconButton.native';
import { IconTypeEnum, SubscriptionTypeEnum } from '@utils/CustomEnums';
import { SettingsConfigItem } from '@utils/CustomInterfaces';
import useGetTheme from '@styles/hooks/useGetTheme';
import useMainState from '@redux/hooks/useMainState';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useUpdateSettingsConfig from './hooks/useUpdateSettingConfig';

interface SettingsContentCheckboxProps {
  item: SettingsConfigItem;
}

const SettingsContentCheckbox = ({ item }: SettingsContentCheckboxProps) => {
  const theme = useGetTheme();
  const { selectedGameSettings, user } = useMainState();
  const { setUser } = useMainDispatch();
  const { updateConfig } = useUpdateSettingsConfig();

  return (
    <IconButton
      name={item.isActive ? 'checkbox-outline' : 'square-outline'}
      type={IconTypeEnum.Ionicons}
      color={theme.lightGrey}
      size={22}
      onPress={() => {
        switch (selectedGameSettings) {
          case SubscriptionTypeEnum.SKYRIM:
            const skyrimConfig = updateConfig(user.data.skyrim.settingsConfig, item)
            setUser({
              ...user,
              data: {
                ...user.data,
                skyrim: {
                  ...user.data.skyrim,
                  settingsConfig: skyrimConfig
                }
              }
            });
            return;

          case SubscriptionTypeEnum.FALLOUT_4:
            const fallout4Config = updateConfig(user.data.fallout4.settingsConfig, item)
            setUser({
              ...user,
              data: {
                ...user.data,
                fallout4: {
                  ...user.data.fallout4,
                  settingsConfig: fallout4Config
                }
              }
            });
            return;
        }
      }}
    />
  );
};

export default SettingsContentCheckbox;