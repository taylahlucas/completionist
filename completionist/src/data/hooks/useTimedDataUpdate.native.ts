import { useEffect } from 'react';
import useEndpoints from './useEndpoints.native';
import useMainState from '@redux/hooks/useMainState';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useLoginState from '@components/custom/LoginForm/hooks/useLoginState';

const useTimedDataUpdate = () => {
	const { updateUserData } = useEndpoints();
	const { setShouldUpdateUser } = useMainDispatch();
	const { user, shouldUpdateUser } = useMainState();
	const { isLoggedIn } = useLoginState();

	useEffect(() => {
		// Set up a timer to fetch data every 5 minutes (5 * 60 * 1000)
		const timerId = setInterval(() => {
			if (shouldUpdateUser && isLoggedIn) {
				updateUserData({
					userId: user.userId,
					subscription: user.subscription,
					settings: user.settings,
					skyrimData: user.data.skyrim,
					fallout4Data: user.data.fallout4
				});
				setShouldUpdateUser(false);
			}
		}, 5 * 60 * 1000)

		return () => clearInterval(timerId);
	}, [shouldUpdateUser]);
};

export default useTimedDataUpdate;