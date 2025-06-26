import { GameData, AuthScreenEnum, GameListSelectionType } from '@utils/index';
import { useMainDispatch } from '@redux/hooks';
import { useReactNavigation } from '@navigation/hooks';
import { useState } from 'react';
import { getMappedGameData, getGameDataFromCache } from '@data/index';
import { useGetGameLanguages } from '@components/custom/settings/hooks';
import { useMainState } from '@redux/hooks';
import { useContentDispatch } from '@components/custom/content-list/provider';

export const useGameListSelectionDropdown = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const navigation = useReactNavigation();
  const { user } = useMainState();
  const { setSelectedGame, setSelectedGameSettings } = useMainDispatch();
  const { setGameContent } = useContentDispatch();
  const { getGameLanguages } = useGetGameLanguages();

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
      const gameLanguages = getGameLanguages(game.id);
      if (
        gameLanguages.find(item => item === user.settings.lang) === undefined
      ) {
        //<SelectLanguageModal />
        // TODO: Show popup
      } else {
        getGameDataFromCache({
          selectedGame: game.id,
          lang: user.settings.lang,
        }).then(response => {
          const gameData = getMappedGameData(response);
          setGameContent(gameData);
          navigateToGame(game);
        });
      }
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
