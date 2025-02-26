import { useEditUserData } from '@data/hooks/index';
import { initialGameData } from '@redux/MainState';
import { GameKeyEnum } from '@utils/CustomEnums';
import { User } from '@utils/CustomInterfaces';
import {
  eldenRingGameData,
  fallout3GameData,
  fallout4GameData,
  skyrimGameData,
  witcher3GameData,
} from '@utils/configs/gameConfigs';

export const useActivateGame = () => {
  const { updateUserData } = useEditUserData();

  const getGameData = (id: string) => {
    switch (id) {
      case 'eldenRing':
        return eldenRingGameData;
      case 'fallout3':
        return fallout3GameData;
      case 'fallout4':
        return fallout4GameData;
      case 'skyrim':
        return skyrimGameData;
      case 'witcher3':
        return witcher3GameData;
      default:
        return initialGameData;
    }
  };

  // User set up and premium users
  const activateGame = (user: User, selectedGame: GameKeyEnum) => {
    let updatedData = [];
    if (user.gameData) {
      updatedData = [
        ...user.gameData?.filter(game => game.id !== selectedGame),
        getGameData(selectedGame),
      ];
    } else {
      updatedData = [getGameData(selectedGame)];
    }
    updateUserData({
      ...user,
      gameData: updatedData,
    });
    return;
  };

  return { activateGame };
};
