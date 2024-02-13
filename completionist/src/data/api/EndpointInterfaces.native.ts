import { LoginFormData, Subscription, UserSettings, UserData } from '@utils/CustomInterfaces';
import { UserResponse } from '@utils/CustomTypes';

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

export interface UpdateUserInfoProps {
	userId: string;
	steamId?: string;
	subscription: Subscription;
	settings: UserSettings;
	userAvatar?: string;
}

export interface UpdateUserDataProps {
	userId: string;
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
	updateUserInfo: ({ userId, steamId, subscription, settings, userAvatar }: UpdateUserInfoProps) => Promise<UserResponse>;
	updateUserData: ({ userId, data }: UpdateUserDataProps) => Promise<UserResponse>;
	sendEmail: ({ from, subject, text }: EmailProps) => Promise<UserResponse>;
	getSteamUserById: (appId: string, steamId: string) => Promise<void>;
	getSteamAchievementsById: (appId: string) => Promise<void>;
}