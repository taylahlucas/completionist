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
  const { setUser, setShouldUpdateUser } = useMainDispatch();
  const { selectedGameSettings, user } = useMainState();

  const updateDLCSettingsConfig = (gameKey: GameKeyEnum, id: string) => {
		// TODO: Check if this is working
    setUser({
      ...user,
      gameData: {
        ...user.gameData,
        [gameKey]: {
          ...user.gameData[gameKey],
          settingsConfig: {
            general: user.gameData[gameKey].settingsConfig.general.map((config: SettingsConfigItem) => (
              {
                ...config,
                dlc: config.dlc.map(dlcItem => ({
                  id: dlcItem.id,
                  isActive: id === dlcItem.id ? !dlcItem.isActive : dlcItem.isActive
                }))
              }
            )),
            dlc: user.gameData[gameKey].settingsConfig.dlc.map(dlcItem => (
              (dlcItem.id === id) ? {
                id: dlcItem.id,
                isActive: !dlcItem.isActive
              } : dlcItem
            ))
          }
        },
      },
    });
		setShouldUpdateUser(true);
  };

  const getDLCOptions = (): SettingsListItem[] => {
		return user.gameData[selectedGameSettings].settingsConfig.dlc.map((item) => {
			return {
				id: item.id,
				title: t(`common:categories.${selectedGameSettings}.dlc.${item.id}`),
				isActive: item.isActive
			}
		});
  };

  const setDLCOptions = (id: string) => {
    updateDLCSettingsConfig(selectedGameSettings, id);
  };

  return { getDLCOptions, setDLCOptions };
};

export default useDLCOptions;