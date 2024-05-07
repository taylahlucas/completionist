import useEditUserData from '@data/hooks/useEditUserData.native';
// import useMainState from '@redux/hooks/useMainState';
import { SubscriptionData, User } from '@utils/CustomInterfaces';

const useActivateGameSubscription = () => {
	// const { user } = useMainState();
	const { saveUserAndLogin } = useEditUserData();

	// Free users
	const changeGameSubscription = (user: User, selectedGame: SubscriptionData, changesLeft: number) => {
		const updatedGames: SubscriptionData[] = user.subscription.data.map((data: SubscriptionData) => {
			return {
				id: data.id,
				isActive: data.id === selectedGame?.id
			};
		});

		const updatedUser = {
			...user,
			subscription: {
				...user.subscription,
				changesLeft: changesLeft,
				data: updatedGames
			}
		};
		// TODO: Fix here, need to update user
		saveUserAndLogin(updatedUser, false);
	};
	
	// User set up and premium users
	const activateGameSubscription = (user: User, selectedGame: SubscriptionData): User => {
		const updatedGames: SubscriptionData[] = user.subscription.data.map((data: SubscriptionData) => {
			return (data.id === selectedGame?.id)
				? {
					id: data.id,
					isActive: true
				} : data;
		});
		const updatedUser = {
			...user,
			subscription: {
				...user.subscription,
				data: updatedGames
			}
		};
		return updatedUser;
	};

	return { changeGameSubscription, activateGameSubscription };
};

export default useActivateGameSubscription;