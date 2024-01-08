import { Platform } from 'react-native';
import axios from 'axios';
import { GeneralData, User, LoginFormData, Subscription } from '@utils/CustomInterfaces';
import { UserResponse } from '@utils/CustomTypes';
import { signupUrl, signinUrl, getUserByUserIdUrl, updateUserDataUrl, sendEmailUrl } from '../urls';
import uuid from 'react-native-uuid';

interface CreateUserProps {
  data: LoginFormData;
}

interface SignInProps {
  email: string;
  password: string;
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
  signIn: ({ email, password }: SignInProps) => Promise<UserResponse>;
  createUser: ({ data }: CreateUserProps) => Promise<UserResponse>;
  getUserByUserId: ({ userId }: GetUserByUserIdProps) => Promise<UserResponse>;
  updateUserData: ({ userId, subscription, skyrimData, fallout4Data }: UpdateUserDataProps) => Promise<void>;
  sendEmail: ({ from, subject, text }: EmailProps) => Promise<void>;
}

const useEndpoints = (): EndpointsReturnType => {
  const url = Platform.OS === 'ios' ? process.env.IOS_LOCAL_URL : process.env.ANDROID_LOCAL_URL;

  const signIn = async ({ email, password }: SignInProps): Promise<UserResponse> => {
    return await axios.post(`${url}/${signinUrl}`,
      {
        email: email,
        password: password
      }
    )
    .then(response => !!response.data.user && response.data.user as User ? response.data.user : null)
  };

  const createUser = async ({ data }: CreateUserProps): Promise<UserResponse> => {
    return await axios.post(`${url}/${signupUrl}`,
      {
        userId: data.userId ? data.userId : uuid.v4(),
        name: data.name,
        email: data.email,
        password: data.password ?? '',
        userAvatar: data.userAvatar,
        subscription: data.subscription
      }
    )
    .then(response => !!response.data.user && response.data.user as User ? response.data.user : null);
  };

  const getUserByUserId = async ({ userId }: GetUserByUserIdProps): Promise<UserResponse> => {
   return await axios.get(`${url}/${getUserByUserIdUrl}/${userId}`)
      .then(response => !!response.data && response.data as User ? response.data : null);
  };

  const updateUserData = async ({ userId, subscription, skyrimData, fallout4Data }: UpdateUserDataProps): Promise<void> => {
    await axios.post(`${url}/${updateUserDataUrl}`, {
      userId: userId,
      subscription: subscription,
      skyrimData: skyrimData,
      fallout4Data: fallout4Data
    })
  };

  const sendEmail = async ({ from, subject, text }: EmailProps): Promise<void> => {
    await axios.post(`${url}/${sendEmailUrl}`, {
      from: from,
      subject: subject,
      text: text
    })
  }

  return { signIn, createUser, getUserByUserId, updateUserData, sendEmail };
};

export default useEndpoints;