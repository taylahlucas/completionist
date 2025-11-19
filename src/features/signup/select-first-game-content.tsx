import React from 'react';
import useGetTheme from '@styles/hooks/use-get-theme';
import { useTranslation } from 'react-i18next';
import { GameListItem } from '@components/custom';
import { KeyboardAvoidingScrollView } from '@components/general/lists';
import {
  Button,
  StyledText,
  Condition,
  CustomSearchBar,
  Spacing,
  ParagraphView,
} from '@components/general';
import { GameData } from '@utils/index';
import { useTranslateGameContent } from '@data/hooks';
import { useSelectFirstGame } from './hooks/use-select-first-game';
import { SelectFirstGameContentContainer } from '@features/login/login-form';

export const SelectFirstGameContent = () => {
  const theme = useGetTheme();
  const { t } = useTranslation();
  const { viewModel, actions } = useSelectFirstGame();
  const { translateGameName } = useTranslateGameContent();

  return (
    <>
      <CustomSearchBar
        searchValue={viewModel.searchValue}
        setSearchValue={(value: string): void => actions.setSearchValue(value)}
        onReset={(): void => actions.setSearchValue('')}
      />
      <KeyboardAvoidingScrollView
        awareView={
          <Button
            title={t('common:continue')}
            type="footer"
            disabled={!viewModel.selectedFirstGame}
            onPress={async (): Promise<void> => {
              if (viewModel.selectedFirstGame) {
                const updatedUser = {
                  ...viewModel.user,
                  signup: {
                    ...viewModel.user.signup,
                    selectGame: true,
                  },
                };
                actions.activateGame(updatedUser, viewModel.selectedFirstGame);
                actions.setSelectedGameDataSettings(
                  viewModel.selectedFirstGame,
                );
                actions.setIsGoogleSignIn(false);
              }
            }}
          />
        }>
        <Condition condition={viewModel.searchValue.length === 0}>
          <ParagraphView>
            <StyledText>{t('common:selectGame.selectGameDesc1')}</StyledText>
            <Spacing />
            <StyledText>{t('common:selectGame.selectGameDesc2')}</StyledText>
            <Spacing />
            <StyledText type="ListItemSubTitleItalic">
              {t('common:selectGame.selectGameDesc3')}
            </StyledText>
            <Spacing />
            {viewModel.selectedFirstGame ? (
              <StyledText type="ListItemSubTitleBold" color={theme.lightGrey}>
                {t('common:selectGame.selection', {
                  gameTitle: translateGameName(viewModel.selectedFirstGame),
                })}
              </StyledText>
            ) : null}
          </ParagraphView>
        </Condition>
        <SelectFirstGameContentContainer>
          {viewModel.filteredGames.map((game: GameData, index: number) => (
            <GameListItem
              key={index}
              flow="signup"
              game={game}
              enabled={viewModel.selectedFirstGame === game.id}
              enabledColor={
                viewModel.selectedFirstGame === game.id
                  ? theme.lightPurple
                  : theme.midGrey
              }
              onPress={(): void => actions.setSelectedFirstGame(game.id)}
            />
          ))}
        </SelectFirstGameContentContainer>
      </KeyboardAvoidingScrollView>
    </>
  );
};
