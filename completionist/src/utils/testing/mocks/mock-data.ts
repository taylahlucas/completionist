import { initialState } from '@redux/main-state';
import { eldenRingGameData, skyrimGameData } from '@utils/configs';
import { GameData, User } from '@utils/index';

export const mockEldenRingGameData = {
  ...eldenRingGameData,
  quests: [],
  collectables: [],
  locations: [],
  miscellaneous: [],
};
export const mockSkyrimGameData: GameData = {
  ...skyrimGameData,
  quests: [],
  collectables: [],
  locations: [],
  miscellaneous: [],
};

export const mockUser: User = {
  ...initialState.user,
  userId: '123',
  username: 'Test User',
  email: 'test@test.com',
  pw: 'abc123',
  signup: {
    verification: true,
    setUsername: true,
    selectGame: true,
  },
  gameData: [{ ...mockEldenRingGameData, ...mockSkyrimGameData }],
};
