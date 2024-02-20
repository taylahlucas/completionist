import React from 'react';
import { Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import SettingsGameSelectionContent from './SettingsGameSelectionContent.native';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import { styles, SettingsContentDescription } from './SettingsContentStyledComponents.native';
import SelectionList from '@components/general/Lists/SelectionList.native';
import useDLCOptions from './hooks/useDLCOptions';
import useGetShowHideOptions from './hooks/useGetShowHideOptions';
import useSettingsOptionsOnPress from './hooks/useSettingsOptionsOnPress.native';
import SettingsContentSelectLanguage from './SettingsContentSelectLanguage.native';
import Button from '@components/general/Button/Button.native';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import { ScreenEnum } from '@utils/CustomEnums';
import StyledText from '@components/general/Text/StyledText.native';
import useMainState from '@redux/hooks/useMainState';
import Condition from '@components/general/Condition.native';
import SettingsContentAccountDetails from './SettingsContentAccountDetails.native';

const SettingsContent = () => {
	const { t } = useTranslation();
	const { getDLCOptions, setDLCOptions } = useDLCOptions();
	const options = useGetShowHideOptions();
	const { setSettingsOptionsOnPress } = useSettingsOptionsOnPress();

	return (
		<ScrollableList contentContainerStyle={styles.contentContainer}>
			<SettingsContentAccountDetails />

			<SettingsContentDescription align={'left'}>
				{t('common:settings.enabledDLC')}
			</SettingsContentDescription>

			<SelectionList data={getDLCOptions()} onPress={setDLCOptions} />

			<SettingsContentDescription align={'left'}>
				{t('common:settings.showHide')}
			</SettingsContentDescription>
			<SelectionList
				data={options}
				onPress={(id: string): void => setSettingsOptionsOnPress(id)}
			/>

			<SettingsContentDescription align={'left'}>
				Select language:
			</SettingsContentDescription>

			<SettingsContentSelectLanguage />
		</ScrollableList>
	);
};

export default SettingsContent;