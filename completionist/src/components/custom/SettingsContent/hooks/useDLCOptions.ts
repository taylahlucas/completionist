import { useTranslation } from 'react-i18next';
import useMainState from '@redux/hooks/useMainState';
import { GameKeyEnum } from '@utils/CustomEnums';
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

  const updateDLCSettingsConfig = (gameKey: GameKeyEnum, id: string) => {
    setUser({
      ...user,
      data: {
        ...user.data,
        [gameKey]: {
          ...user.data[gameKey],
          settingsConfig: {
            general: user.data[gameKey].settingsConfig.general.map((config: SettingsConfigItem) => (
              {
                ...config,
                dlc: config.dlc.map(dlcItem => ({
                  id: dlcItem.id,
                  isActive: id === dlcItem.id ? !dlcItem.isActive : dlcItem.isActive
                }))
              }
            )),
            dlc: user.data[gameKey].settingsConfig.dlc.map(dlcItem => (
              (dlcItem.id === id) ? {
                id: dlcItem.id,
                isActive: !dlcItem.isActive
              } : dlcItem
            ))
          }
        },
      },
    });
  };

  const getDLCOptions = (): SettingsListItem[] => {
    switch (selectedGameSettings) {
			case GameKeyEnum.FALLOUT_4:
        return user.data.fallout4.settingsConfig.dlc.map((item) => {
          return {
            id: item.id,
            title: t(`categories:fallout4.dlc.${item.id}`),
            isActive: item.isActive
          }
        });
				
      case GameKeyEnum.SKYRIM:
        return user.data.skyrim.settingsConfig.dlc.map((item) => {
          return {
            id: item.id,
            title: t(`categories:skyrim.dlc.${item.id}`),
            isActive: item.isActive
          }
        });

				case GameKeyEnum.WITCHER_3:
					return user.data.witcher3.settingsConfig.dlc.map((item) => {
						return {
							id: item.id,
							// TODO: Title
							title:item.title,
							// title: t(`categories:fallout4.dlc.${item.id}`),
							isActive: item.isActive
						}
					});
    }
    return []
  };

  const setDLCOptions = (id: string) => {
    updateDLCSettingsConfig(selectedGameSettings, id);
  };

  return { getDLCOptions, setDLCOptions };
};

export default useDLCOptions;