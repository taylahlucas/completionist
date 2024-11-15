import { IsActive, User } from '@utils/CustomInterfaces';
import useUpdateSettingsConfig from './useUpdateSettingConfig';
import { GameKeyEnum } from '@utils/CustomEnums';
import { getCurrentGame } from '@data/hooks/useGetCurrentGameData.native';

const useUpdateGameSettings = () => {
	const { updateConfig } = useUpdateSettingsConfig();
	
	const updateGameSettings = (user: User, item: IsActive, gameKey: GameKeyEnum) => {
    const currentGame = getCurrentGame(gameKey, user);
    if (!currentGame) {
      return;
    }
    const gameConfig = updateConfig(currentGame.settingsConfig.general, item);

    const updatedGame = {
      ...currentGame,
      settingsConfig: {
        general: gameConfig,
        dlc: currentGame.settingsConfig.dlc
      },
    };
    
		return {
      ...user,
      gameData: [
        ...user.gameData,
        updatedGame
      ]      
    };
  };

	return updateGameSettings;
};

export default useUpdateGameSettings;