import React, { useEffect, useState } from 'react';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import useEndpoints from '@data/api/hooks/useEndpoints.native';
import useMainState from '@redux/hooks/useMainState';
import StyledText from '@components/general/Text/StyledText.native';
import { SteamAchievement } from '@utils/CustomInterfaces';

const SteamAchievementsContent = () => {
	const [achievements, setAchievements] = useState([]);
	const { selectedGameData } = useMainState();
	const { getSteamAchievementsById } = useEndpoints();

	useEffect(() => {
		getSteamAchievementsById(selectedGameData?.appId ?? '')
			.then((result) => {
				setAchievements(result);
			});
	}, []);

	return (
		<ScrollableList>
			{achievements.map((achievement: SteamAchievement, index: number) => (
				<StyledText key={index}>{achievement.displayName}</StyledText>
			))}
		</ScrollableList>

	);
};

export default SteamAchievementsContent;