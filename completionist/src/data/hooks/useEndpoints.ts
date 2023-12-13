import axios from 'axios';
import { GeneralData, User, UserFormData } from '@utils/CustomInterfaces';
import { UserResponse } from '@utils/CustomTypes';
import { signupUrl, getUserByUserIdUrl, updateUserDataUrl } from '../urls';

interface CreateUserProps {
  data: UserFormData;
}

interface GetUserByUserIdProps {
  userId: string;
}

interface UpdateUserDataProps {
  userId: string;
  skyrimData: GeneralData;
  fallout4Data: GeneralData;
}

interface EndpointsReturnType {
  createUser: ({ data }: CreateUserProps) => Promise<UserResponse>;
  getUserByUserId: ({ userId }: GetUserByUserIdProps) => Promise<UserResponse>;
  updateUserData: ({ userId, skyrimData, fallout4Data }: UpdateUserDataProps) => Promise<void>;
}

const useEndpoints = (): EndpointsReturnType => {
  const createUser = async ({ data }: CreateUserProps): Promise<UserResponse> => {
    return await axios.post(`${process.env.LOCAL_URL}/${signupUrl}`,
      {
        userId: data.userId,
        name: data.name,
        email: data.email,
        userAvatar: data.userAvatar,
        subscription: data.subscription
      }
    )
    .then(response => !!response.data.user && response.data.user as User ? response.data.user : null)
    .catch(error => {
      console.log("Error createUser: ", error);
      return null;
    })
  };

  const getUserByUserId = async ({ userId }: GetUserByUserIdProps): Promise<UserResponse> => {
   return await axios.get(`${process.env.LOCAL_URL}/${getUserByUserIdUrl}/${userId}`)
      .then(response => !!response.data && response.data as User ? response.data : null)
      .catch(error => {
        console.log("Error getUserByUserId: ", error);
        return null;
      });
  };

  const updateUserData = async ({ userId, skyrimData, fallout4Data }: UpdateUserDataProps): Promise<void> => {
    await axios.post(`${process.env.LOCAL_URL}/${updateUserDataUrl}`, {
      userId: userId,
      skyrimData: skyrimData,
      fallout4Data: fallout4Data
    })
    .catch(error => {
      console.log("Error updateUserData: ", error);
    })
  };

  return { createUser, getUserByUserId, updateUserData };
};

export default useEndpoints;