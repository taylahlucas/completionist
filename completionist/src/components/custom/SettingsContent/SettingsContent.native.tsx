import React from 'react';
import { SettingsContentContainer, SettingsContentDescription } from './SettingsContentStyledComponents.native';
import StyledText from '@components/general/Text/StyledText.native';
import SettingsContentCollectionList from './SettingsContentCollectionList.native';
import SettingsContentSelectionDropdown from './SettingsContentSelectionDropdown.native';

const SettingsContent = () => {
  // TODO: Add button to enable/disable DLC
  return (
    <SettingsContentContainer>
      <SettingsContentDescription 
        type={'ListItemSubTitle'} 
        align={'left'}
      >
        Set collections:
      </SettingsContentDescription>
      <SettingsContentSelectionDropdown />
      <SettingsContentCollectionList />
    </SettingsContentContainer>
  );
};

export default SettingsContent;