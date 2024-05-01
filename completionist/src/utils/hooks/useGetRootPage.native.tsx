import React from 'react';
import { User } from '@utils/CustomInterfaces'
import AccountVerification from '@screens/AccountVerification.native';
import SelectPlan from '@screens/SelectPlan.native';
import SelectFirstGame from '@screens/SelectFirstGame.native';
import GameSelection from '@screens/GameSelection.native';
import Login from '@screens/Login.native';

const useGetRootPage = () => {
	const getRootPage = (user: User, isLoggedIn: boolean): JSX.Element => {
		if (!!user.userId && !user.signup.complete) {
			if (!user.signup.steps.verification) {
				return <AccountVerification />
			}
			else if (!user.signup.steps.selectPlan) {
				return <SelectPlan />
			}
			else if (!user.signup.steps.selectGame) {
				return <SelectFirstGame />
			}
		}
		else if (isLoggedIn && !!user.userId) {
			return <GameSelection />
		}

		return <Login />
	};

	return getRootPage;
};

export default useGetRootPage;