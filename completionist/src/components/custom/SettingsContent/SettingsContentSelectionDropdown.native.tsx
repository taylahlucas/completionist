import React from 'react';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import DropdownSelection from '@components/general/Dropdown/DropdownSelection.native';
import DropdownSelectionContent from '@components/general/Dropdown/DropdownSelectionContent.native';
import useMainState from '@redux/hooks/useMainState';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';
import { games } from '@utils/constants';
import useSettingsDispatch from './hooks/useSettingsDispatch';
import useSettingsState from './hooks/useSettingsState';
import useMainDispatch from '@redux/hooks/useMainDispatch';

const SettingsContentSelectionDropdown = () => {
  const { setSelectedGameSettings } = useMainDispatch();
  const { selectedGameSettings } = useMainState();
  const { triggerSelectionOpen } = useSettingsDispatch();
  const { isSelectionOpen } = useSettingsState();
  
  return (
    <Dropdown
      isOpen={isSelectionOpen}
      setOpen={() => null}
      header={
        <DropdownSelection 
          item={selectedGameSettings} 
          isSelected={isSelectionOpen} 
          onPress={(): void => triggerSelectionOpen(!isSelectionOpen)} 
        />
      }
    >
      <DropdownSelectionContent
        content={games}
        onPress={(value) => {
          triggerSelectionOpen(false);
          setSelectedGameSettings(value as SubscriptionTypeEnum);
        }}
      />
    </Dropdown>
  );
};

export default SettingsContentSelectionDropdown;