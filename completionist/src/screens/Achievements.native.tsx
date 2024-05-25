import React, { useState } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import { DrawerScreenEnum } from '@utils/CustomEnums';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import AchievementView from '@components/custom/AchievementView/AchievementView.native';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import { games } from '@utils/constants';
import { AchievementItem } from '@utils/CustomInterfaces';
import AchievementDropdownTitle from '@components/custom/AchievementView/AchievementDropdownTitle.native';

const mockAchievements: AchievementItem[] = [
	{
		id: '1',
		title: 'Complete main quests',
		description: 'Complete all main quests in Fallout 4',
		icon: 'icon1.png'
	},
	{
		id: '2',
		title: 'Complete all side quests',
		description: 'Complete all side quests in Fallout 4',
		icon: 'icon2.png'
	},
	{
		id: '3',
		title: 'Find all collectables',
		description: 'Find all collectables in Fallout 4',
		icon: 'icon3.png'
	},
	{
		id: '4',
		title: 'Discover all locations',
		description: 'Discover all locations in Fallout 4',
		icon: 'icon4.png'
	},
]

const Achievements = () => {
	const { t } = useTranslation();
	const [badgesOpen, setBadgesOpen] = useState<boolean>(true);
	const [achievementsOpen, setAchievementsOpen] = useState<boolean>(true);
	const [progressOpen, setProgressOpen] = useState<boolean>(true);
	const [currentOpen, setCurrentOpen] = useState<string>('');

	return (
		<StandardLayout>
			<NavigationHeader
				id={DrawerScreenEnum.Miscellaneous}
				title={'Achievements'}
			/>
			<ScrollableList
				style={{ maxHeight: 600 }}
			//  scrollEnabled={false}
			>
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
					<View />
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
					{games.map(game => (
						<AchievementView
							key={game}
							id={game}
							title={t(`common:categories.${game}.title`)}
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
					<View />
				</Dropdown>
			</ScrollableList>
		</StandardLayout>
	);
};

export default Achievements;