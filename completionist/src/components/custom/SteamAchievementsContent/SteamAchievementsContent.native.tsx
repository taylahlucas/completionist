import React, { useEffect, useState } from 'react';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import useEndpoints from '@data/api/hooks/useEndpoints.native';
import useMainState from '@redux/hooks/useMainState';
import { SteamAchievement, SteamPlayerAchievement } from '@utils/CustomInterfaces';
import SteamAchievementItem from './SteamAchievementItem.native';

const SteamAchievementsContent = () => {
	const [combinedResults, setCombinedResults] = useState([]);
	const { user, selectedGame, selectedGameData } = useMainState();
	const { getSteamAchievementsById, getSteamPlayerAchievements } = useEndpoints();
	
	useEffect(() => {
		if (!!selectedGameData?.appId) {
			getSteamAchievementsById(selectedGameData?.appId)
				.then((result) => {
					if (!!result) {
						getSteamPlayerAchievements(selectedGameData?.appId, user.steamId ?? '')
							.then((playerResult) => {
								if (!!playerResult) {
									const updatedResults = result.map((item: SteamAchievement) => {
										const updatedResult = playerResult.find((playerItem: SteamPlayerAchievement) => item.name === playerItem.name);
										return {
											...item,
											achieved: updatedResult?.achieved ?? false
										}
									});

									setCombinedResults(updatedResults);
								}
							});
					}
				});
		}
	}, [selectedGame]);

	return (
		<ScrollableList>
			{combinedResults.map((achievement: SteamAchievement, index: number) => (
				<SteamAchievementItem key={index} achievement={achievement} />
			))}
		</ScrollableList>

	);
};

export default SteamAchievementsContent;