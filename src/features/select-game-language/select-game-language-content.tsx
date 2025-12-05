import {
  Button,
  SheetContentLayout,
  Spacing,
  StyledText,
} from '@components/general';
import {
  getGameDataFromCache,
  getMappedGameData,
  useEditUserData,
} from '@data/index';
import { GameData, GameKey, updateUser } from '@api/';
import { useContentDispatch } from '@features/game-content/provider';
import { useReactNavigation } from '@navigation/hooks';
import { useAuthUser } from '@redux/auth';
import { useMainDispatch } from '@redux/hooks';
import useGetTheme from '@styles/hooks/use-get-theme';
import { AuthScreenEnum } from '@utils/custom-enums';
import { LanguageType } from '@utils/custom-types';
import { userWithUpdatedGameLanguage } from '@utils/helpers/index';
import { useFilterGameList } from '@hooks/';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const SelectGameLanguageContent = ({ gameId }: { gameId: GameKey }) => {
  const { t, i18n } = useTranslation();
  const navigation = useReactNavigation();
  const theme = useGetTheme();
  const user = useAuthUser();
  const { setSelectedGameData, setSelectedGameDataSettings } =
    useMainDispatch();
  const { setGameContent } = useContentDispatch();
  const { filterGameListById } = useFilterGameList();
  // TODO: Handle no user?
  const userGameData = user && filterGameListById(gameId, user.gameData);
  const { saveUser } = useEditUserData();

  if (!userGameData) {
    navigation.goBack();
    return;
  }

  const navigateToGame = (lang: LanguageType, game: GameData) => {
    setSelectedGameData({
      ...game,
      lang,
    });
    setSelectedGameDataSettings(game.id);
    navigation.navigate(AuthScreenEnum.DrawerStack);
  };

  const goToGame = (lang: LanguageType) => {
    const updatedUser = userWithUpdatedGameLanguage(lang, user, userGameData);

    getGameDataFromCache({
      selectedGame: gameId,
      lang: lang as LanguageType,
    }).then(response => {
      const gameData = getMappedGameData(response);
      setGameContent(gameData);
      navigateToGame(lang, userGameData);

      updateUser(updatedUser).then(() => {
        saveUser(updatedUser);
      });
    });
  };

  // TODO: Add to translations
  return (
    <SheetContentLayout
      title={`This game data is available in ${t(
        `common:languages.${user.settings.lang}`,
      )}`}>
      <StyledText color={theme.lightGrey}>
        Would you like to switch the language for this game data from English to
        Italian?
      </StyledText>
      <Spacing />
      <Button
        title={`Keep as ${user.settings.lang}`}
        onPress={(): void => {
          i18n.changeLanguage(user.settings.lang);
          goToGame(user.settings.lang);
        }}
      />
      <Spacing />
      <Button
        title={`Keep as ${userGameData.lang}`}
        onPress={(): void => {
          i18n.changeLanguage(userGameData.lang);
          goToGame(userGameData.lang);
        }}
        color={theme.lightGrey}
      />
      {/* // TODO: Add do not ask me again ? store in local storage */}
      <Spacing />
    </SheetContentLayout>
  );
};
