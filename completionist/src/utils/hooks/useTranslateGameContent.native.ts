import { useTranslation } from 'react-i18next';
import useMainState from '@redux/hooks/useMainState';
import { SettingsConfigItem } from '@utils/CustomInterfaces';
import useDLCOptions from '../../components/custom/SettingsContent/hooks/useDLCOptions';
import useFormatter from './useFormatter';

const useTranslateGameContent = () => {
  const { t } = useTranslation();
  const { selectedGameSettings } = useMainState();
  const { getDLCOptions } = useDLCOptions();
  const { convertToTranslationKey  } = useFormatter();

  const translateSettingsCategoryName = (item: SettingsConfigItem): string => {
    const dlc = getDLCOptions();
    let translatedTitle;
    dlc.forEach(dlcItem => {
      if (dlcItem.id === item.category) {
        translatedTitle = dlcItem.title;
      }
    })

    if (!translatedTitle) {
      translatedTitle = item.category === 'None' ? t('common:main') : t(`categories:${selectedGameSettings.toLocaleLowerCase()}.categories.${item.section.toLocaleLowerCase()}.${convertToTranslationKey(item.category)}`);
    }

    return translatedTitle;
  };

  return { translateSettingsCategoryName } ;
};

export default useTranslateGameContent;