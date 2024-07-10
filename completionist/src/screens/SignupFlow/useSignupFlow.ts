import useFilterGameList from '@components/custom/GameList/hooks/useFilterGameList.native';
import useLoginDispatch from '@components/custom/LoginForm/hooks/useLoginDispatch';
import useLoginState from '@components/custom/LoginForm/hooks/useLoginState';
import useAuthEndpoints from '@data/api/hooks/useAuthEndpoints.native';
import useIsLoading from '@data/api/hooks/useIsLoading.native';
import useEditUserData from '@data/hooks/useEditUserData.native';
import useMainState from '@redux/hooks/useMainState';
import { ActiveGameData } from '@utils/CustomInterfaces';
import useActivateGame from '@utils/hooks/useActivateGame.native';
import useFormatter from '@utils/hooks/useFormatter';
import { useState } from 'react';

const useSignupFlow = () => {
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