import React from 'react';
import { GameKeyEnum } from '@utils/CustomEnums';
import { SettingsListItem } from '@utils/CustomInterfaces';
import CheckBox from '@components/general/Checkbox/CheckBox.native';
import useMainState from '@redux/hooks/useMainState';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useUpdateSettingsConfig from './hooks/useUpdateSettingConfig';

interface SettingsContentCheckBoxProps {
  item: SettingsListItem;
}

const SettingsContentCheckBox = ({ item }: SettingsContentCheckBoxProps) => {
  const { selectedGameSettings, user } = useMainState();
  const { setUser } = useMainDispatch();
  const { updateConfig } = useUpdateSettingsConfig();

  const updateGameSettings = (gameKey: GameKeyEnum) => {
    const gameConfig = updateConfig(user.data[gameKey].settingsConfig.general, item);
    
    setUser({
      ...user,
      data: {
        ...user.data,
        [gameKey]: {
          ...user.data[gameKey],
          settingsConfig: {
            general: gameConfig,
            dlc: user.data[gameKey].settingsConfig.dlc
          },
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