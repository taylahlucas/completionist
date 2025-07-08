import { initialState } from '@redux/main-state';
import { User } from '@utils/index';

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
};
