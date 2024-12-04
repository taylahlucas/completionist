import { AxiosError } from 'axios';
import { User } from './CustomInterfaces';
import { AuthScreenEnum, DrawerScreenEnum, GameKeyEnum, UnauthorizedScreenEnum } from './CustomEnums';

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
	| 'progress-star'
  | 'steam';

export type IoniconType =
  | 'arrow-back'
  | 'arrow-forward'
	| 'arrow-down'
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
export type ButtonType = 'default' | 'text' | 'navigation' | 'footer';
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

export type ScreenEnumType = AuthScreenEnum | DrawerScreenEnum | UnauthorizedScreenEnum;
export type NavigationHeaderLeftActionTypes = 'back' | 'menu' | 'achievements' | 'none';
export type NavigationHeaderRightActionTypes = 'back' | 'settings' | 'filter' | 'logout' | 'none';
export type NavigatorParams = {
	[UnauthorizedScreenEnum.Landing]: undefined;
  [UnauthorizedScreenEnum.Login]: undefined;
	[UnauthorizedScreenEnum.VerifyAccount]: undefined;
	[UnauthorizedScreenEnum.SelectInitialPlan]: undefined;
	[UnauthorizedScreenEnum.SetUsername]: undefined;
	[UnauthorizedScreenEnum.SelectFirstGame]: undefined;
	[UnauthorizedScreenEnum.LinkAccount]: undefined;
	[UnauthorizedScreenEnum.ForgotPassword]: undefined;
	[UnauthorizedScreenEnum.VerifyNewPassword]: undefined;
	[AuthScreenEnum.Landing]: undefined;
  [AuthScreenEnum.GameSelection]: undefined;
	[AuthScreenEnum.GlobalSettings]: undefined;
	[AuthScreenEnum.GlobalAccountDetails]: undefined;
	[AuthScreenEnum.GlobalSteamAchievements]: undefined;
  [AuthScreenEnum.GlobalAchievements]: undefined;
	[AuthScreenEnum.PurchaseGame]: [gameId: GameKeyEnum];
	[AuthScreenEnum.DrawerStack]: undefined;
	[DrawerScreenEnum.Quests]: undefined;
  [DrawerScreenEnum.Collectables]: undefined;
  [DrawerScreenEnum.Miscellaneous]: undefined;
  [DrawerScreenEnum.Locations]: undefined;
  [DrawerScreenEnum.SendRequest]: undefined;
	[DrawerScreenEnum.Achievements]: undefined;
	[DrawerScreenEnum.SteamAchievements]: undefined;
  [DrawerScreenEnum.Payments]: undefined;
  [DrawerScreenEnum.Settings]: undefined;
	[DrawerScreenEnum.AccountDetails]: undefined;
}

// Responses

export type UserResponse = User | void;
export type StringResponse = string | void;
export type AxiosErrorResponse = AxiosError | any;

// Utils

export type LoggerType = 'info' | 'error' | 'warning';
export type FlowType = 'signup' | 'home';
export type GameListSelectionType = 'active' | 'inactive';