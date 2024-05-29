import React, { useState, useEffect } from 'react';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import { SteamAchievement } from '@utils/CustomInterfaces';
import SteamAchievementItem from './SteamAchievementItem.native';
import useSteamAchievements from './hooks/useSteamAchievements.native';
import StyledText from '@components/general/Text/StyledText.native';
import Spacing from '@components/general/Spacing.native';
import useMainState from '@redux/hooks/useMainState';

// TODO: Remove this?

const SteamAchievementsContent = () => {
	const [achievements, setAchievements] = useState([]);
	const [completed, setCompleted] = useState([]);
	const { selectedGame } = useMainState();
	const { fetchSteamAchievements } = useSteamAchievements();

	useEffect(() => {
		fetchSteamAchievements()
		.then((result) => {
			if (!!result) {
				setAchievements(result);
				const completed = result.filter((item: SteamAchievement) => item.achieved);
				setCompleted(completed);
			}
		});
	}, [selectedGame]);

	return (
		<ScrollableList>
			<StyledText>{`${completed.length.toString()} / ${achievements.length.toString()}`}</StyledText>
			<Spacing />
			<>
				{achievements.map((achievement: SteamAchievement, index: number) => (
					<SteamAchievementItem key={index} achievement={achievement} />
				))}
			</>
		</ScrollableList>

	);
};

export default SteamAchievementsContent;