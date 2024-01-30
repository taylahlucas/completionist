import React from 'react';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';
import { SettingsConfigItem } from '@utils/CustomInterfaces';
import CheckBox from '@components/general/Checkbox/CheckBox.native';
import useMainState from '@redux/hooks/useMainState';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useUpdateSettingsConfig from './hooks/useUpdateSettingConfig';
import { GameKey } from '@utils/CustomTypes';

interface SettingsContentCheckBoxProps {
  item: SettingsConfigItem;
}

const SettingsContentCheckBox = ({ item }: SettingsContentCheckBoxProps) => {
  const { selectedGameSettings, user } = useMainState();
  const { setUser } = useMainDispatch();
  const { updateConfig } = useUpdateSettingsConfig();

  const updateGameSettings = (gameKey: GameKey) => {
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
      onPress={(): void => {
        switch (selectedGameSettings) {
          case SubscriptionTypeEnum.SKYRIM:
            updateGameSettings('skyrim');
            return;

          case SubscriptionTypeEnum.FALLOUT_4:
            updateGameSettings('fallout4');
            return;
        }
      }}
    />
  );
};

export default SettingsContentCheckBox;