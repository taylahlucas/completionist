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
	authToken: string;
	userId: string;
}

export interface UpdateUserProps {
	authToken: string;
	userId: string;
	steamId?: string;
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

export interface VerifyUserProps {
	authToken: string;
	userId: string;
	signup: SignupData;
}

export interface EndpointsReturnType {
	checkUserExists: (email: string) => Promise<CredentialsExistProps>;
	linkAndSignIn: ({ email, password, googleId }: SignInProps) => Promise<UserResponse>;
	signIn: ({ email, password, googleId }: SignInProps) => Promise<UserResponse>;
	signUp: ({ data }: SignUpProps) => Promise<UserResponse>;
	getUserByUserId: ({ authToken, userId }: GetUserByUserIdProps) => Promise<UserResponse>;
	updateUser: ({ authToken, userId, steamId, subscription, settings, userAvatar, data }: UpdateUserProps) => Promise<UserResponse>;
	verifyUser: ({ authToken, userId, signup }: VerifyUserProps) => Promise<void>;
	sendEmail: ({ emailTo, subject, text }: EmailProps) => Promise<void>;
	getSteamUserById: (appId: string, steamId: string) => Promise<StringResponse>;
	getSteamPlayerAchievements: (appId: string, steamId: string) => Promise<any>;
	getSteamAchievementsById: (appId: string) => Promise<any>;
}