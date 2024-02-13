import { GeneralData, LoginFormData, Subscription, SettingsOptionItem, UserSettings } from '@utils/CustomInterfaces';
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

export interface UpdateUserDataProps {
	userId: string;
	subscription: Subscription;
	settings: UserSettings;
	skyrimData: GeneralData;
	fallout4Data: GeneralData;
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
	updateUserData: ({ userId, subscription, settings, skyrimData, fallout4Data }: UpdateUserDataProps) => Promise<UserResponse>;
	sendEmail: ({ from, subject, text }: EmailProps) => Promise<UserResponse>;
	getSteamUserById: (appId: string, steamId: string) => Promise<void>;
	getSteamAchievementsById: (appId: string) => Promise<void>;
}