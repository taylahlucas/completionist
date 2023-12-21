import React from 'react';
import { View } from 'react-native';
import StyledText from '@components/general/Text/StyledText.native';
import SettingsContentCollectionList from './SettingsContentCollectionList.native';
import SettingsContentSelectionDropdown from './SettingsContentSelectionDropdown.native';

const SettingsContent = () => {
  // TODO: Add button to enable/disable DLC
  return (
    <View style={{ marginTop: 32 }}>
      <StyledText style={{ marginLeft: 8, padding: 8 }} type={'ListItemSubTitle'} align={'left'}>Set collections:</StyledText>
      <SettingsContentSelectionDropdown />
      <SettingsContentCollectionList />
    </View>
  );
};

export default SettingsContent;