import { LoginFormData, Subscription, UserSettings, UserData, SignupData } from '@utils/CustomInterfaces';
import { StringResponse, UserResponse } from '@utils/CustomTypes';

export interface CreateUserProps {
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
	authToken: string;
	userId: string;
}

export interface UpdateUserProps {
	authToken: string;
	userId: string;
	steamId?: string;
	signup?: SignupData;
	subscription: Subscription;
	settings: UserSettings;
	userAvatar?: string;
	data: UserData;
}

export interface EmailProps {
	emailTo: string;
	subject: string;
	text: string;
}

export interface EndpointsReturnType {
	checkUserExists: (email: string) => Promise<CredentialsExistProps>;
	linkAndSignIn: ({ email, password, googleId }: SignInProps) => Promise<UserResponse>;
	signIn: ({ email, password, googleId }: SignInProps) => Promise<UserResponse>;
	signUp: ({ data }: CreateUserProps) => Promise<UserResponse>;
	getUserByUserId: ({ authToken, userId }: GetUserByUserIdProps) => Promise<UserResponse>;
	updateUser: ({ authToken, userId, steamId, signup, subscription, settings, userAvatar, data }: UpdateUserProps) => Promise<UserResponse>;
	sendEmail: ({ emailTo, subject, text }: EmailProps) => Promise<void>;
	getSteamUserById: (appId: string, steamId: string) => Promise<StringResponse>;
	getSteamPlayerAchievements: (appId: string, steamId: string) => Promise<any>;
	getSteamAchievementsById: (appId: string) => Promise<any>;
}