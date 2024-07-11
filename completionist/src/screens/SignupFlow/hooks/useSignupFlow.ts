import useFilterGameList from '@components/custom/GameList/hooks/useFilterGameList.native';
import useLoginDispatch from '@components/custom/LoginForm/hooks/useLoginDispatch';
import useLoginState from '@components/custom/LoginForm/hooks/useLoginState';
import { SignInProps, SignUpProps } from '@data/api/EndpointInterfaces.native';
import useAuthEndpoints from '@data/api/hooks/useAuthEndpoints.native';
import useIsLoading from '@data/api/hooks/useIsLoading.native';
import useEditUserData from '@data/hooks/useEditUserData.native';
import useMainState from '@redux/hooks/useMainState';
import { ActiveGameData, LoginFormData, User } from '@utils/CustomInterfaces';
import { UserResponse } from '@utils/CustomTypes';
import useActivateGame from '@utils/hooks/useActivateGame.native';
import useFormatter from '@utils/hooks/useFormatter';
import { useState } from 'react';

interface SignupFlowViewModel {
	isLoading: boolean;
	loginFormData: LoginFormData;
	verificationToken: string | undefined;
	selectedFirstGame: ActiveGameData | undefined;
	searchValue: string;
	filteredGames: ActiveGameData[];
	user: User;
	username: string;
}

interface SignupFlowActions {
	signUp: ({ data }: SignUpProps) => Promise<UserResponse>;
	linkAndSignIn: ({ email, pw, googleId }: SignInProps) => Promise<UserResponse>;
	saveUser: (user: User) => void;
	updateUserData: (user: User) => void;
	setVerificationToken: (token: string | undefined) => void;
	setSearchValue: (value: string) => void;
	activateGame: (user: User, selectedGame: ActiveGameData) => void;
	setSelectedFirstGame: (value: ActiveGameData) => void;
	setLoggedIn: (value: boolean) => void;
	setUsername: (value: string) => void;
}

interface SignupFlowReturnType {
	viewModel: SignupFlowViewModel;
	actions: SignupFlowActions;
}

const useSignupFlow = (): SignupFlowReturnType => {
	const { loginFormData, verificationToken } = useLoginState();
	const { setVerificationToken, setLoggedIn } = useLoginDispatch();
	const { user } = useMainState();
	const { saveUser, updateUserData } = useEditUserData();
	const { signUp, linkAndSignIn } = useAuthEndpoints();
	const isLoading = useIsLoading();
	const { getFormattedSearchString } = useFormatter();
	const { activateGame } = useActivateGame();
	const { filterGameList } = useFilterGameList();
	
	const [username, setUsername] = useState<string>('');
	const [searchValue, setSearchValue] = useState('');
	const [selectedFirstGame, setSelectedFirstGame] = useState<ActiveGameData>();

	const filteredGames = filterGameList(user.activeGames, false, getFormattedSearchString(searchValue));

	return {
		viewModel: {
			isLoading,
			loginFormData,
			verificationToken,
			selectedFirstGame,
			searchValue,
			filteredGames,
			user,
			username
		},
		actions: {
			signUp,
			linkAndSignIn,
			saveUser,
			updateUserData,
			setVerificationToken,
			setSearchValue,
			activateGame,
			setSelectedFirstGame,
			setLoggedIn,
			setUsername
		}
	}
};

export default useSignupFlow;