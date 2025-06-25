import { AuthScreenEnum } from '@utils/CustomEnums';
import { GameData } from '@utils/CustomInterfaces';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import { GameListSelectionType } from '@utils/CustomTypes';
import { useState } from 'react';
import { getGameDataFromCache } from '@data/helpers/getGameDataFromCache.native';
import { getMappedGameData } from '@data/helpers/mapGameData.native';
import useGetGameLanguages from '@components/custom/Settings/hooks/useGetGameLanguages';
import useMainState from '@redux/hooks/useMainState';
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
