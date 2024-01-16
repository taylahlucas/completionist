import React from 'react';
import { SettingsContentDescription } from './SettingsContentStyledComponents.native';
import SettingsContentCollectionList from './SettingsContentCollectionList.native';
import SettingsContentSelectionDropdown from './SettingsContentSelectionDropdown.native';

const SettingsGameSelectionContent = () => {
  // TODO: Option to hide hidden categories
  return (
    <>
      <SettingsContentDescription align={'left'}>
        Set collections:
      </SettingsContentDescription>
      <SettingsContentSelectionDropdown />
      <SettingsContentCollectionList />
    </>
  );
};

export default SettingsGameSelectionContent;