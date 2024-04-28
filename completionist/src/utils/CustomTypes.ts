import { AxiosError } from 'axios';
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
  | 'search';

export type MaterialCommunityIcons =
	| 'arrow-u-right-top'
  | 'cancel'
  | 'steam';

export type IoniconType =
  | 'arrow-back'
  | 'checkmark-circle-outline'
  | 'checkbox-outline'
  | 'checkmark-sharp'
	| 'filter-outline'
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
export type ButtonType = 'default' | 'text' | 'navigation';
export type TextInputStyleType = 'default' | 'text' | 'verification';
export type ValidatorType = 'none' | 'email';

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
export type StringResponse = string | void;
export type AxiosErrorResponse = AxiosError | any;