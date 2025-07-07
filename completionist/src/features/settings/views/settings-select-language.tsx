import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dropdown,
  DropdownSelection,
  DropdownSelectionContent,
} from '@components/general';
import { GameData, languages, LanguageType } from '@utils/index';
import { getGameLanguages, getLanguageInEn } from '@utils/hooks';

interface SettingsSelectLanguageProps {
  selectedLanguage: LanguageType;
  selectedGame?: GameData;
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  onSetLanguage: (value: string) => void;
}

export const SettingsSelectLanguage = ({
  selectedLanguage,
  selectedGame,
  isOpen,
  setOpen,
  onSetLanguage,
}: SettingsSelectLanguageProps) => {
  const { t } = useTranslation();

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
            `common:languages.${selectedLanguage}`,
          )} (${getLanguageInEn(selectedLanguage)})`}
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
        onPress={(value): void => onSetLanguage(value)}
      />
    </Dropdown>
  );
};
