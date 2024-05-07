import { ScreenEnum } from '@utils/CustomEnums';
import { User } from '@utils/CustomInterfaces';

const useGetNavigationPath = () => {
	const getLoginScreenEnum = (user: User): ScreenEnum => {
		if (!user.signup.verification) {
			return ScreenEnum.AccountVerification;
		}
		else if (!user.signup.selectPlan) {
			return ScreenEnum.SelectPlan;
		}
		else if (!user.signup.selectGame) {
			return ScreenEnum.SelectFirstGame;
		}

		return ScreenEnum.GameSelection;
	}

	return getLoginScreenEnum;

};

export default useGetNavigationPath;