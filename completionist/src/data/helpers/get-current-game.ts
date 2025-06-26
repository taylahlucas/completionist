import { User, GameKeyEnum } from '@utils/index';

export const getCurrentGame = (id: GameKeyEnum, user: User) =>
  user.gameData?.find(game => game.id === id);
