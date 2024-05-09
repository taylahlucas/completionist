import { UnauthorizedScreenEnum, ScreenEnum } from '@utils/CustomEnums';
import { User } from '@utils/CustomInterfaces';

const useGetNavigationPath = () => {
	const getLoginScreenEnum = (user: User): UnauthorizedScreenEnum => {
		if (!user.signup.verification) {
			return UnauthorizedScreenEnum.AccountVerification;
		}
		else if (!user.signup.selectPlan) {
			return UnauthorizedScreenEnum.SelectInitialPlan;
		}
		else if (!user.signup.selectGame) {
			return UnauthorizedScreenEnum.SelectFirstGame;
		}
		return UnauthorizedScreenEnum.Login;
	}

	return getLoginScreenEnum;

};

export default useGetNavigationPath;