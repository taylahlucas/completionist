import { useTranslation } from 'react-i18next';
import { useMainDispatch, useMainState } from '@redux/hooks';
import { getCurrentGame } from '@data/helpers';
import { useAuthDispatch, useAuthUser } from '@redux/auth';
import { GameData, GameKey, GameSettingsItem, IsActive } from '@api/';

interface DLCOptionsReturnType {
  getDLCOptions: () => IsActive[];
  setDLCOptions: (title: string) => void;
}

export const useDLCOptions = (): DLCOptionsReturnType => {
  const { t } = useTranslation();
  const user = useAuthUser();
  const { setUser } = useAuthDispatch();
  const { selectedGameSettings } = useMainState();
  const { setShouldUpdateUser } = useMainDispatch();

  const updateDLCSettingsConfig = (gameKey: GameKey, id: string) => {
    // TODO: Handle no user
    if (!user) return;
    const currentGame = getCurrentGame(gameKey, user);
    if (!currentGame) return;

    const updatedGame = {
      ...currentGame,
      settingsConfig: {
        general: currentGame.settingsConfig.general?.map(
          (config: GameSettingsItem) => {
            return {
              ...config,
              dlc: config.dlc.map(dlcItem => ({
                ...dlcItem,
                isActive:
                  id === dlcItem.id ? !dlcItem.isActive : dlcItem.isActive,
              })),
            };
          },
        ),
        dlc: currentGame.settingsConfig.dlc?.map(dlcItem => {
          return dlcItem.id === id
            ? {
                ...dlcItem,
                isActive: !dlcItem.isActive,
              }
            : dlcItem;
        }),
      },
    };

    setUser({
      ...user,
      gameData: [
        ...user.gameData.filter((game: GameData) => game.id !== currentGame.id),
        updatedGame,
      ],
    });
    setShouldUpdateUser(true);
  };

  const getDLCOptions = (): IsActive[] => {
    if (!user) return [];
    const currentGame = getCurrentGame(selectedGameSettings, user);
    if (!currentGame) return [];
    return currentGame.settingsConfig.dlc.map(item => {
      return {
        id: item.id,
        title: t(`common:categories.${selectedGameSettings}.dlc.${item.id}`),
        isActive: item.isActive,
      };
    });
  };

  const setDLCOptions = (id: string) => {
    updateDLCSettingsConfig(selectedGameSettings, id);
  };

  return { getDLCOptions, setDLCOptions };
};
