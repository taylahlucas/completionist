import {
  GameData,
  AuthScreenEnum,
  GameListSelectionType,
  LanguageType,
} from '@utils/index';
import { useMainDispatch } from '@redux/hooks';
import { useReactNavigation } from '@navigation/hooks';
import { useState } from 'react';
import { getMappedGameData, getGameDataFromCache } from '@data/index';
import { useMainState } from '@redux/hooks';
import { useContentDispatch } from '@features/game-content/provider';
import { getGameLanguages } from '@utils/hooks';

export const useGameListSelectionDropdown = () => {
  const navigation = useReactNavigation();
  const { user } = useMainState();
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
      const gameLanguages = getGameLanguages(game.id);
      if (
        gameLanguages.find(item => item === user.settings.lang) === undefined
      ) {
        //<SelectLanguageModal />
        // TODO: Show popup
      } else {
        const gameLanguage: LanguageType =
          user.gameData.find(item => item.id === game.id)?.lang ?? 'en';
        getGameDataFromCache({
          selectedGame: game.id,
          lang: gameLanguage,
        }).then(response => {
          const gameData = getMappedGameData(response);
          // TODO: Find a better way to do this
          setGameContent(gameData);
          navigateToGame(game);
        });
      }
    } else {
      navigation.navigate(AuthScreenEnum.PurchaseGame, { gameId: game.id });
    }
  };

  return {
    handleGameSelection,
  };
};
