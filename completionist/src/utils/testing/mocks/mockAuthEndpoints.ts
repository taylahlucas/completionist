import * as useAuthEndpoints from '@data/api/hooks/useAuthEndpoints.native';

export const mockAuthEndpoints = (mock: { [key: string]: jest.Mock }) => {
  const authMocks = {
    checkUserExists: jest.fn(),
		signUp: jest.fn(),
		signIn: jest.fn(),
		linkAndSignIn: jest.fn(),
		sendVerificationEmail: jest.fn(),
		forgotPw: jest.fn(),
  };
  return jest.spyOn(useAuthEndpoints, 'default')
    .mockImplementation(() => {
      return {
        ...authMocks,
        ...mock
      }
    });
};