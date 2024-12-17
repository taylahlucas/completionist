import { SignInProps } from '@data/api/EndpointInterfaces.native';
import { UserResponse } from '@utils/CustomTypes';
import { userMockInitial } from './mocks';

// TODO: Check if this is needed
export const signIn = async ({
  email,
  pw,
}: SignInProps): Promise<UserResponse> => {
  return userMockInitial;
};
