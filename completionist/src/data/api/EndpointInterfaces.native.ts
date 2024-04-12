import { LoginFormData, Subscription, UserSettings, UserData } from '@utils/CustomInterfaces';
import { CredentialsResponse, StringResponse, UserResponse } from '@utils/CustomTypes';

export interface CreateUserProps {
	data: LoginFormData;
}

export interface SignInProps {
	email: string;
	password: string;
}

export interface GetUserByUserIdProps {
	authToken: string;
	userId: string;
}

export interface UpdateUserInfoProps {
	authToken: string;
	userId: string;
	steamId?: string;
	subscription: Subscription;
	settings: UserSettings;
	userAvatar?: string;
}

export interface UpdateUserDataProps {
	authToken: string;
	userId: string;
	data: UserData;
}

export interface EmailProps {
	authToken: string;
	from: string;
	subject: string;
	text: string;
}

export interface EndpointsReturnType {
	signIn: ({ email, password }: SignInProps) => Promise<CredentialsResponse>;
	signUp: ({ data }: CreateUserProps) => Promise<UserResponse>;
	getUserByUserId: ({ authToken, userId }: GetUserByUserIdProps) => Promise<UserResponse>;
	updateUserInfo: ({ authToken, userId, steamId, subscription, settings, userAvatar }: UpdateUserInfoProps) => Promise<UserResponse>;
	updateUserData: ({ authToken, userId, data }: UpdateUserDataProps) => Promise<UserResponse>;
	sendEmail: ({ authToken, from, subject, text }: EmailProps) => Promise<UserResponse>;
	getSteamUserById: (appId: string, steamId: string) => Promise<StringResponse>;
	getSteamPlayerAchievements: (appId: string, steamId: string) => Promise<any>;
	getSteamAchievementsById: (appId: string) => Promise<any>;
}