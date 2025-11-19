import { IsActive, User, GameKeyEnum } from '@utils/index';
import { useUpdateSettingsConfig } from './';
import { getCurrentGame } from '@data/helpers';

export const useUpdateGameSettings = () => {
  const { updateConfig } = useUpdateSettingsConfig();

  const updateGameSettings = (
    user: User,
    item: IsActive,
    gameKey: GameKeyEnum,
  ) => {
    const currentGame = getCurrentGame(gameKey, user);
    if (!currentGame) {
      return;
    }
    const gameConfig = updateConfig(currentGame.settingsConfig.general, item);

    const updatedGame = {
      ...currentGame,
      settingsConfig: {
        general: gameConfig,
        dlc: currentGame.settingsConfig.dlc,
      },
    };

    return {
      ...user,
      gameData: [
        ...user.gameData.filter(game => game.id !== currentGame.id),
        updatedGame,
      ],
    };
  };

  return updateGameSettings;
};
