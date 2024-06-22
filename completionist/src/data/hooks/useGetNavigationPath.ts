import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import { UnauthorizedScreenEnum } from '@utils/CustomEnums';
import { User } from '@utils/CustomInterfaces';

const useGetNavigationPath = () => {
	const navigation = useReactNavigation();
	
	const getAuthNavigationPath = (user: User) => {
		if (!user.signup.verification) {
			navigation.navigate(UnauthorizedScreenEnum.AccountVerification);
		}
		// else if (!user.signup.sele) {
		// 	navigation.navigate(UnauthorizedScreenEnum.SelectInitialPlan);
		// }
		else if (!user.signup.selectGame) {
			navigation.navigate(UnauthorizedScreenEnum.SelectFirstGame);
		}
	}

	return getAuthNavigationPath;

};

export default useGetNavigationPath;