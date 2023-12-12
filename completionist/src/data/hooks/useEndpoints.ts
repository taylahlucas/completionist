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
  const navigation = useReactNavigation();
  const {
    setCompletedQuestIds,
    setCompletedCollectableIds,
    setCompletedBookIds,
    setCompletedLocationIds,
    setLoggedIn
  } = useMainDispatch();
  const { storeCredentials } = useKeychain();
  
  const createUser = async ({ data }: CreateUserProps) => {
    await axios.post('http://localhost:4000/api/signup',
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
            misc: [],
            locations: []
          }
        }
      }
    )
    .then(response => {
      console.log("createUser: ", response.data)
      if (!!response.data) {
        storeCredentials({
          username: response.data.user.name,
          password: response.data.user.userId
        });
      }
      return response.data;
    })
    .catch(error => {
      console.log("Error createUser: ", error);
    })
  };

  const getUserByUserId = async ({ userId }: GetUserByUserIdProps) => {
    await axios.get(`http://localhost:4000/users/${userId}`)
      .then(response => {
        const user = response.data as User;
        // Store user in cache
        if (!!user) {
          setLoggedIn(true);
          setCompletedQuestIds(user.data.skyrim.quests.map(item => item.id));
          setCompletedCollectableIds(user.data.skyrim.collectables.map(item => item.id));
          setCompletedLocationIds(user.data.skyrim.locations.map(item => item.id));
          setCompletedBookIds(user.data.skyrim.miscellaneous.map(item => item.id));
          navigation.navigate(ScreenEnum.Quests) 
        }
      })
      .catch(error => {
        console.log("Error getUserById: ", error);
      });
  };

  const updateUserData = async ({ userId, skyrimData }: UpdateUserDataProps) => {
    console.log("USER DATA: ", skyrimData)
    await axios.post('http://localhost:4000/users/update', {
      userId: userId,
      skyrimData: skyrimData
    })
      .then(response => {
        console.log("updateUserData RESPONSE: ", response.data);
      })
      .catch(error => {
        console.log("Error getUserById: ", error);
        return null;
      })
  };

  return { createUser, getUserByUserId, updateUserData };
};

export default useEndpoints;