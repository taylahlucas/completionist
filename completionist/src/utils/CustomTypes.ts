import { AxiosError } from 'axios';
import { UserCredentials } from 'react-native-keychain';
import { User } from './CustomInterfaces';

// Styles 

export type MaterialIconsType =
  | 'arrow-right'
  | 'arrow-drop-down'
  | 'cancel'
  | 'check-circle-outline'
  | 'forward-to-inbox'
  | 'logout'
  | 'radio-button-unchecked'
  | 'search'
  | 'steam';

export type MaterialCommunityIcons =
  | 'cancel'
  | 'steam';

export type IoniconType =
  | 'arrow-back'
  | 'checkmark-circle-outline'
  | 'checkbox-outline'
  | 'checkmark-sharp'
  | 'eye-outline'
  | 'eye-off-outline'
  | 'menu-sharp'
  | 'settings-outline'
  | 'square-outline'
  | 'wallet-outline';

export type FontAwesomeType =
  | 'circle-thin'
  | 'check-circle';

export type IconType = MaterialIconsType | MaterialCommunityIcons | IoniconType | FontAwesomeType;
export type ButtonType = 'default' | 'text';
export type TextInputStyleType = 'default' | 'text';

export type LanguageType = 
  | 'ar'
  | 'de'
  | 'en'
  | 'es'
  | 'fr'
  | 'hi'
  | 'id'
  | 'it'
  | 'ja'
  | 'pt'
  | 'tr'
  | 'vi'
  | 'zh'

// Navigation

export type NavigationHeaderLeftActionTypes = 'back' | 'menu' | 'subscriptions' | 'none';
export type NavigationHeaderRightActionTypes = 'logout' | 'filter' | 'none';

// Responses

export type UserResponse = User | void;
export type AxiosErrorResponse = AxiosError | any;
export type CredentialsResponse = UserCredentials | null;