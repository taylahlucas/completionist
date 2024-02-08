import React from 'react';
import { useTranslation } from 'react-i18next';
import SettingsGameSelectionContent from './SettingsGameSelectionContent.native';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import { SettingsContentDescription } from './SettingsContentStyledComponents.native';
import SelectionList from '@components/general/Lists/SelectionList.native';
import useDLCOptions from './hooks/useDLCOptions';
import useGetShowHideOptions from './hooks/useGetShowHideOptions';
import useSettingsOptionsOnPress from './hooks/useSettingsOptionsOnPress.native';
import SettingsContentSelectLanguage from './SettingsContentSelectLanguage.native';

const SettingsContent = () => {
  const { t } = useTranslation();
  const { getDLCOptions, setDLCOptions } = useDLCOptions();
  const options = useGetShowHideOptions();
  const { setSettingsOptionsOnPress } = useSettingsOptionsOnPress();

  return (
    <ScrollableList contentContainerStyle={{ paddingBottom: 64 }}>
      <SettingsGameSelectionContent />
      
      <SettingsContentDescription align={'left'}>
        {t('common:settings.enabledDLC')}
      </SettingsContentDescription>

      <SelectionList data={getDLCOptions()} onPress={setDLCOptions} />

      <SettingsContentDescription align={'left'}>
        {t('common:settings.showHide')}
      </SettingsContentDescription>
      <SelectionList data={options} onPress={(id: string): void => setSettingsOptionsOnPress(id)} />

	  <SettingsContentDescription align={'left'}>
		Select language:
	  </SettingsContentDescription>

	  <SettingsContentSelectLanguage />

	  <SettingsContentDescription align={'left'}>
		Select primary color:
	  </SettingsContentDescription>

	  <SettingsContentDescription align={'left'}>
		Change username:
	  </SettingsContentDescription>

	  <SettingsContentDescription align={'left'}>
		Change email:
	  </SettingsContentDescription>

    </ScrollableList>
  );
};

export default SettingsContent;