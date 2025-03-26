import { GameKeyEnum } from '@utils/CustomEnums';
import {
  LoginFormData,
  User,
  SteamProfile,
  SteamAchievementItem,
} from '@utils/CustomInterfaces';
import { LanguageType, UserResponse } from '@utils/CustomTypes';

export interface SignUpProps {
  data: LoginFormData;
  lang: LanguageType;
}

export interface SignInProps {
  email: string;
  pw?: string;
  googleId?: string;
}

export interface CredentialsExistProps {
  regular: boolean;
  google: boolean;
}

export interface GetUserByUserIdProps {
  userId: string;
}

export interface SendEmailProps {
  emailTo: string;
  subject: string;
  text: string;
}

export interface ChangePwProps {
  userId: string;
  oldPw: string;
  newPw: string;
}

export interface ForgotPwProps {
  email: string;
  newPw: string;
}

export interface SteamAchievementsProps {
  steamId: string;
  gameId: string;
}

export interface SteamAchievementsReturnType {
  hasPermission: boolean;
  achievements: SteamAchievementItem[];
  noOfLocked: number;
}

export interface CreatePaymentProps {
  userId: string;
  amount: number;
  game: GameKeyEnum;
}

export interface GetGameDataProps {
  game: GameKeyEnum;
  lang: LanguageType;
}

export interface AuthEndpointsReturnType {
  checkUserExists: (email: string) => Promise<CredentialsExistProps>;
  linkAndSignIn: ({
    email,
    pw,
    googleId,
  }: SignInProps) => Promise<UserResponse>;
  signIn: ({ email, pw, googleId }: SignInProps) => Promise<UserResponse>;
  signUp: ({ data }: SignUpProps) => Promise<UserResponse>;
  sendVerificationEmail: ({
    emailTo,
    subject,
    text,
  }: SendEmailProps) => Promise<void>;
  forgotPw: ({ email, newPw }: ForgotPwProps) => Promise<void>;
}

export interface EndpointsReturnType {
  getUserByUserId: ({ userId }: GetUserByUserIdProps) => Promise<UserResponse>;
  updateUser: (user: User) => Promise<UserResponse>;
  changePw: ({ userId, oldPw, newPw }: ChangePwProps) => Promise<boolean>;
  sendEmail: ({ emailTo, subject, text }: SendEmailProps) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
  getSteamUserById: (
    userId: string,
    steamId: string,
  ) => Promise<SteamProfile | void>;
  getSteamPlayerAchievements: ({
    steamId,
    gameId,
  }: SteamAchievementsProps) => Promise<SteamAchievementsReturnType | void>;
  createPayment: ({ userId, amount, game }: CreatePaymentProps) => Promise<any>;
}
