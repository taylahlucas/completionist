import { GameKey, User } from '@api/';

export const getCurrentGame = (id: GameKey, user: User) =>
  user.gameData?.find(game => game.id === id);
