import { UserCredentials } from 'react-native-keychain';
import { User } from './CustomInterfaces';

export type MaterialIconsType =
  | 'cancel'
  | 'check-circle-outline'
  | 'radio-button-unchecked'
  | 'search';


export type IoniconType =
  | 'arrow-back'
  | 'checkmark-circle-outline'
  | 'menu-sharp';

export type FontAwesomeType =
  | 'circle-thin'
  | 'check-circle';

export type IconType = MaterialIconsType | IoniconType | FontAwesomeType;

export type ButtonType = 'default' | 'text';

export type UserResponse = User | null;

export type CredentialsResponse = UserCredentials | null;