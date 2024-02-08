import { useEffect } from 'react';
import useEndpoints from './useEndpoints';
import useMainState from '@redux/hooks/useMainState';

const useTimedDataUpdate = () => {
	const { updateUserData } = useEndpoints();
	const { user } = useMainState();

	const updateUser = () => {
		if (!!user.userId) {
			updateUserData({
				userId: user.userId,
				subscription: user.subscription,
				settings: user.settings,
				skyrimData: user.data.skyrim,
				fallout4Data: user.data.fallout4
			});
		}
	};

	useEffect(() => {
		const timerId = setInterval(updateUser, 5 * 60 * 1000);

		return () => clearInterval(timerId);
	}, []);

};

export default useTimedDataUpdate;