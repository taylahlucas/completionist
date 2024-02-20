import React from 'react';
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
import useGetTheme from '@styles/hooks/useGetTheme';
import { View } from 'react-native';

const SettingsContent = () => {
	const theme = useGetTheme();
	const { t } = useTranslation();
	const navigation = useReactNavigation();
	const { user } = useMainState();
	const { getDLCOptions, setDLCOptions } = useDLCOptions();
	const options = useGetShowHideOptions();
	const { setSettingsOptionsOnPress } = useSettingsOptionsOnPress();

	// TODO: Translations
	return (
		<ScrollableList contentContainerStyle={styles.contentContainer}>
			{/* // Change to avatar */}
			<View style={{ 
				backgroundColor: theme.primaryPurple,
				width: 125,
				height: 125,
				borderRadius: 100,
				alignSelf: 'center',
				marginBottom: 16
				
			}} />
			<StyledText type='ListItemTitleBold'>
				{user.name}
			</StyledText>
			<StyledText style={{ marginTop: 16, marginBottom: 16 }} type='ListItemTitleBold'>
				{user.email}
			</StyledText>
			<Button
				style={{ alignSelf: 'center' }}
				type='navigation'
				title={'Change Account Details'}
				onPress={(): void => navigation.navigate(ScreenEnum.AccountDetails)}
			/>
			<SettingsGameSelectionContent />

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