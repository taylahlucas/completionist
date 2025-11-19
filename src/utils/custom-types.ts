import { AxiosError } from 'axios';
import { User } from './custom-interfaces';
import {
  AuthScreenEnum,
  DrawerScreenEnum,
  GameKeyEnum,
  UnAuthorizedScreenEnum,
} from './custom-enums';

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

export type FontAwesomeType = 'circle-thin' | 'check-circle';

export type IconType =
  | MaterialIconsType
  | MaterialCommunityIcons
  | IoniconType
  | FontAwesomeType;
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
  | 'zh';

// Navigation

export type ScreenEnumType =
  | AuthScreenEnum
  | DrawerScreenEnum
  | UnAuthorizedScreenEnum;
export type NavigationHeaderLeftActionTypes =
  | 'back'
  | 'menu'
  | 'achievements'
  | 'none';
export type NavigationHeaderRightActionTypes =
  | 'back'
  | 'settings'
  | 'filter'
  | 'logout'
  | 'none';
export type NavigatorParams = {
  [UnAuthorizedScreenEnum.Landing]: undefined;
  [UnAuthorizedScreenEnum.Login]: undefined;
  [UnAuthorizedScreenEnum.VerifyAccount]: undefined;
  [UnAuthorizedScreenEnum.SelectInitialPlan]: undefined;
  [UnAuthorizedScreenEnum.SetUsername]: undefined;
  [UnAuthorizedScreenEnum.SelectFirstGame]: undefined;
  [UnAuthorizedScreenEnum.LinkAccount]: undefined;
  [UnAuthorizedScreenEnum.ForgotPassword]: undefined;
  [UnAuthorizedScreenEnum.VerifyNewPassword]: undefined;
  [AuthScreenEnum.Landing]: undefined;
  [AuthScreenEnum.GameSelection]: undefined;
  [AuthScreenEnum.SelectGameLanguage]: undefined;
  [AuthScreenEnum.GlobalSettings]: undefined;
  [AuthScreenEnum.GlobalAccountDetails]: undefined;
  [AuthScreenEnum.GlobalSteamAchievements]: undefined;
  [AuthScreenEnum.GlobalAchievements]: undefined;
  [AuthScreenEnum.PurchaseGame]: [gameId: GameKeyEnum];
  [AuthScreenEnum.SteamProfile]: [steamId: string, viewType: 'add' | 'view'];
  [AuthScreenEnum.DrawerStack]: undefined;
  [DrawerScreenEnum.Quests]: undefined;
  [DrawerScreenEnum.Collectables]: undefined;
  [DrawerScreenEnum.Miscellaneous]: undefined;
  [DrawerScreenEnum.Locations]: undefined;
  [DrawerScreenEnum.SendRequest]: undefined;
  [DrawerScreenEnum.Achievements]: undefined;
  [DrawerScreenEnum.LinkSteamProfile]: undefined;
  [DrawerScreenEnum.Payments]: undefined;
  [DrawerScreenEnum.GameSettings]: undefined;
  [DrawerScreenEnum.AccountDetails]: undefined;
};

// Responses

export type UserResponse = User | void;
export type StringResponse = string | void;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AxiosErrorResponse = AxiosError | any;

// Utils

export type LoggerType = 'info' | 'error' | 'warning';
export type FlowType = 'signup' | 'home';
export type GameListSelectionType = 'active' | 'inactive';
