import { GameKey } from '@api/';
import { useTranslation } from 'react-i18next';

export const useTranslateGameContent = () => {
  const { t } = useTranslation();

  const translateGameName = (title: GameKey): string =>
    t(`common:categories.${title}.title`);

  const translateCategoryName = (
    selectedGame: GameKey,
    section: string,
    category: string,
  ): string =>
    t(`common:categories.${selectedGame}.categories.${section}.${category}`);

  const translateDLCName = (selectedGame: GameKey, dlc: string): string =>
    t(`common:categories.${selectedGame}.dlc.${dlc}`);

  return { translateCategoryName, translateGameName, translateDLCName };
};
