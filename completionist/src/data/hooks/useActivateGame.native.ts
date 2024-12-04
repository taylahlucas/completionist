import {useEditUserData} from '@data/hooks/index';
import {initialGameData} from '@redux/MainState';
import {GameKeyEnum} from '@utils/CustomEnums';
import {IsActive, User} from '@utils/CustomInterfaces';
import {
  fallout3GameData,
  fallout4GameData,
  skyrimGameData,
  witcher3GameData,
} from '@utils/configs/gameConfigs';

export const useActivateGame = () => {
  const {updateUserData} = useEditUserData();

  // Free users
  const changeGameSubscription = (
    user: User,
    selectedGame: IsActive,
    changesLeft: number,
  ) => {
    // TODO: Update
    // const updatedGames: IsActive[] = user.subscription.data.map((data: IsActive) => {
    // 	return {
    // 		id: data.id,
    // 		isActive: data.id === selectedGame?.id
    // 	};
    // });
    // const updatedUser = {
    // 	...user,
    // 	subscription: {
    // 		...user.subscription,
    // 		changesLeft: changesLeft,
    // 		data: updatedGames
    // 	}
    // };
    // updateUserData(updatedUser);
  };

  const getGameData = (id: string) => {
    switch (id) {
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
        ...user.gameData?.filter((game) => game.id !== selectedGame),
        getGameData(selectedGame)
      ]
    }
    else {
      updatedData = [getGameData(selectedGame)];
    }
    updateUserData({
      ...user,
      gameData: updatedData
    });
    return;
  };

  return {changeGameSubscription, activateGame};
};
