import { useTranslation } from 'react-i18next';
import useDLCOptions from '@components/custom/SettingsContent/hooks/useDLCOptions';
import { GameKeyEnum } from '@utils/CustomEnums';

const useTranslateGameContent = () => {
  const { t } = useTranslation();

  const translateGameName = (title: GameKeyEnum): string => {
    return t(`categories:${title}.title`);
  };

  const translateCategoryName = (selectedGame: GameKeyEnum, section: string, category: string): string => {
    return t(`categories:${selectedGame}.categories.${section}.${category}`);
  };

  const translateDLCName = (selectedGame: GameKeyEnum, dlc: string): string => {
    return t(`categories:${selectedGame}.dlc.${dlc}`);
  };

  return { translateCategoryName, translateGameName, translateDLCName } ;
};

export default useTranslateGameContent;