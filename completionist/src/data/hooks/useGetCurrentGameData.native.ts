import { GameKeyEnum } from '@utils/CustomEnums';
import { User } from '@utils/CustomInterfaces';

export const getCurrentGame = (id: GameKeyEnum, user: User) => user.gameData?.find((game) => game.id === id);