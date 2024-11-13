import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useFilterGameList from '@components/custom/GameList/hooks/useFilterGameList.native';
import useMainState from '@redux/hooks/useMainState';
import useGetGameProgressData from '@data/hooks/useGetGameProgressData.native';
import useEndpoints from '@data/api/hooks/useEndpoints.native';
import { AchievementItem } from '@utils/CustomInterfaces';
import useEditUserData from '@data/hooks/useEditUserData.native';
import { useGetActiveGames } from '@utils/hooks/useGetActiveGames.native';
import { useGetCurrentGameData } from '@utils/hooks/useGetCurrentGameData.native';

interface AchievementsState {
	isOpen: boolean;
	hasPermission: boolean;
	items: AchievementItem[];
	noOfLocked: number;
}

const useAchievements = () => {
	const { t } = useTranslation();
	const { user, selectedGame } = useMainState();
	const { getSteamPlayerAchievements } = useEndpoints();
	const { updateUserData } = useEditUserData();
	// const [badgesOpen, setBadgesOpen] = useState<boolean>(true);
	const [progressViewOpen, setProgressViewOpen] = useState<boolean>(true);
	const [currentAchievementOpen, setCurrentAchievementOpen] = useState<string>('');
	const [achievementsState, setAchievementsState] = useState<AchievementsState>({
		isOpen: true,
		hasPermission: !!user.steamId,
		items: [],
		noOfLocked: 0
	});
	const { filterGameList } = useFilterGameList();
	const { activeGames } = useGetActiveGames(user);
	const currentGame = useGetCurrentGameData(user, selectedGame?.toString() ?? '');
	const { getGameProgress } = useGetGameProgressData();
	const isGlobalAchievements = !selectedGame;


	useEffect(() => {
		const fetchData = async () => {
			console.log("HEREE should return game data", activeGames[0]?.[1])
			const currentGameId = selectedGame ? currentGame?.appId : activeGames[0]?.[1].appId;

			if (!currentGameId) {
				// TODO: Could not find any game id
				return;
			}

			if (user.steamId && currentGameId) {
				const response = await getSteamPlayerAchievements({ userId: user.userId, steamId: user.steamId, gameId: currentGameId });

				if (response && !response?.hasPermission) {
					setAchievementsState({
						...achievementsState,
						hasPermission: false
					});
				}
				else if (response && response?.achievements) {
					const items: AchievementItem[] = response?.noOfLocked > 0 ? [
						...response?.achievements,
						{
							id: 'locked',
							name: response?.noOfLocked + ' Locked Achievements',
							description: 'Unlock these by playing more of the game',
							unlocked: false,
							icon: '',
						}
					] : response?.achievements;
					setAchievementsState({
						...achievementsState,
						hasPermission: true,
						items: items,
						noOfLocked: response?.achievements.length + response?.noOfLocked,
					});
				}
			}
		}

		fetchData();
	}, [selectedGame]);

	return {
		viewModel: {
			user,
			achievements: {
				isGlobalAchievements,
				achievementsState,
				currentAchievementOpen,
				activeGames,
				progressViewOpen,
				selectedGame,
			},
			steamAchievements: {
				title: !user.steamId
				? t('common:screens.addSteamId')
				: t('common:screens.steamAchievements')
			},
		},
		actions: {
			setAchievementsState,
			setCurrentAchievementOpen,
			setProgressViewOpen,
			getGameProgress,
			updateUserData
		}
	};
};

export default useAchievements;