import React from 'react';
import { SettingsContentDropdownContainer } from './SettingsContentStyledComponents.native';
import { SettingsConfigItem } from '@utils/CustomInterfaces';
import useGetUserGameData from '@data/hooks/useGetUserGameData.native';
import SettingsConfigItemDropdown from './SettingsContentItemDropdown.native';

const SettingsContentCollectionList = () => {
  const { getUserSettingsMainConfig } = useGetUserGameData();
  console.log("TESTING: ", getUserSettingsMainConfig())
  return (
    <SettingsContentDropdownContainer>
      {getUserSettingsMainConfig().map((item: SettingsConfigItem, index: number) => (
        <SettingsConfigItemDropdown key={index} item={item} />
      ))}
    </SettingsContentDropdownContainer>
  );
};

export default SettingsContentCollectionList;
