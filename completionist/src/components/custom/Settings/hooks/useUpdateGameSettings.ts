import { SettingsListItem, User } from '@utils/CustomInterfaces';
import useUpdateSettingsConfig from './useUpdateSettingConfig';
import { GameKeyEnum } from '@utils/CustomEnums';

const useUpdateGameSettings = () => {
	const { updateConfig } = useUpdateSettingsConfig();
	
	const updateGameSettings = (user: User, item: SettingsListItem, gameKey: GameKeyEnum) => {
    const gameConfig = updateConfig(user.data[gameKey].settingsConfig.general, item);
		return {
      ...user,
      data: {
        ...user.data,
        [gameKey]: {
          ...user.data[gameKey],
          settingsConfig: {
            general: gameConfig,
            dlc: user.data[gameKey].settingsConfig.dlc
          },
        },
      },
    };
  };

	return updateGameSettings;
};

export default useUpdateGameSettings;