import React from 'react';
import { SettingsContentDropdownContainer } from './SettingsContentStyledComponents.native';
import { SettingsListItem } from '@utils/CustomInterfaces';
import useGetUserGameData from '@data/hooks/useGetUserGameData';
import SettingsConfigItemDropdown from './SettingsContentItemDropdown.native';

const SettingsContentCollectionList = () => {
  const { getUserSettingsMainConfig } = useGetUserGameData();
  
  return (
    <SettingsContentDropdownContainer>
      {getUserSettingsMainConfig().map((item: SettingsListItem, index: number) => (
        <SettingsConfigItemDropdown key={index} item={item} />
      ))}
    </SettingsContentDropdownContainer>
  );
};

export default SettingsContentCollectionList;
