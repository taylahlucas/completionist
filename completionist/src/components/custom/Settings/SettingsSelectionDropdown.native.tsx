import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import DropdownSelection from '@components/general/Dropdown/DropdownSelection.native';
import DropdownSelectionContent from '@components/general/Dropdown/DropdownSelectionContent.native';
import useMainState from '@redux/hooks/useMainState';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useTranslateGameContent from '@utils/hooks/useTranslateGameContent.native';
import { GameKeyEnum } from '@utils/CustomEnums';
import useFilterGameList from '@components/custom/GameList/hooks/useFilterGameList.native';
import { useGetActiveGames } from '@utils/hooks/useGetActiveGames.native';
import { IsActive } from '@utils/CustomInterfaces';
import { allGameData } from '@utils/gameConfigs';

const SettingsSelectionDropdown = () => {
	const { t } = useTranslation();
	const { setSelectedGameSettings } = useMainDispatch();
	const { user, selectedGameSettings } = useMainState();
	const { translateGameName } = useTranslateGameContent();
	const { filterGameList } = useFilterGameList();
	const [isSelectionOpen, triggerSelectionOpen] = useState(false);
	// const { mappedActiveGames } = useGetActiveGames(user);

	// TODO: Fix allGameData
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
				content={filterGameList(Object.entries(allGameData), true, '').map(game => ({
					id: game.id,
					title: t(`common:categories.${game.id}.title`)
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