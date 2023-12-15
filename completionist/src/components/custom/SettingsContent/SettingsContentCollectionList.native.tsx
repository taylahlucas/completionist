import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import DropdownSelection from '@components/general/Dropdown/DropdownSelection.native';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';
import DropdownSelectionContent from '@components/general/Dropdown/DropdownSelectionContent.native';
import useSettingsState from './hooks/useSettingsState';
import useSettingsDispatch from './hooks/useSettingsDispatch';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import useGetSettingsQuestCategories from './hooks/useGetSettingsQuestCategories';
import StyledText from '@components/general/Text/StyledText.native';
import useGetTheme from '@styles/hooks/useGetTheme';

const SettingsContentCollectionList = () => {
  const theme = useGetTheme();
  const games = [SubscriptionTypeEnum.SKYRIM, SubscriptionTypeEnum.FALLOUT_4];
  const { getSettingsQuestCategories, getSettingsQuestSubCategories } = useGetSettingsQuestCategories();

  // TODO: Center align
  return (
    <ScrollableList style={{ width: '100%', position: 'absolute', marginTop: 108, maxHeight: 300 }}>
      <View style={{ width: 300, backgroundColor: theme.darkGrey, justifyContent: 'center', alignItems: 'center' }}>
        {getSettingsQuestCategories().map((category: string) => <StyledText>{category}</StyledText>)}
      </View>
    </ScrollableList>
  );
};

export default SettingsContentCollectionList;