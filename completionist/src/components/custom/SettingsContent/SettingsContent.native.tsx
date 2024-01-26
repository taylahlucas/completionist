import React from 'react';
import { useTranslation } from 'react-i18next';
import SettingsGameSelectionContent from './SettingsGameSelectionContent.native';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import { SettingsContentDescription } from './SettingsContentStyledComponents.native';
import SelectionList from '@components/general/Lists/SelectionList.native';
import useDLCOptions from './hooks/useDLCOptions';
import useGetShowHideOptions from './hooks/useGetShowHideOptions';
import useSettingsOptionsOnPress from './hooks/useSettingsOptionsOnPress.native';

const SettingsContent = () => {
  const { t } = useTranslation();
  const { useGetDLCOptions, useSetDLCOptions } = useDLCOptions();
  const options = useGetShowHideOptions();
  const { settingsOptionsOnPress } = useSettingsOptionsOnPress();
  
  return (
    <ScrollableList>
      <SettingsGameSelectionContent />
      <SettingsContentDescription
        type={'ListItemSubTitle'}
        align={'left'}
      >
        {t('common:settings.enabledDLC')}
      </SettingsContentDescription>
      <SelectionList data={useGetDLCOptions()} onPress={useSetDLCOptions} />

      <SettingsContentDescription
        type={'ListItemSubTitle'}
        align={'left'}
      >
        {t('common:settings.showHide')}
      </SettingsContentDescription>
      <SelectionList data={options} onPress={(id: string): void => settingsOptionsOnPress(id)} />
    </ScrollableList>
  );
};

export default SettingsContent;