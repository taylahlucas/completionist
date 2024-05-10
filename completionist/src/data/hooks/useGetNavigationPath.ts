import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import { UnauthorizedScreenEnum, ScreenEnum } from '@utils/CustomEnums';
import { User } from '@utils/CustomInterfaces';

const useGetNavigationPath = () => {
	const navigation = useReactNavigation();
	
	const getLoginScreenEnum = (user: User) => {
		if (!user.signup.verification) {
			navigation.navigate(UnauthorizedScreenEnum.AccountVerification);
		}
		else if (!user.signup.selectPlan) {
			navigation.navigate(UnauthorizedScreenEnum.SelectInitialPlan);
		}
		else if (!user.signup.selectGame) {
			navigation.navigate(UnauthorizedScreenEnum.SelectFirstGame);
		}
	}

	return getLoginScreenEnum;

};

export default useGetNavigationPath;