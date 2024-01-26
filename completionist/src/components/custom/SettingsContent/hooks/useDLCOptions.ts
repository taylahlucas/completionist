import useMainState from '@redux/hooks/useMainState';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';
import { skyrimDLC, fallout4DLC } from '@utils/constants';
import { SettingsConfigItem, SettingsListItem } from '@utils/CustomInterfaces';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import { useTranslation } from 'react-i18next';

interface DLCOptionsReturnType {
  useGetDLCOptions: () => SettingsListItem[];
  useSetDLCOptions: (title: string) => void;
}

const useDLCOptions = (): DLCOptionsReturnType => {
  const { t } = useTranslation();
  const { setUser } = useMainDispatch();
  const { selectedGameSettings, user } = useMainState();

  const updateSettingsConfig = (gameKey: string, id: string) => {
    setUser({
      ...user,
      data: {
        ...user.data,
        [gameKey]: {
          ...(user.data as any)[gameKey],
          settingsConfig: (user.data as any)[gameKey].settingsConfig.map((config: SettingsConfigItem) => ({
            ...config,
            isActive: config.category === id ? !config.isActive : config.isActive,
          })),
        },
      },
    });
  };

  const useGetDLCOptions = (): SettingsListItem[] => {
    switch (selectedGameSettings) {
      case SubscriptionTypeEnum.SKYRIM:
        return skyrimDLC.map((item) => {
          return {
            id: item.title,
            title: t(`categories:skyrim.dlc.${item.id.toLowerCase()}`),
            isActive: user.data.skyrim.settingsConfig.filter(config => config.category === item.title && config.isActive).length > 0
          }
        });
      case SubscriptionTypeEnum.FALLOUT_4:
        return fallout4DLC.map((item) => {
          return {
            id: item.id,
            title: t(`categories:fallout4.dlc.${item.id.toLowerCase()}`),
            isActive: user.data.fallout4.settingsConfig.filter(config => config.category === item.title && config.isActive).length > 0
          }
        });
    }
  };

  const useSetDLCOptions = (id: string) => {
    switch (selectedGameSettings) {
      case SubscriptionTypeEnum.SKYRIM:
        updateSettingsConfig('skyrim', id);
        return;

      case SubscriptionTypeEnum.FALLOUT_4:
        updateSettingsConfig('fallout4', id);
        return;
    }
  };

  return { useGetDLCOptions, useSetDLCOptions };
};

export default useDLCOptions;