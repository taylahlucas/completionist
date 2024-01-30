import { useTranslation } from 'react-i18next';
import { SettingsConfigItem } from '@utils/CustomInterfaces';
import useDLCOptions from '@components/custom/SettingsContent/hooks/useDLCOptions';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';

const useTranslateGameContent = () => {
  const { t } = useTranslation();
  const { getDLCOptions } = useDLCOptions();

  const translateGameName = (title: SubscriptionTypeEnum): string => {
    return t(`categories:${title}.title`);
  };

  const translateCategoryName = (selectedGame: SubscriptionTypeEnum, item: SettingsConfigItem): string => {
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