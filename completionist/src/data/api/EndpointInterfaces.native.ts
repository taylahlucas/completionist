import { LoginFormData, Subscription, UserSettings, UserData, SignupData, SteamProfile } from '@utils/CustomInterfaces';
import { UserResponse } from '@utils/CustomTypes';

export interface SignUpProps {
	data: LoginFormData;
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

export interface UpdateUserProps {
	userId: string;
	name?: string;
	email?: string,
	steamId?: string;
	subscription: Subscription;
	settings: UserSettings;
	userAvatar?: string;
	data: UserData;
}

export interface SendEmailProps {
	emailTo: string;
	subject: string;
	text: string;
}

export interface UpdateSignUpProps {
	userId: string;
	signup: SignupData;
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

export interface AuthEndpointsReturnType {
	checkUserExists: (email: string) => Promise<CredentialsExistProps>;
	linkAndSignIn: ({ email, pw, googleId }: SignInProps) => Promise<UserResponse>;
	signIn: ({ email, pw, googleId }: SignInProps) => Promise<UserResponse>;
	signUp: ({ data }: SignUpProps) => Promise<UserResponse>;
	sendVerificationEmail: ({ emailTo, subject, text }: SendEmailProps) => Promise<void>;
	forgotPw: ({ email, newPw }: ForgotPwProps) => Promise<void>;
}

export interface EndpointsReturnType {
	getUserByUserId: ({ userId }: GetUserByUserIdProps) => Promise<UserResponse>;
	updateUser: ({ userId, name, email, steamId, subscription, settings, userAvatar, data }: UpdateUserProps) => Promise<UserResponse>;
	updateSignUp: ({ userId, signup }: UpdateSignUpProps) => Promise<void>;
	changePw: ({ userId, oldPw, newPw }: ChangePwProps) => Promise<void>;
	sendEmail: ({ emailTo, subject, text }: SendEmailProps) => Promise<void>;
	getSteamUserById: (steamId: string) => Promise<SteamProfile | void>;
	getSteamPlayerAchievements: ({ steamId, gameId }: SteamAchievementsProps) => Promise<any>;
}