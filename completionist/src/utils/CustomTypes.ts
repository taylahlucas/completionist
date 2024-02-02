import { AxiosError } from 'axios';
import { UserCredentials } from 'react-native-keychain';
import { User } from './CustomInterfaces';

// Styles 

export type MaterialIconsType =
  | 'arrow-right'
  | 'arrow-drop-down'
  | 'cancel'
  | 'check-circle-outline'
  | 'logout'
  | 'radio-button-unchecked'
  | 'search';

export type IoniconType =
  | 'arrow-back'
  | 'checkmark-circle-outline'
  | 'checkbox-outline'
  | 'eye-outline'
  | 'eye-off-outline'
  | 'menu-sharp'
  | 'square-outline'
  | 'wallet-outline';

export type FontAwesomeType =
  | 'circle-thin'
  | 'check-circle';

export type IconType = MaterialIconsType | IoniconType | FontAwesomeType;
export type ButtonType = 'default' | 'text';
export type TextInputStyleType = 'default' | 'text';

// Navigation

export type NavigationHeaderLeftActionTypes = 'back' | 'menu' | 'subscriptions' | 'none';
export type NavigationHeaderRightActionTypes = 'logout' | 'filter' | 'none';

// Responses

export type UserResponse = User | null;
export type CredentialsResponse = UserCredentials | null;
export type AxiosErrorResponse = AxiosError | any;