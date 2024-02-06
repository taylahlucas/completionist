import { useTranslation } from 'react-i18next';
import { SettingsConfigItem } from '@utils/CustomInterfaces';
import useDLCOptions from '@components/custom/SettingsContent/hooks/useDLCOptions';
import { GameKeyEnum } from '@utils/CustomEnums';

const useTranslateGameContent = () => {
  const { t } = useTranslation();
  const { getDLCOptions } = useDLCOptions();

  const translateGameName = (title: GameKeyEnum): string => {
    return t(`categories:${title}.title`);
  };

  const translateCategoryName = (selectedGame: GameKeyEnum, item: SettingsConfigItem): string => {
    const dlc = getDLCOptions();
    let translatedTitle;

    dlc.forEach(dlcItem => {
      if (dlcItem.id === item.category) {
        translatedTitle = dlcItem.title;
      }
    })

    if (!translatedTitle) {
      translatedTitle = t(`categories:${selectedGame}.categories.${item.section}.${item.category}`);
    }

    return translatedTitle;
  };

  return { translateCategoryName, translateGameName } ;
};

export default useTranslateGameContent;