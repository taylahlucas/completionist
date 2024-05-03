import React from 'react';
import { SettingsDropdownContainer } from './SettingsStyledComponents.native';
import { SettingsListItem } from '@utils/CustomInterfaces';
import useGetUserGameData from '@data/hooks/useGetUserGameData';
import SettingsConfigItemDropdown from './SettingsItemDropdown.native';

const SettingsCollectionList = () => {
  const { getUserSettingsMainConfig } = useGetUserGameData();
  
  return (
    <SettingsDropdownContainer>
      {getUserSettingsMainConfig().map((item: SettingsListItem, index: number) => (
        <SettingsConfigItemDropdown key={index} item={item} />
      ))}
    </SettingsDropdownContainer>
  );
};

export default SettingsCollectionList;
