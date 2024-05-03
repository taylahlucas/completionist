import React from 'react';
import { SettingsListItem } from '@utils/CustomInterfaces';
import CheckBox from '@components/general/Checkbox/CheckBox.native';
import useMainState from '@redux/hooks/useMainState';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useUpdateGameSettings from './hooks/useUpdateGameSettings';

interface SettingsContentCheckBoxProps {
  item: SettingsListItem;
}

const SettingsContentCheckBox = ({ item }: SettingsContentCheckBoxProps) => {
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

export default SettingsContentCheckBox;