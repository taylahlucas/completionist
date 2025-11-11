import {
  GameData,
  AuthScreenEnum,
  GameListSelectionType,
  LanguageType,
} from '@utils/index';
import { useMainDispatch } from '@redux/hooks';
import { useReactNavigation } from '@navigation/hooks';
import { getMappedGameData, getGameDataFromCache } from '@data/index';
import { useMainState } from '@redux/hooks';
import { useContentDispatch } from '@features/game-content/provider';
import { isLangAvailableInGame } from '@utils/helpers/index';
import { useTranslation } from 'react-i18next';

export const useGameListSelectionDropdown = () => {
  const { i18n } = useTranslation();
  const navigation = useReactNavigation();
  const { user } = useMainState();
  const { setSelectedGameData, setSelectedGameDataSettings } =
    useMainDispatch();
  const { setGameContent } = useContentDispatch();

  const navigateToGame = (game: GameData) => {
    setSelectedGameData(game);
    setSelectedGameDataSettings(game.id);
    navigation.navigate(AuthScreenEnum.DrawerStack);
  };

  const handleGameSelection = (
    game: GameData,
    type: GameListSelectionType,
  ): void => {
    if (type === 'active') {
      const gameLanguage: LanguageType =
        user.gameData.find(item => item.id === game.id)?.lang ?? 'en';
      const settingsLang = user.settings.lang;

      if (
        gameLanguage !== settingsLang &&
        isLangAvailableInGame(settingsLang, game.id)
      ) {
        navigation.navigate(AuthScreenEnum.SelectGameLanguage, {
          gameId: game.id,
        });
      } else {
        i18n.changeLanguage(gameLanguage);
        getGameDataFromCache({
          selectedGame: game.id,
          lang: gameLanguage,
        }).then(response => {
          const gameData = getMappedGameData(response);
          // TODO: Find a better way to do this ?
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
