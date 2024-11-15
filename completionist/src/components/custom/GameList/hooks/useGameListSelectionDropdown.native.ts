import { AuthScreenEnum } from '@utils/CustomEnums';
import { GameData } from '@utils/CustomInterfaces';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import { GameListSelectionType } from '@utils/CustomTypes';
import { useState } from 'react';

export const useGameListSelectionDropdown = () => {
	const [isOpen, setIsOpen] = useState<boolean>(true);
	const navigation = useReactNavigation();
	const { setSelectedGame, setSelectedGameSettings } = useMainDispatch();

	const handleGameSelection = (game: GameData, type: GameListSelectionType): void => {
		if (type === 'active') {
			setSelectedGame(game);
			setSelectedGameSettings(game.id);
			navigation.navigate(AuthScreenEnum.DrawerStack);
		}
		else {
			navigation.navigate(AuthScreenEnum.PurchaseGame, { gameId: game.id });
		}
	};

	return {
		viewModel: {
			isOpen
		},
		actions: {
			setIsOpen,
			handleGameSelection,
		}
	};
};