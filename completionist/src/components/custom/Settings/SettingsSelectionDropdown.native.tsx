import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import DropdownSelection from '@components/general/Dropdown/DropdownSelection.native';
import DropdownSelectionContent from '@components/general/Dropdown/DropdownSelectionContent.native';
import useMainState from '@redux/hooks/useMainState';
import { games } from '@utils/constants';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useTranslateGameContent from '@utils/hooks/useTranslateGameContent.native';
import { GameKeyEnum } from '@utils/CustomEnums';

const SettingsSelectionDropdown = () => {
	const { t } = useTranslation();
	const { setSelectedGameSettings } = useMainDispatch();
	const { selectedGameSettings } = useMainState();
	const { translateGameName } = useTranslateGameContent();
	const [isSelectionOpen, triggerSelectionOpen] = useState(false);

	return (
		<Dropdown
			isOpen={isSelectionOpen}
			setOpen={() => null}
			header={
				<DropdownSelection
					title={translateGameName(selectedGameSettings)}
					isSelected={isSelectionOpen}
					onPress={(): void => triggerSelectionOpen(!isSelectionOpen)}
				/>
			}
		>
			<DropdownSelectionContent
				content={games.map(game => ({
					id: game,
					title: t(`common:categories.${game}.title`)
				}))}
				onPress={(value): void => {
					triggerSelectionOpen(false);
					setSelectedGameSettings(value as GameKeyEnum);
				}}
			/>
		</Dropdown>
	);
};

export default SettingsSelectionDropdown;