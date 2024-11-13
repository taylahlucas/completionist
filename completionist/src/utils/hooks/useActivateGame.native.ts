import useEditUserData from '@data/hooks/useEditUserData.native';
import { GameKeyEnum } from '@utils/CustomEnums';
import { IsActive, GeneralData, User } from '@utils/CustomInterfaces';
import { fallout3GameData, fallout4GameData, skyrimGameData, witcher3GameData } from '@utils/gameConfigs';

const useActivateGame = () => {
	const { updateUserData } = useEditUserData();

	// Free users
	const changeGameSubscription = (user: User, selectedGame: IsActive, changesLeft: number) => {
		// TODO: Update
		// const updatedGames: IsActive[] = user.subscription.data.map((data: IsActive) => {
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

	const getGameData = (id: string) => {
		switch (id) {
			case 'fallout3':
				return fallout3GameData;
			case 'fallout4':
				return fallout4GameData;
			case 'skyrim':
				return skyrimGameData;
			case 'witcher3':
				return witcher3GameData
		}
	};
	
	// User set up and premium users
	const activateGame = (user: User, selectedGame: GameKeyEnum) => {
		updateUserData({
			...user,
			gameData: [
				...user.gameData,
				{
					selectedGame: {
						...getGameData(selectedGame),
						isActive: true
					} as GeneralData
				}
			]	
		});
	};

	return { changeGameSubscription, activateGame };
};

export default useActivateGame;