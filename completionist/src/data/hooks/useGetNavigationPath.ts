import { ScreenEnum } from '@utils/CustomEnums';
import { User } from '@utils/CustomInterfaces';

const useGetNavigationPath = () => {
	const getLoginScreenEnum = (user: User): ScreenEnum => {
		if (!!user.userId && !user.signup.complete) {
			if (!user.signup.steps.verification) {
				return ScreenEnum.AccountVerification;
			}
			else if (!user.signup.steps.selectPlan) {
				return ScreenEnum.SelectPlan;
			}
			else if (!user.signup.steps.selectGame) {
				return ScreenEnum.SelectFirstGame;
			}
		}

		return ScreenEnum.GameSelection;
	}

	return getLoginScreenEnum;

};

export default useGetNavigationPath;