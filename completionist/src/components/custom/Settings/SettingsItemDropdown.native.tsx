import React from 'react';
import { ViewStyle } from 'react-native';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import { SettingsListItem } from '@utils/CustomInterfaces';
import useGetUserGameData from '@data/hooks/useGetUserGameData';
import {
	styles,
	SettingsSubItemContainer, 
	SettingsScrollView, 
	SettingsTitle, 
	SettingsMainItem, 
	SettingsMainItemTitle 
} from './SettingsStyledComponents.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import useSettingsState from './hooks/useSettingsState';
import useSettingsDispatch from './hooks/useSettingsDispatch';
import useTranslateGameContent from '@utils/hooks/useTranslateGameContent.native';
import useMainState from '@redux/hooks/useMainState';
import CheckBox from '@components/general/Checkbox/CheckBox.native';
import useUpdateGameSettings from './hooks/useUpdateGameSettings';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import { useTranslation } from 'react-i18next';

interface SettingsItemDropdownProps {
	item: SettingsListItem;
}

const SettingsItemDropdown = ({ item }: SettingsItemDropdownProps) => {
	const { t } = useTranslation();
	const theme = useGetTheme();
	const { selectedGameSettings, user } = useMainState();
	const { setUser } = useMainDispatch();
	const { setSelectedCategory } = useSettingsDispatch();
	const { selectedCategory } = useSettingsState();
	const { getUserSettingsSubConfig, getUserSettingsDLC } = useGetUserGameData();
	const { translateCategoryName, translateDLCName } = useTranslateGameContent();
	const updateGameSettings = useUpdateGameSettings();

	const renderSettingsCheckbox = (item: SettingsListItem, style?: ViewStyle) => {
		return (
			<CheckBox
				style={style}
				isActive={item.isActive}
				onPress={(): void => {
					const updatedUser = updateGameSettings(user, item, selectedGameSettings);
					setUser(updatedUser);
				}}
			/>
		)
	};

	return (
		<Dropdown
			isOpen={item.id === selectedCategory.category}
			setOpen={(): void => setSelectedCategory({
				...selectedCategory,
				category: item.id === selectedCategory.category ? '' : item.id
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
						{renderSettingsCheckbox(settingsItem, { marginRight: 20 })}
						{/* <SettingsCheckbox style={{ marginRight: 20 }} item={settingsItem} /> */}
					</SettingsSubItemContainer>
				))
					.concat(
						getUserSettingsDLC(item.id).map((dlcItem, index) => (
							<SettingsSubItemContainer key={`${dlcItem}-${index}`} color={theme.darkGrey}>
								<SettingsTitle color={theme.lightGrey} align='left'>
									{translateDLCName(selectedGameSettings, dlcItem.id)}
								</SettingsTitle>
								{/* <SettingsCheckbox item={dlcItem} /> */}
								{renderSettingsCheckbox(dlcItem)}
							</SettingsSubItemContainer>
						))
					)}
			</SettingsScrollView>
		</Dropdown>
	);
};

export default SettingsItemDropdown;