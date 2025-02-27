import { AuthScreenEnum } from '@utils/CustomEnums';
import { GameData } from '@utils/CustomInterfaces';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import { GameListSelectionType } from '@utils/CustomTypes';
import { useState } from 'react';
import { getGameDataFromCache } from '@data/helpers/getGameDataFromCache.native';

import useContentDispatch from '@components/custom/ContentList/provider/useContentDispatch';
import { getMappedGameData } from '@data/helpers/mapGameData.native';

export const useGameListSelectionDropdown = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const navigation = useReactNavigation();
  const { setSelectedGame, setSelectedGameSettings } = useMainDispatch();
  const { setGameContent } = useContentDispatch();

  const navigateToGame = (game: GameData) => {
    setSelectedGame(game);
    setSelectedGameSettings(game.id);
    navigation.navigate(AuthScreenEnum.DrawerStack);
  };

  const handleGameSelection = (
    game: GameData,
    type: GameListSelectionType,
  ): void => {
    if (type === 'active') {
      getGameDataFromCache(game.id).then(response => {
        const gameData = getMappedGameData(response);
        setGameContent(gameData);
        navigateToGame(game);
      });
    } else {
      navigation.navigate(AuthScreenEnum.PurchaseGame, { gameId: game.id });
    }
  };

  return {
    viewModel: {
      isOpen,
    },
    actions: {
      setIsOpen,
      handleGameSelection,
    },
  };
};
