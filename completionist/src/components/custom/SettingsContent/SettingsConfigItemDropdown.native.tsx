import React, { useState } from 'react';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import StyledText from '@components/general/Text/StyledText.native';
import { SettingsConfigItem } from '@utils/CustomInterfaces';
import SettingsContentMainHeader from './SettingsContentMainHeader.native';

interface SettingsConfigItemDropdownProps {
  item: SettingsConfigItem;
}

const SettingsConfigItemDropdown = ({ item }: SettingsConfigItemDropdownProps) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  
  return (
    <Dropdown
      isOpen={isOpen}
      setOpen={() => setOpen(!isOpen)}
      header={<SettingsContentMainHeader item={item} />}
    >
      <StyledText>testing</StyledText>
    </Dropdown>
  );
};

export default SettingsConfigItemDropdown;