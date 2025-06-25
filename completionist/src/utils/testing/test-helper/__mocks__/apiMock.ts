import { SignInProps } from '@data/api/endpoint-interfaces';
import { UserResponse } from '@utils/CustomTypes';
import { userLoggedInMock } from './mocks';

// TODO: Check if this is needed
export const signIn = async ({
  email,
  pw,
}: SignInProps): Promise<UserResponse> => {
  return userLoggedInMock;
};
