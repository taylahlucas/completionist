import React, { useState } from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import CustomSearchBar from '@components/general/CustomSearchBar/CustomSearchBar.native';
import { SubscriptionData } from '@utils/CustomInterfaces';
import SelectFirstGameContent from '@components/custom/LoginForm/SelectFirstGameContent.native';
import SelectFirstGameButton from '@components/custom/LoginForm/SelectFirstGameButton';

const SelectFirstGame = () => {
	const [searchValue, setSearchValue] = useState('');
	const [selectedGame, setSelectedGame] = useState<SubscriptionData>();

	// TOOD: Add to translations
	return (
		<StandardLayout>
			<NavigationHeader title={'Select a Game'} leftAction='none' />
			<CustomSearchBar
				searchValue={searchValue}
				setSearchValue={(value: string): void => setSearchValue(value)}
				onReset={(): void => setSearchValue('')}
			/>
			<SelectFirstGameContent 
				searchValue={searchValue}
				selectedGame={selectedGame}
				setSelectedGame={setSelectedGame} 
			/>
			<SelectFirstGameButton 
				selectedGame={selectedGame} 
				setSelectedGame={setSelectedGame} 
			/>
		</StandardLayout>
	);
};

export default SelectFirstGame;