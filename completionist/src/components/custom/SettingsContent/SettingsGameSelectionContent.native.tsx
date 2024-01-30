import React from 'react';
import { useTranslation } from 'react-i18next';
import { SettingsContentDescription } from './SettingsContentStyledComponents.native';
import SettingsContentCollectionList from './SettingsContentCollectionList.native';
import SettingsContentSelectionDropdown from './SettingsContentSelectionDropdown.native';

const SettingsGameSelectionContent = () => {
  const { t } = useTranslation();

  return (
    <>
      <SettingsContentDescription align={'left'}>
        {t('common:settings.setCollections')}
      </SettingsContentDescription>
      <SettingsContentSelectionDropdown />
      <SettingsContentCollectionList />
    </>
  );
};

export default SettingsGameSelectionContent;