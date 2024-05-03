import React from 'react';
import { SettingsListItem } from '@utils/CustomInterfaces';
import CheckBox from '@components/general/Checkbox/CheckBox.native';
import useMainState from '@redux/hooks/useMainState';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useUpdateGameSettings from './hooks/useUpdateGameSettings';

interface SettingsCheckboxProps {
  item: SettingsListItem;
}

const SettingsCheckbox = ({ item }: SettingsCheckboxProps) => {
  const { selectedGameSettings, user } = useMainState();
  const { setUser } = useMainDispatch();
	const updateGameSettings = useUpdateGameSettings();

  return (
    <CheckBox
      isActive={item.isActive}
      onPress={(): void => {
				const updatedUser = updateGameSettings(user, item, selectedGameSettings);
				setUser(updatedUser);
			}}
    />
  );
};

export default SettingsCheckbox;