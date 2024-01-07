import { Platform } from 'react-native';
import { Subscription } from 'react-redux';
import axios, { AxiosError } from 'axios';
import { GeneralData, User, UserFormData } from '@utils/CustomInterfaces';
import { UserResponse } from '@utils/CustomTypes';
import { signupUrl, getUserByUserIdUrl, updateUserDataUrl, sendEmailUrl } from '../urls';

interface CreateUserProps {
  data: UserFormData;
}

interface GetUserByUserIdProps {
  userId: string;
}

interface UpdateUserDataProps {
  userId: string;
  subscription: Subscription[];
  skyrimData: GeneralData;
  fallout4Data: GeneralData;
}

interface EmailProps {
  from: string;
  subject: string;
  text: string;
}

interface EndpointsReturnType {
  createUser: ({ data }: CreateUserProps) => Promise<UserResponse>;
  getUserByUserId: ({ userId }: GetUserByUserIdProps) => Promise<UserResponse>;
  updateUserData: ({ userId, subscription, skyrimData, fallout4Data }: UpdateUserDataProps) => Promise<void>;
  sendEmail: ({ from, subject, text }: EmailProps) => Promise<void>;
}

const useEndpoints = (): EndpointsReturnType => {
  const url = Platform.OS === 'ios' ? process.env.IOS_LOCAL_URL : process.env.ANDROID_LOCAL_URL;

  const createUser = async ({ data }: CreateUserProps): Promise<UserResponse> => {
    return await axios.post(`${url}/${signupUrl}`,
      {
        userId: data.userId,
        name: data.name,
        email: data.email,
        userAvatar: data.userAvatar,
        subscription: data.subscription
      }
    )
    .then(response => !!response.data.user && response.data.user as User ? response.data.user : null)
    .catch((error: AxiosError)  => {
      console.log("Error createUser: ", error.message);
      return null;
    })
  };

  const getUserByUserId = async ({ userId }: GetUserByUserIdProps): Promise<UserResponse> => {
   return await axios.get(`${url}/${getUserByUserIdUrl}/${userId}`)
      .then(response => !!response.data && response.data as User ? response.data : null)
      .catch((error: AxiosError) => {
        console.log("Error getUserByUserId: ", error.message);
        return null;
      });
  };

  const updateUserData = async ({ userId, subscription, skyrimData, fallout4Data }: UpdateUserDataProps): Promise<void> => {
    await axios.post(`${url}/${updateUserDataUrl}`, {
      userId: userId,
      subscription: subscription,
      skyrimData: skyrimData,
      fallout4Data: fallout4Data
    })
    .catch((error: AxiosError)  => {
      console.log("Error updateUserData: ", error.message);
    })
  };

  const sendEmail = async ({ from, subject, text }: EmailProps): Promise<void> => {
    console.log("SENDING TO: ", `${url}/${sendEmailUrl}`)
    await axios.post(`${url}/${sendEmailUrl}`, {
      from: from,
      subject: subject,
      text: text
    })
    .catch((error: AxiosError) => {
      console.log("Error sendEmail: ", error.message);
    })
  }

  return { createUser, getUserByUserId, updateUserData, sendEmail };
};

export default useEndpoints;