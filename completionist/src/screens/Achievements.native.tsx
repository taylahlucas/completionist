import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import { DrawerScreenEnum } from '@utils/CustomEnums';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import AchievementView from '@components/custom/AchievementView/AchievementView.native';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import { games } from '@utils/constants';
import AchievementDropdownTitle from '@components/custom/AchievementView/AchievementDropdownTitle.native';
import BadgeView from '@components/custom/BadgeView/BadgeView.native';
import ProgressView from '@components/custom/ProgressView/ProgressView.native';

import { mockAchievements, mockBadges, mockProgressData } from '@utils/test-helper/__mocks__/mocks';
import useGetUserGameData from '@data/hooks/useGetUserGameData';
import useFilterGameList from '@components/custom/GameList/hooks/useFilterGameList.native';
import useMainState from '@redux/hooks/useMainState';

const Achievements = () => {
	const { t } = useTranslation();
	const [badgesOpen, setBadgesOpen] = useState<boolean>(true);
	const [achievementsOpen, setAchievementsOpen] = useState<boolean>(true);
	const [progressOpen, setProgressOpen] = useState<boolean>(true);
	const [currentOpen, setCurrentOpen] = useState<string>('');
	const { user } = useMainState();
	const { filterGameList } = useFilterGameList();
	// TODO: For get games currently subscribed to by user
	const activeGames = filterGameList(user.subscription.data, true, '');

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
					{activeGames.map(game => (
						<AchievementView
							key={game.id}
							id={game.id}
							title={t(`common:categories.${game.id}.title`)}
							items={mockAchievements}
							currentOpen={currentOpen}
							setCurrentOpen={setCurrentOpen}
						/>
					))}
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
					{mockProgressData.map((game) => (
						<ProgressView
							key={game.id}
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