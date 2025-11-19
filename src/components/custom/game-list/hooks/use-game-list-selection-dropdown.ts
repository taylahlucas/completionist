import {
  GameData,
  AuthScreenEnum,
  GameListSelectionType,
  LanguageType,
  DEFAULT_LANG,
} from '@utils/index';
import { useMainDispatch } from '@redux/hooks';
import { useReactNavigation } from '@navigation/hooks';
import { getMappedGameData, getGameDataFromCache } from '@data/index';
import { useContentDispatch } from '@features/game-content/provider';
import { isLangAvailableInGame } from '@utils/helpers/index';
import { useTranslation } from 'react-i18next';
import { useAuthState } from '@redux/auth';

export const useGameListSelectionDropdown = () => {
  const { i18n } = useTranslation();
  const navigation = useReactNavigation();
  const { user } = useAuthState();
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
        user?.gameData.find(item => item.id === game.id)?.lang ?? DEFAULT_LANG;
      const settingsLang = user?.settings.lang ?? DEFAULT_LANG;

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
