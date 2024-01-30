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

  const updateGameSettings = (gameKey: SubscriptionTypeEnum) => {
    const gameConfig = updateConfig(user.data[gameKey].settingsConfig, item);

    setUser({
      ...user,
      data: {
        ...user.data,
        [gameKey]: {
          ...user.data[gameKey],
          settingsConfig: gameConfig,
        },
      },
    });
  };

  return (
    <CheckBox
      isActive={item.isActive}
      onPress={(): void => updateGameSettings(selectedGameSettings)}
    />
  );
};

export default SettingsContentCheckBox;