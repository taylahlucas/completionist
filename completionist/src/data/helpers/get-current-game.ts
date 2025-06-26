import { GameKeyEnum } from '@utils/custom-enums';
import { User } from '@utils/index';

export const getCurrentGame = (id: GameKeyEnum, user: User) =>
  user.gameData?.find(game => game.id === id);
