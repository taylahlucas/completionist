import { useTranslation } from 'react-i18next';
import useMainState from '@redux/hooks/useMainState';
import { GameKeyEnum } from '@utils/CustomEnums';
import { skyrimDLC, fallout4DLC } from '@utils/constants';
import { SettingsConfigItem, SettingsListItem } from '@utils/CustomInterfaces';
import useMainDispatch from '@redux/hooks/useMainDispatch';

interface DLCOptionsReturnType {
  getDLCOptions: () => SettingsListItem[];
  setDLCOptions: (title: string) => void;
}

const useDLCOptions = (): DLCOptionsReturnType => {
  const { t } = useTranslation();
  const { setUser } = useMainDispatch();
  const { selectedGameSettings, user } = useMainState();

  const updateSettingsConfig = (gameKey: GameKeyEnum, id: string) => {
    setUser({
      ...user,
      data: {
        ...user.data,
        [gameKey]: {
          ...user.data[gameKey],
          settingsConfig: user.data[gameKey].settingsConfig.map((config: SettingsConfigItem) => ({
            ...config,
            isActive: config.category === id ? !config.isActive : config.isActive,
          })),
        },
      },
    });
  };

  const getDLCOptions = (): SettingsListItem[] => {
    switch (selectedGameSettings) {
      case GameKeyEnum.SKYRIM:
        return skyrimDLC.map((item) => {
          return {
            id: item,
            title: t(`categories:skyrim.dlc.${item}`),
            isActive: user.data.skyrim.settingsConfig.filter(config => config.category === item && config.isActive).length > 0
          }
        });
      case GameKeyEnum.FALLOUT_4:
        return fallout4DLC.map((item) => {
          return {
            id: item,
            title: t(`categories:fallout4.dlc.${item}`),
            isActive: user.data.fallout4.settingsConfig.filter(config => config.category === item && config.isActive).length > 0
          }
        });
    }
  };

  const setDLCOptions = (id: string) => {
    updateSettingsConfig(selectedGameSettings, id);
  };

  return { getDLCOptions, setDLCOptions };
};

export default useDLCOptions;