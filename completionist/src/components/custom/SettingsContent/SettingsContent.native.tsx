import React, { useState, useRef } from 'react';
import { ScrollView, View, Text as RNText } from 'react-native';
import { useTranslation } from 'react-i18next';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import { SettingsContentDescription } from './SettingsContentStyledComponents.native';
import SelectionList from '@components/general/Lists/SelectionList.native';
import useDLCOptions from './hooks/useDLCOptions';
import useGetShowHideOptions from './hooks/useGetShowHideOptions';
import useSettingsOptionsOnPress from './hooks/useSettingsOptionsOnPress.native';
import SettingsContentSelectLanguage from './SettingsContentSelectLanguage.native';
import SettingsContentAccountDetails from './SettingsContentAccountDetails.native';
import useHandleScroll from '@utils/hooks/useHandleScroll.native';
import SettingsContentCollectionList from './SettingsContentCollectionList.native';
import SettingsContentSelectionDropdown from './SettingsContentSelectionDropdown.native';

const SettingsContent = () => {
	const { t } = useTranslation();
	const scrollViewRef = useRef<ScrollView>(null);
	const languageViewRef = useRef<RNText>(null);
	const { getDLCOptions, setDLCOptions } = useDLCOptions();
	const options = useGetShowHideOptions();
	const { setSettingsOptionsOnPress } = useSettingsOptionsOnPress();
	const [isLanguagesOpen, setLanguagesOpen] = useState<boolean>(false);
	const handleScroll = useHandleScroll();

	return (
		<ScrollableList
			ref={scrollViewRef}
			contentContainerStyle={{ paddingBottom: isLanguagesOpen ? 200 : 100 }}
		>
			<SettingsContentAccountDetails />

			{/* Enable/Disable game collections */}
      <SettingsContentDescription align='left'>
        {t('common:settings.setCollections')}
      </SettingsContentDescription>
      <SettingsContentSelectionDropdown />
      <SettingsContentCollectionList />
			
			{/* Enable/Disable DLC */}
			<SettingsContentDescription align='left'>
				{t('common:settings.enabledDLC')}
			</SettingsContentDescription>
			<SelectionList data={getDLCOptions()} onPress={setDLCOptions} />

			{/* Show/Hide sections */}
			<SettingsContentDescription align='left'>
				{t('common:settings.showHide')}
			</SettingsContentDescription>
			<SelectionList
				data={options}
				onPress={(id: string): void => setSettingsOptionsOnPress(id)}
			/>

			{/* Select language */}
			<SettingsContentDescription ref={languageViewRef} align='left'>
				{t('common:settings.selectLanguage')}
			</SettingsContentDescription>
			<SettingsContentSelectLanguage isOpen={isLanguagesOpen} setOpen={(value: boolean) => {
				setLanguagesOpen(value);
				if (value) {
					languageViewRef?.current?.measureInWindow((_, y, _1, _2) => {
						handleScroll(scrollViewRef, y + 100);
					});
				}
			}} />
		</ScrollableList>
	);
};

export default SettingsContent;