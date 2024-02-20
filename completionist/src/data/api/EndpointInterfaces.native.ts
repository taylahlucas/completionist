import { LoginFormData, Subscription, UserSettings, UserData } from '@utils/CustomInterfaces';
import { StringResponse, UserResponse } from '@utils/CustomTypes';

export interface CreateUserProps {
	data: LoginFormData;
}

export interface SignInProps {
	email: string;
	password: string;
}

export interface GetUserByUserIdProps {
	userId: string;
}

export interface UpdateUserProps {
	userId: string;
	steamId?: string;
	subscription: Subscription;
	settings: UserSettings;
	userAvatar?: string;
	data: UserData;
}

export interface EmailProps {
	from: string;
	subject: string;
	text: string;
}

export interface EndpointsReturnType {
	signIn: ({ email, password }: SignInProps) => Promise<UserResponse>;
	signUp: ({ data }: CreateUserProps) => Promise<UserResponse>;
	getUserByUserId: ({ userId }: GetUserByUserIdProps) => Promise<UserResponse>;
	updateUser: ({ userId, steamId, subscription, settings, userAvatar, data }: UpdateUserProps) => Promise<UserResponse>;
	sendEmail: ({ from, subject, text }: EmailProps) => Promise<UserResponse>;
	getSteamUserById: (appId: string, steamId: string) => Promise<StringResponse>;
	getSteamPlayerAchievements: (appId: string, steamId: string) => Promise<any>;
	getSteamAchievementsById: (appId: string) => Promise<any>;
}