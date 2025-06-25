import { AuthScreenEnum } from '@utils/CustomEnums';
import { GameData } from '@utils/CustomInterfaces';
import useMainDispatch from '@redux/hooks/use-main-dispatch';
import useReactNavigation from '@navigation/hooks/use-react-navigation';
import { GameListSelectionType } from '@utils/CustomTypes';
import { useState } from 'react';
import { getGameDataFromCache } from '@data/helpers/get-game-data-from-cache';
import { getMappedGameData } from '@data/helpers/map-game-data';
import useGetGameLanguages from '@components/custom/settings/hooks/use-get-game-languages';
import useMainState from '@redux/hooks/use-main-state';
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
