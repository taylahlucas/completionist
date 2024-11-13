
import { User } from '@utils/CustomInterfaces';

export const useGetActiveGames = () => {
  const activeGames = (user: User) => user.gameData ? 
    user.gameData
      .filter(
        (game) => game[1].isActive,
      ) 
      : [];


  return {activeGames};
};
