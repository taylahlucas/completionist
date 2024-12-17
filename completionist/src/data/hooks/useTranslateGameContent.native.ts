import { useTranslation } from 'react-i18next';
import { GameKeyEnum } from '@utils/index';

export const useTranslateGameContent = () => {
  const { t } = useTranslation();

  const translateGameName = (title: GameKeyEnum): string =>
    t(`common:categories.${title}.title`);

  const translateCategoryName = (
    selectedGame: GameKeyEnum,
    section: string,
    category: string,
  ): string =>
    t(`common:categories.${selectedGame}.categories.${section}.${category}`);

  const translateDLCName = (selectedGame: GameKeyEnum, dlc: string): string =>
    t(`common:categories.${selectedGame}.dlc.${dlc}`);

  return { translateCategoryName, translateGameName, translateDLCName };
};
