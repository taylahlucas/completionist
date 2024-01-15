import React from 'react';
import { SettingsContentDescription } from './SettingsContentStyledComponents.native';
import SettingsContentCollectionList from './SettingsContentCollectionList.native';
import SettingsContentSelectionDropdown from './SettingsContentSelectionDropdown.native';
import SelectionList from '@components/general/Lists/SelectionList.native';
import useGetDLCOptions from './hooks/useGetDLCOptions';

const SettingsGameSelectionContent = () => {
  const dlc = useGetDLCOptions();
  // TODO: Add button to enable/disable DLC
  // TODO: Option to hide hidden categories
  return (
    <>
      <SettingsContentDescription align={'left'}>
        Set collections:
      </SettingsContentDescription>
        <SettingsContentSelectionDropdown />
        <SettingsContentCollectionList />

      <SettingsContentDescription
        type={'ListItemSubTitle'}
        align={'left'}
      >
        Enable/Disable DLC:
      </SettingsContentDescription>
      <SelectionList data={dlc} />
    </>
  );
};

export default SettingsGameSelectionContent;