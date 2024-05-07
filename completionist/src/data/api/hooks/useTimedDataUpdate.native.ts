import { useEffect } from 'react';
import useMainState from '@redux/hooks/useMainState';
import useLoginState from '@components/custom/LoginForm/hooks/useLoginState';
import useEditUserData from '@data/hooks/useEditUserData.native';

const useTimedDataUpdate = () => {
	const { user, shouldUpdateUser } = useMainState();
	const { isLoggedIn } = useLoginState();
	const { updateUserData } = useEditUserData();

	useEffect(() => {
		// Set up a timer to fetch data every 5 minutes (5 * 60 * 1000)
		const timerId = setInterval(() => {
			if (shouldUpdateUser && isLoggedIn) {
				updateUserData(user, false);
			}
		}, 5 * 60 * 1000)

		return () => clearInterval(timerId);
	}, []);
};

export default useTimedDataUpdate;