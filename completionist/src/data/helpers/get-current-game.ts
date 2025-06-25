import { GameKeyEnum } from '@utils/custom-enums';
import { User } from '@utils/custom-interfaces';

export const getCurrentGame = (id: GameKeyEnum, user: User) =>
  user.gameData?.find(game => game.id === id);
