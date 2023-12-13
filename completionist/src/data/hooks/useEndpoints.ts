import axios from 'axios';
import { SkyrimData, User, UserFormData } from '@utils/CustomInterfaces';
import { UserResponse } from '@utils/CustomTypes';

interface CreateUserProps {
  data: UserFormData;
}

interface GetUserByUserIdProps {
  userId: string;
}

interface UpdateUserDataProps {
  userId: string;
  skyrimData: SkyrimData;
}

// TODO: Add api to constants file and return type
const useEndpoints = () => {
  const createUser = async ({ data }: CreateUserProps): Promise<UserResponse> => {
    return await axios.post('http://localhost:4000/api/signup',
      {
        userId: data.userId,
        name: data.name,
        email: data.email,
        userAvatar: data.userAvatar,
        subscription: data.subscription,
        data: {
          skyrim: {
            quests: [],
            collectables: [],
            miscellaneous: [],
            locations: []
          }
        }
      }
    )
    .then(response => !!response.data.user && response.data.user as User ? response.data.user : null)
    .catch(error => {
      console.log("Error createUser: ", error);
      return null;
    })
  };

  const getUserByUserId = async ({ userId }: GetUserByUserIdProps): Promise<UserResponse> => {
   return await axios.get(`http://localhost:4000/users/${userId}`)
      .then(response => !!response.data && response.data as User ? response.data : null)
      .catch(error => {
        console.log("Error getUserByUserId: ", error);
        return null;
      });
  };

  const updateUserData = async ({ userId, skyrimData }: UpdateUserDataProps)  => {
    return await axios.post('http://localhost:4000/users/update', {
      userId: userId,
      skyrimData: skyrimData
    })
    .catch(error => {
      console.log("Error updateUserData: ", error);
      return null;
    })
  };

  return { createUser, getUserByUserId, updateUserData };
};

export default useEndpoints;