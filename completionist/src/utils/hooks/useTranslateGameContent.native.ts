import { useTranslation } from 'react-i18next';
import useMainState from '@redux/hooks/useMainState';
import { SettingsConfigItem } from '@utils/CustomInterfaces';
import useDLCOptions from '@components/custom/SettingsContent/hooks/useDLCOptions';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';

const useTranslateGameContent = () => {
  const { t } = useTranslation();
  const { selectedGameSettings } = useMainState();
  const { getDLCOptions } = useDLCOptions();

  const translateGameName = (title: SubscriptionTypeEnum): string => {
    return t(`categories:${title}.title`);
  } ;

  const translateSettingsCategoryName = (item: SettingsConfigItem): string => {
    const dlc = getDLCOptions();
    let translatedTitle;
    dlc.forEach(dlcItem => {
      if (dlcItem.id === item.category) {
        translatedTitle = dlcItem.title;
      }
    })

    if (!translatedTitle) {
      translatedTitle = item.category === 'None' 
        ? t('common:main') 
        : t(`categories:${selectedGameSettings}.categories.${item.section}.${item.category}`);
    }

    return translatedTitle;
  };

  return { translateSettingsCategoryName, translateGameName } ;
};

export default useTranslateGameContent;