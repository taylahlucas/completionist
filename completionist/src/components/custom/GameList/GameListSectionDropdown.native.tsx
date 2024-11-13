import React, { useState } from 'react';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import GameListItem from './GameListItem.native';
import { GameData } from '@utils/CustomInterfaces';
import GameListSectionHeader from './GameListSectionHeader.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import { GameListDropdownContainer } from './GameListItemStyledComponents.native';
import { useGameListItem } from './hooks/useGameListItem.native';

interface GameListSectionDropdown {
	testID?: string;
	title: string;
	data: GameData[];
}

const GameListSectionDropdown = ({ testID, title, data }: GameListSectionDropdown) => {
	const theme = useGetTheme();
	const [isOpen, setIsOpen] = useState<boolean>(true);
	const { actions } = useGameListItem();

	return (
		<Dropdown
			testID={testID}
			header={<GameListSectionHeader isOpen={isOpen} title={title} />}
			isOpen={isOpen}
			setOpen={() => setIsOpen(!isOpen)}
		>
			<GameListDropdownContainer>
				{data.map((game: GameData, index: number) => (
					<GameListItem
						key={index}
						game={game}
						enabled={game[1].isActive}
						enabledColor={game.isActive ? theme.lightGrey : theme.midGrey}
						onPress={(): void => actions.handleGameSelection(game)}
					/>
				))}
			</GameListDropdownContainer>
		</Dropdown>
	);
};

export default GameListSectionDropdown;