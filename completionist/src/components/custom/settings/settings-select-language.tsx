import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dropdown,
  DropdownSelection,
  DropdownSelectionContent,
} from '@components/general';
import { languages } from 'src/i18n/i18n-common';
import { useMainState, useMainDispatch } from '@redux/hooks';
import { GameData, LanguageType } from '@utils/index';
import { useGetGameLanguages } from './hooks';
import { getGameDataFromCache, getMappedGameData } from '@data/index';
import { useContentDispatch } from '../content-list/provider';

interface SettingsSelectLanguageProps {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
}

export const SettingsSelectLanguage = ({
  isOpen,
  setOpen,
}: SettingsSelectLanguageProps) => {
  const { t, i18n } = useTranslation();
  const { setUser } = useMainDispatch();
  const { user, selectedGame } = useMainState();
  const { setGameContent } = useContentDispatch();
  const { getLanguageInEn, getGameLanguages } = useGetGameLanguages();

  const languageList = !selectedGame
    ? languages
    : getGameLanguages(selectedGame.id);

  return (
    <Dropdown
      isOpen={isOpen}
      setOpen={() => null}
      header={
        <DropdownSelection
          title={`${t(
            `common:languages.${user.settings.lang}`,
          )} (${getLanguageInEn(user.settings.lang)})`}
          isSelected={isOpen}
          onPress={(): void => setOpen(!isOpen)}
        />
      }>
      <DropdownSelectionContent
        content={languageList.map(lang => ({
          id: lang,
          title: `${t(`common:languages.${lang}`)} (${getLanguageInEn(
            lang as LanguageType,
          )})`,
        }))}
        onPress={(value): void => {
          setOpen(false);
          i18n.changeLanguage(value);
          if (!selectedGame) {
            return;
          }

          if (false) {
            setUser({
              ...user,
              settings: {
                ...user.settings,
                lang: value as LanguageType,
              },
            });
          } else {
            let gameData = Object.entries(user.gameData).find(
              item => item[1] === selectedGame,
            );
            if (!gameData) {
              return;
            }
            const updatedGameData: GameData[] = [
              ...user.gameData,
              {
                ...gameData[1],
                lang: value as LanguageType,
              },
            ];
            setUser({
              ...user,
              gameData: updatedGameData,
            });
          }
          getGameDataFromCache({
            selectedGame: selectedGame.id,
            lang: value as LanguageType,
          }).then(response => {
            const gameData = getMappedGameData(response);
            setGameContent(gameData);
          });
        }}
      />
    </Dropdown>
  );
};
