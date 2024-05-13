import { LoginFormData, Subscription, UserSettings, UserData, SignupData } from '@utils/CustomInterfaces';
import { StringResponse, UserResponse } from '@utils/CustomTypes';

export interface SignUpProps {
	data: LoginFormData;
}

export interface SignInProps {
	email: string;
	password?: string;
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

export interface AuthEndpointsReturnType {
	checkUserExists: (email: string) => Promise<CredentialsExistProps>;
	linkAndSignIn: ({ email, password, googleId }: SignInProps) => Promise<UserResponse>;
	signIn: ({ email, password, googleId }: SignInProps) => Promise<UserResponse>;
	signUp: ({ data }: SignUpProps) => Promise<UserResponse>;
	sendVerificationEmail: ({ emailTo, subject, text }: SendEmailProps) => Promise<void>;
}

export interface EndpointsReturnType {
	getUserByUserId: ({ userId }: GetUserByUserIdProps) => Promise<UserResponse>;
	updateUser: ({ userId, name, email, steamId, subscription, settings, userAvatar, data }: UpdateUserProps) => Promise<UserResponse>;
	updateSignUp: ({ userId, signup }: UpdateSignUpProps) => Promise<void>;
	changePw: ({ userId, oldPw, newPw }: ChangePwProps) => Promise<void>;
	sendEmail: ({ emailTo, subject, text }: SendEmailProps) => Promise<void>;
	getSteamUserById: (appId: string, steamId: string) => Promise<StringResponse>;
	getSteamPlayerAchievements: (appId: string, steamId: string) => Promise<any>;
	getSteamAchievementsById: (appId: string) => Promise<any>;
}