import { Alert, Platform } from 'react-native';
import uuid from 'react-native-uuid';
import axios, { AxiosError } from 'axios';
import { GeneralData, User, LoginFormData, Subscription, SettingsOptionItem } from '@utils/CustomInterfaces';
import { UserResponse } from '@utils/CustomTypes';
import { signupUrl, signinUrl, getUserByUserIdUrl, updateUserDataUrl, sendEmailUrl } from '../urls';
import { requestCodes } from '@utils/constants';

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
  settings: SettingsOptionItem[];
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
  signUp: ({ data }: CreateUserProps) => Promise<UserResponse>;
  getUserByUserId: ({ userId }: GetUserByUserIdProps) => Promise<UserResponse>;
  updateUserData: ({ userId, subscription, settings, skyrimData, fallout4Data }: UpdateUserDataProps) => Promise<void>;
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
    .catch((error: AxiosError) => {
      console.log("error: ", error.request)
      switch (error.request.status) {
        case requestCodes.NO_USER_FOUND:
          console.log('User not found.')
          return;
        case requestCodes.WRONG_PASSWORD:
          Alert.alert('Error', 'Incorrect password. Please try again.');
          return;
        default: 
          Alert.alert('Error', 'Internal server error. Please refresh the app');
          return;
      }
    })
  };

  const signUp = async ({ data }: CreateUserProps): Promise<UserResponse> => {
    return await axios.post(`${url}/${signupUrl}`,
      {
        userId: data.userId ? data.userId : uuid.v4(),
        name: data.name,
        email: data.email,
        password: data.password ?? '',
        userAvatar: data.userAvatar
      }
    )
    .then(response => !!response.data.user && response.data.user as User ? response.data.user : null)
    .catch((error: AxiosError)  => {
      switch (error.request.status) {
        case requestCodes.EMAIL_TAKEN:
          Alert.alert('Error', 'Email already exists.');
          return;
        default: 
          Alert.alert('Error', 'Internal server error. Please refresh the app');
          return;
      }
    })
  };

  const getUserByUserId = async ({ userId }: GetUserByUserIdProps): Promise<UserResponse> => {
   return await axios.get(`${url}/${getUserByUserIdUrl}/${userId}`)
      .then(response => !!response.data && response.data as User ? response.data : null)
      .catch((error: AxiosError) => {
        switch (error.request.status) {
          case requestCodes.NOT_FOUND:
            console.log("User not found")
            return;
          default: 
            Alert.alert('Error', 'Internal server error. Please refresh the app');
            return;
        }
      });
  };

  const updateUserData = async ({ userId, subscription, settings, skyrimData, fallout4Data }: UpdateUserDataProps): Promise<void> => {
    await axios.post(`${url}/${updateUserDataUrl}`, {
      userId: userId,
      subscription: subscription,
      settings: settings,
      skyrimData: skyrimData,
      fallout4Data: fallout4Data
    })
    .catch((error: AxiosError)  => {
      Alert.alert('Something went wrong.', error.message);
    })
  };

  const sendEmail = async ({ from, subject, text }: EmailProps): Promise<void> => {
    await axios.post(`${url}/${sendEmailUrl}`, {
      from: from,
      subject: subject,
      text: text
    })
    .catch((error: AxiosError) => {
      Alert.alert('Something went wrong.', error.message);
    })
  }

  return { signIn, signUp, getUserByUserId, updateUserData, sendEmail };
};

export default useEndpoints;