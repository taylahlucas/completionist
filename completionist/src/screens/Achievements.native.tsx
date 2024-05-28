import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import { DrawerScreenEnum } from '@utils/CustomEnums';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import AchievementView from '@components/custom/AchievementView/AchievementView.native';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import AchievementDropdownTitle from '@components/custom/AchievementView/AchievementDropdownTitle.native';
import BadgeView from '@components/custom/BadgeView/BadgeView.native';
import ProgressView from '@components/custom/ProgressView/ProgressView.native';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import { mockAchievements, mockBadges, mockProgressData } from '@utils/test-helper/__mocks__/mocks';
import useFilterGameList from '@components/custom/GameList/hooks/useFilterGameList.native';
import useMainState from '@redux/hooks/useMainState';
import Button from '@components/general/Button/Button.native';

const Achievements = () => {
	const { t } = useTranslation();
	const navigation = useReactNavigation();
	const [badgesOpen, setBadgesOpen] = useState<boolean>(true);
	const [achievementsOpen, setAchievementsOpen] = useState<boolean>(true);
	const [progressOpen, setProgressOpen] = useState<boolean>(true);
	const [currentOpen, setCurrentOpen] = useState<string>('');
	const { user } = useMainState();
	const { filterGameList } = useFilterGameList();
	// TODO: For get games currently subscribed to by user
	const activeGames = filterGameList(user.subscription.data, true, '');

	useEffect(() => {
		console.log("user.steamId: ", user.steamId)
	}, [])

	return (
		<StandardLayout>
			<NavigationHeader
				id={DrawerScreenEnum.Miscellaneous}
				title={'Achievements'}
			/>
			<ScrollableList style={{ maxHeight: 600 }}>
				{/* Badges */}
				<Dropdown
					isOpen={badgesOpen}
					setOpen={(): void => setBadgesOpen(!badgesOpen)}
					header={
						<AchievementDropdownTitle
							title={'Badges'}
							isOpen={badgesOpen}
						/>
					}
				>
					<BadgeView items={mockBadges} />
				</Dropdown>

				{/* Achievements */}
				<Dropdown
					isOpen={achievementsOpen}
					setOpen={(): void => setAchievementsOpen(!achievementsOpen)}
					header={
						<AchievementDropdownTitle
							title={'Achievements'}
							isOpen={achievementsOpen}
						/>
					}
				>
					{!user.steamId ?
						<Button 
							type='navigation' 
							title='Link Steam account' 
							onPress={(): void => navigation.navigate(DrawerScreenEnum.SteamAchievements)}
						/>
						: <>
							{activeGames.map(game => (
								<AchievementView
									key={game.id}
									id={game.id}
									title={t(`common:categories.${game.id}.title`)}
									items={mockAchievements}
									currentOpen={currentOpen}
									setCurrentOpen={setCurrentOpen}
								/>
							))
							}
						</>

					}
				</Dropdown>

				{/* Progress */}
				<Dropdown
					isOpen={progressOpen}
					setOpen={(): void => setProgressOpen(!progressOpen)}
					header={
						<AchievementDropdownTitle
							title={'Progress'}
							isOpen={progressOpen}
						/>
					}
				>
					{/* // TODO: Change to activeGames */}
					{mockProgressData.map((game) => (
						<ProgressView
							key={game.id}
							gameId={game.id}
							title={t(`common:categories.${game.id}.title`)}
							data={game.data}
						/>
					))}
				</Dropdown>
			</ScrollableList>
		</StandardLayout>
	);
};

export default Achievements;