import React, { useState } from 'react';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import DropdownSelection from '@components/general/Dropdown/DropdownSelection.native';
import DropdownSelectionContent from '@components/general/Dropdown/DropdownSelectionContent.native';
import { languages } from 'src/i18n/i18n-common';

const SettingsContentSelectLanguage = () => {
  const [isSelectionOpen, triggerSelectionOpen] = useState(false);

  // TODO Fix here -- background not working & not scrollable.
  return (
    <Dropdown
      isOpen={isSelectionOpen}
      setOpen={() => null}
      header={
        <DropdownSelection
          title={'English'}
          isSelected={isSelectionOpen}
          onPress={(): void => triggerSelectionOpen(!isSelectionOpen)}
        />
      }
    >
      <DropdownSelectionContent
        content={languages.map(lang => ({
          id: lang,
          title: 'English'
        }))}
        onPress={(value): void => {
          triggerSelectionOpen(false);
		  // TODO: Set selected language
        }}
      />
    </Dropdown>
  );
};

export default SettingsContentSelectLanguage;