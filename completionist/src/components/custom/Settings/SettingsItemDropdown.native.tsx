import React, { useEffect } from 'react';
import { ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import {Dropdown} from '@components/general/Dropdown/index';
import { IsActive } from '@utils/CustomInterfaces';
import {
	styles,
	SettingsSubItemContainer, 
	SettingsScrollView, 
	SettingsTitle, 
	SettingsMainItem, 
	SettingsMainItemTitle 
} from './SettingsStyledComponents.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import useSettingsState from './provider/useSettingsState';
import useSettingsDispatch from './provider/useSettingsDispatch';
import useMainState from '@redux/hooks/useMainState';
import CheckBox from '@components/general/Checkbox/CheckBox.native';
import useUpdateGameSettings from './hooks/useUpdateGameSettings';
import {useEditUserData, useTranslateGameContent, useGetUserGameData} from '@data/hooks/index';

interface SettingsItemDropdownProps {
	item: IsActive;
	triggerListOpen: (value: boolean) => void;
}

const SettingsItemDropdown = ({ item, triggerListOpen }: SettingsItemDropdownProps) => {
	const { t } = useTranslation();
	const theme = useGetTheme();
	const { selectedGameSettings, user } = useMainState();
	const { saveUser } = useEditUserData();
	const { setSelectedCategory } = useSettingsDispatch();
	const { selectedCategory } = useSettingsState();
	const { getUserSettingsSubConfig, getUserSettingsDLC } = useGetUserGameData();
	const { translateCategoryName, translateDLCName } = useTranslateGameContent();
	const updateGameSettings = useUpdateGameSettings();
	const isOpen = item.id === selectedCategory.category;

	const renderSettingsCheckbox = (item: IsActive, style?: ViewStyle) => {
		return (
			<CheckBox
				style={style}
				isActive={item.isActive}
				onPress={(): void => {
					const updatedUser = updateGameSettings(user, item, selectedGameSettings);
					if (updatedUser) {
						saveUser(updatedUser);
					}
				}}
			/>
		)
	};

	useEffect(() => {
		triggerListOpen(isOpen);
	}, [isOpen])

	return (
		<Dropdown
			isOpen={isOpen}
			setOpen={(): void => setSelectedCategory({
				...selectedCategory,
				category: isOpen ? '' : item.id
			})}
			header={
				<SettingsMainItem color={theme.darkGrey}>
					<SettingsMainItemTitle
						align='left'
						type='ListItemSubTitleBold'
						color={theme.lightGrey}
					>
						{t(`common:screens.${item.id.toLowerCase()}`)}
					</SettingsMainItemTitle>
					{renderSettingsCheckbox(item)}
				</SettingsMainItem>
			}
		>
			<SettingsScrollView contentContainerStyle={styles.scrollContent}>
				{getUserSettingsSubConfig(item.id).map((settingsItem, index) => (
					<SettingsSubItemContainer key={index} color={theme.darkGrey}>
						<SettingsTitle color={theme.lightGrey} align='left'>
							{translateCategoryName(selectedGameSettings, item.id, settingsItem.id)}
						</SettingsTitle>
						{renderSettingsCheckbox(settingsItem, { marginRight: 5 })}
					</SettingsSubItemContainer>
				))
					.concat(
						getUserSettingsDLC(item.id).map((dlcItem, index) => (
							<SettingsSubItemContainer key={`${dlcItem}-${index}`} color={theme.darkGrey}>
								<SettingsTitle color={theme.lightGrey} align='left'>
									{translateDLCName(selectedGameSettings, dlcItem.id)}
								</SettingsTitle>
								{renderSettingsCheckbox(dlcItem, { marginRight: 5 })}
							</SettingsSubItemContainer>
						))
					)}
			</SettingsScrollView>
		</Dropdown>
	);
};

export default SettingsItemDropdown;