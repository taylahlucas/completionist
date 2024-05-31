import React, { useRef, useState } from 'react';
import { ScrollView, Text as RNText } from 'react-native';
import { useTranslation } from 'react-i18next';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import useDLCOptions from '@components/custom/Settings/hooks/useDLCOptions';
import useGetShowHideOptions from '@components/custom/Settings/hooks/useGetShowHideOptions';
import useSettingsOptionsOnPress from '@components/custom/Settings/hooks/useSettingsOptionsOnPress.native';
import useHandleScroll from '@utils/hooks/useHandleScroll.native';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import SettingsAccountDetails from '@components/custom/Settings/SettingsAccountDetails.native';
import { SettingsDescription } from '@components/custom/Settings/SettingsStyledComponents.native';
import SelectionList from '@components/general/Lists/SelectionList.native';
import SettingsSelectLanguage from '@components/custom/Settings/SettingsSelectLanguage.native';
import { DrawerScreenEnum, AuthScreenEnum } from '@utils/CustomEnums';
import SettingsGameCollections from '@components/custom/Settings/SettingsGameCollections.native';
import useMainState from '@redux/hooks/useMainState';

const Settings = () => {
	const { t } = useTranslation();
	const scrollViewRef = useRef<ScrollView>(null);
	const languageViewRef = useRef<RNText>(null);
	const { getDLCOptions, setDLCOptions } = useDLCOptions();
	const options = useGetShowHideOptions();
	const { selectedGame } = useMainState();
	const { setSettingsOptionsOnPress } = useSettingsOptionsOnPress();
	const [isLanguagesOpen, setLanguagesOpen] = useState<boolean>(false);
	const handleScroll = useHandleScroll();
	const isGlobalSettings = !selectedGame;
	
	return (
		<StandardLayout>
			<NavigationHeader 
				id={isGlobalSettings ? AuthScreenEnum.GlobalSettings : DrawerScreenEnum.Settings} 
				title={t('common:screens.settings')}
				leftAction={isGlobalSettings ? 'back' : 'menu'}
			/>
			<ScrollableList
				ref={scrollViewRef}
				contentContainerStyle={{ paddingBottom: isLanguagesOpen ? 200 : 100 }}
			>
				<SettingsAccountDetails />

				{/* Enable/Disable game collections */}
				<SettingsGameCollections />

				{/* Enable/Disable DLC */}
				<SettingsDescription align='left'>
					{t('common:settings.enabledDLC')}
				</SettingsDescription>
				<SelectionList data={getDLCOptions()} onPress={setDLCOptions} />

				{/* Show/Hide sections */}
				<SettingsDescription align='left'>
					{t('common:settings.showHide')}
				</SettingsDescription>
				<SelectionList
					data={options}
					onPress={(id: string): void => setSettingsOptionsOnPress(id)}
				/>

				{/* Select language */}
				<SettingsDescription ref={languageViewRef} align='left'>
					{t('common:settings.selectLanguage')}
				</SettingsDescription>
				<SettingsSelectLanguage isOpen={isLanguagesOpen} setOpen={(value: boolean) => {
					setLanguagesOpen(value);
					if (value) {
						languageViewRef?.current?.measureInWindow((_, y, _1, _2) => {
							handleScroll(scrollViewRef, y + 100);
						});
					}
				}} />
			</ScrollableList>
		</StandardLayout>
	);
};

export default Settings;