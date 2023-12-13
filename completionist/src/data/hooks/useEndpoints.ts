import axios from 'axios';
import { SkyrimData, User, UserData, UserFormData } from '@utils/CustomInterfaces';
import useKeychain from './useKeychain.native';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import { ScreenEnum } from '@utils/CustomEnums';

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

const useEndpoints = () => {
  const { storeCredentials } = useKeychain();
  
  const createUser = async ({ data }: CreateUserProps): Promise<(User | null)> => {
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
    .then(response => {
      console.log("createUser: ", response.data)
      const user = response.data as User;
      if (!!user) {
        return user;
      }
      return response.data;
    })
    .catch(error => {
      console.log("Error createUser: ", error);
    })
  };

  const getUserByUserId = async ({ userId }: GetUserByUserIdProps): Promise<(User | null)> => {
   return  await axios.get(`http://localhost:4000/users/${userId}`)
      .then(response => {
        const user = response.data as User;
        // Store user in cache
        if (!!user) {
          return user;
          // setLoggedIn(true);
          // setcompletedQuests(user.data.skyrim.quests.map(item => item.id));
          // setCompletedCollectableIds(user.data.skyrim.collectables.map(item => item.id));
          // setcompletedLocations(user.data.skyrim.locations.map(item => item.id));
          // setcompletedMiscItems(user.data.skyrim.miscellaneous.map(item => item.id));
          // navigation.navigate(ScreenEnum.Quests) 
        }
        else {
          console.log("getUserByUserId Could not cast to User");
          return null;
        }
      })
      .catch(error => {
        console.log("Error getUserByUserId: ", error);
        return null;
      });
  };

  const updateUserData = async ({ userId, skyrimData }: UpdateUserDataProps) => {
    await axios.post('http://localhost:4000/users/update', {
      userId: userId,
      skyrimData: skyrimData
    })
      .then(response => {
        console.log("updateUserData RESPONSE: ", response.data);
        return response.data as User;
      })
      .catch(error => {
        console.log("Error getUserById: ", error);
        return null;
      })
  };

  return { createUser, getUserByUserId, updateUserData };
};

export default useEndpoints;