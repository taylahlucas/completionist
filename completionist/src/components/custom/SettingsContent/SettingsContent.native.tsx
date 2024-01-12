import React from 'react';
import { SettingsContentContainer, SettingsContentDescription } from './SettingsContentStyledComponents.native';
import SettingsContentCollectionList from './SettingsContentCollectionList.native';
import SettingsContentSelectionDropdown from './SettingsContentSelectionDropdown.native';

const SettingsContent = () => {
  // TODO: Add button to enable/disable DLC
  // TODO: Open to hide hidden categories
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