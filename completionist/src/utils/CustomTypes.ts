import { UserCredentials } from 'react-native-keychain';
import { User } from './CustomInterfaces';

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
  | 'menu-sharp'
  | 'square-outline';

export type FontAwesomeType =
  | 'circle-thin'
  | 'check-circle';

export type IconType = MaterialIconsType | IoniconType | FontAwesomeType;

export type ButtonType = 'default' | 'text';

export type UserResponse = User | null;

export type CredentialsResponse = UserCredentials | null;

export type NavigationHeaderLeftActionTypes = 'back' | 'menu' | 'none';

export type NavigationHeaderRightActionTypes = 'logout' | 'filter' | 'none';

export type TextInputStyleType = 'default' | 'text';