import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import { DrawerScreenEnum, AuthScreenEnum, GameKeyEnum } from '@utils/CustomEnums';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import AchievementView from '@components/custom/AchievementView/AchievementView.native';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import AchievementDropdownTitle from '@components/custom/AchievementView/AchievementDropdownTitle.native';
import BadgeView from '@components/custom/BadgeView/BadgeView.native';
import ProgressView from '@components/custom/ProgressView/ProgressView.native';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import { mockBadges } from '@utils/test-helper/__mocks__/mocks';
import useFilterGameList from '@components/custom/GameList/hooks/useFilterGameList.native';
import useMainState from '@redux/hooks/useMainState';
import Button from '@components/general/Button/Button.native';
import useGetGameProgressData from '@data/hooks/useGetGameProgressData.native';

const Achievements = () => {
	const { t } = useTranslation();
	const navigation = useReactNavigation();
	const [badgesOpen, setBadgesOpen] = useState<boolean>(true);
	const [achievementsOpen, setAchievementsOpen] = useState<boolean>(true);
	const [progressOpen, setProgressOpen] = useState<boolean>(true);
	const [currentOpen, setCurrentOpen] = useState<string>('');
	const { user, selectedGame } = useMainState();
	const { filterGameList } = useFilterGameList();
	const activeGames = filterGameList(user.subscription.data, true, '');
	const { getGameProgress } = useGetGameProgressData();
	const isGlobalAchievements = !selectedGame;

	return (
		<StandardLayout>
			<NavigationHeader
				id={isGlobalAchievements ? AuthScreenEnum.GlobalAchievements : DrawerScreenEnum.Achievements}
				title={'Achievements'}
				leftAction={isGlobalAchievements ? 'back' : 'menu'}
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
					{user.steamId ?
						<>
							{activeGames.map(game => (
								<AchievementView
									key={game.id}
									gameId={user.data[game.id].appId}
									steamId={user.steamId ?? ''}
									title={t(`common:categories.${game.id}.title`)}
									currentOpen={currentOpen}
									setCurrentOpen={setCurrentOpen}
								/>
							))
							}
						</>
						:
						<Button
							type='navigation'
							title='Link Steam account'
							onPress={(): void => navigation.navigate(DrawerScreenEnum.SteamAchievements)}
						/>
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
					{getGameProgress(activeGames.map(game => game.id as GameKeyEnum)).map((game) => (
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