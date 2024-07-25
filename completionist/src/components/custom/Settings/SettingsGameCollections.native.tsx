import React from 'react';
import { Animated } from 'react-native';
import { useTranslation } from 'react-i18next';
import SettingsItemDropdown from '@components/custom/Settings/SettingsItemDropdown.native';
import { SettingsListItem } from '@utils/CustomInterfaces';
import useGetUserGameData from '@data/hooks/useGetUserGameData';
import SettingsSelectionDropdown from '@components/custom/Settings/SettingsSelectionDropdown.native';
import { SettingsCollectionList, SettingsDescription } from '@components/custom/Settings/SettingsStyledComponents.native';
import useMainState from '@redux/hooks/useMainState';

const SettingsGameCollections = () => {
	const { t } = useTranslation();
	const { user, selectedGameData } = useMainState();
	const { getUserSettingsMainConfig } = useGetUserGameData(selectedGameData);
	const config = getUserSettingsMainConfig();
	const minHeight = config.length > 3 ? 200 : 150;
	const height = new Animated.Value(minHeight);

	const toggleHeight = (expanded: boolean) => {
		const newHeight = expanded ? 300 : minHeight;
		Animated.timing(height, {
			toValue: newHeight,
			duration: 300,
			useNativeDriver: false,
		}).start();
	};

	return (
		<>
			<SettingsDescription align='left'>
				{t('common:settings.setCollections')}
			</SettingsDescription>
			<SettingsSelectionDropdown />
			<SettingsCollectionList style={{ height: height }}>
				{config.map((item: SettingsListItem, index: number) => (
					<SettingsItemDropdown key={index} item={item} triggerListOpen={toggleHeight} />
				))}
			</SettingsCollectionList>
		</>
	);
};

export default SettingsGameCollections;