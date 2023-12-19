import React from 'react';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import { style } from './SettingsContentStyledComponents.native';
import { SettingsConfigItem } from '@utils/CustomInterfaces';
import useGetUserGameData from '@data/hooks/useGetUserGameData.native';
import SettingsConfigItemDropdown from './SettingsConfigItemDropdown.native';

const SettingsContentCollectionList = () => {
  const theme = useGetTheme();
  const { getUserSettingsConfig } = useGetUserGameData();

  // Change to Quests, Collectables, Locations and Misc settings
  return (
    <ScrollableList 
      style={{ ...style.scrollView, borderColor: theme.midGrey }}
      contentContainerStyle={style.scrollContent}
    >
      {getUserSettingsConfig().map((item: SettingsConfigItem, index: number) => (
        <SettingsConfigItemDropdown key={index} item={item} />
      ))}
    </ScrollableList>
  );
};

export default SettingsContentCollectionList;