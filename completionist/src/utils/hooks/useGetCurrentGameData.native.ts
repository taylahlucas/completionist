import { User } from '@utils/CustomInterfaces';

export const useGetCurrentGameData = (user: User, selectedGame: string) => Object.entries(user.gameData)
.find(([key, _]) => key === selectedGame)?.[1];