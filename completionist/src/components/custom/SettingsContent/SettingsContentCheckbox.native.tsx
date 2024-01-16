import React from 'react';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';
import { SettingsConfigItem } from '@utils/CustomInterfaces';
import CheckBox from '@components/general/Checkbox/CheckBox.native';
import useMainState from '@redux/hooks/useMainState';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useUpdateSettingsConfig from './hooks/useUpdateSettingConfig';

interface SettingsContentCheckBoxProps {
  item: SettingsConfigItem;
}

const SettingsContentCheckBox = ({ item }: SettingsContentCheckBoxProps) => {
  const { selectedGameSettings, user } = useMainState();
  const { setUser } = useMainDispatch();
  const { updateConfig } = useUpdateSettingsConfig();

  return (
    <CheckBox
      isActive={item.isActive}
      onPress={(): void => {
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

export default SettingsContentCheckBox;