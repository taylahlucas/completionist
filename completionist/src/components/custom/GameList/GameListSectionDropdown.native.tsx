import React, { useState } from 'react';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import GameListItem from './GameListItem.native';
import { ActiveGameData } from '@utils/CustomInterfaces';
import GameListSectionHeader from './GameListSectionHeader.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import useHandleGameSelection from './hooks/useHandleGameSelection.native';
import { GameListDropdownContainer } from './GameListItemStyledComponents.native';

interface GameListSectionDropdown {
	testID?: string;
	title: string;
	data: ActiveGameData[];
}

const GameListSectionDropdown = ({ testID, title, data }: GameListSectionDropdown) => {
	const theme = useGetTheme();
	const [isOpen, setIsOpen] = useState<boolean>(true);
	const { handleGameSelection } = useHandleGameSelection();

	return (
		<Dropdown
			testID={testID}
			header={<GameListSectionHeader isOpen={isOpen} title={title} />}
			isOpen={isOpen}
			setOpen={() => setIsOpen(!isOpen)}
		>
			<GameListDropdownContainer>
				{data.map((game: ActiveGameData, index: number) => (
					<GameListItem
						key={index}
						game={game}
						enabled={game.isActive}
						enabledColor={game.isActive ? theme.lightGrey : theme.midGrey}
						onPress={(): void => handleGameSelection(game)}
					/>
				))}
			</GameListDropdownContainer>
		</Dropdown>
	);
};

export default GameListSectionDropdown;