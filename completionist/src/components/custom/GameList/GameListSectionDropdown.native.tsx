import React from 'react';
import {Dropdown} from '@components/general/Dropdown/index';
import GameListItem from './GameListItem.native';
import { GameData } from '@utils/CustomInterfaces';
import GameListSectionHeader from './GameListSectionHeader.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import { GameListDropdownContainer } from './GameListItemStyledComponents.native';
import { useGameListSelectionDropdown } from './hooks/useGameListSelectionDropdown.native';
import { GameListSelectionType } from '@utils/CustomTypes';

interface GameListSectionDropdown {
	testID?: string;
	type: GameListSelectionType;
	title: string;
	data: GameData[];
}

const GameListSectionDropdown = ({ testID, type, title, data }: GameListSectionDropdown) => {
	const theme = useGetTheme();
	const { viewModel, actions } = useGameListSelectionDropdown();

	return (
		<Dropdown
			testID={testID}
			header={<GameListSectionHeader isOpen={viewModel.isOpen} title={title} />}
			isOpen={viewModel.isOpen}
			setOpen={() => actions.setIsOpen(!viewModel.isOpen)}
		>
			<GameListDropdownContainer>
				{data.map((game: GameData, index: number) => (
					<GameListItem
						key={index}
						game={game}
						enabled={type === 'active'}
						enabledColor={type === 'active' ? theme.lightGrey : theme.midGrey}
						onPress={(): void => actions.handleGameSelection(game, type)}
					/>
				))}
			</GameListDropdownContainer>
		</Dropdown>
	);
};

export default GameListSectionDropdown;