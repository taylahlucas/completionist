import useEditUserData from '@data/hooks/useEditUserData.native';
import { ActiveGameData, User } from '@utils/CustomInterfaces';

const useActivateGameSubscription = () => {
	const { updateUserData } = useEditUserData();

	// Free users
	const changeGameSubscription = (user: User, selectedGame: ActiveGameData, changesLeft: number) => {
		// TODO: Update
		// const updatedGames: ActiveGameData[] = user.subscription.data.map((data: ActiveGameData) => {
		// 	return {
		// 		id: data.id,
		// 		isActive: data.id === selectedGame?.id
		// 	};
		// });

		// const updatedUser = {
		// 	...user,
		// 	subscription: {
		// 		...user.subscription,
		// 		changesLeft: changesLeft,
		// 		data: updatedGames
		// 	}
		// };
		// updateUserData(updatedUser);
	};
	
	// User set up and premium users
	const activateGameSubscription = (user: User, selectedGame: ActiveGameData) => {
		// TODO:
		const activeGames: ActiveGameData[] = user.activeGames.map((game: ActiveGameData) => {
			return (game.id === selectedGame?.id)
				? {
					id: game.id,
					isActive: true
				} : game;
		});
		updateUserData({
			...user,
			activeGames
		});
	};

	return { changeGameSubscription, activateGameSubscription };
};

export default useActivateGameSubscription;