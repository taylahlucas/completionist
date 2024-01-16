import React from 'react';
import SettingsGameSelectionContent from './SettingsGameSelectionContent.native';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import { SettingsContentDescription } from './SettingsContentStyledComponents.native';
import SelectionList from '@components/general/Lists/SelectionList.native';
import useDLCOptions from './hooks/useDLCOptions';
import useGetShowHideOptions from './hooks/useGetShowHideOptions';

const SettingsContent = () => {
  const { useGetDLCOptions, useSetDLCOptions } = useDLCOptions();
  const options = useGetShowHideOptions();
  // TODO: Add button to enable/disable DLC
  // TODO: Option to hide hidden categories
  return (
    <ScrollableList>
      <SettingsGameSelectionContent />

      <SettingsContentDescription
        type={'ListItemSubTitle'}
        align={'left'}
      >
        Enable/Disable DLC:
      </SettingsContentDescription>
      <SelectionList data={useGetDLCOptions()} onPress={useSetDLCOptions} />

      <SettingsContentDescription
        type={'ListItemSubTitle'}
        align={'left'}
      >
        Show/Hide:
      </SettingsContentDescription>
      <SelectionList data={options} onPress={(id: string): void => {}} />
    </ScrollableList>
  );
};

export default SettingsContent;