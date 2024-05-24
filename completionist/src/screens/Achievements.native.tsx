import React, { useState } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import { DrawerScreenEnum } from '@utils/CustomEnums';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import StyledText from '@components/general/Text/StyledText.native';
import AchievementView from '@components/custom/AchievementView/AchievementView.native';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import { games } from '@utils/constants';
import { AchievementItem } from '@utils/CustomInterfaces';
import { STANDARD_WIDTH } from '@styles/global.native';
import useGetTheme from '@styles/hooks/useGetTheme';

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
	}
]

const Achievements = () => {
	const { t } = useTranslation();
	const theme = useGetTheme();
	const [badgesOpen, setBadgesOpen] = useState<boolean>(true);
	const [achievementsOpen, setAchievementsOpen] = useState<boolean>(true);
	const [progressOpen, setProgressOpen] = useState<boolean>(true);

	return (
		<StandardLayout>
			<NavigationHeader
				id={DrawerScreenEnum.Miscellaneous}
				title={'Achievements'}
			/>
			<ScrollableList style={{ maxHeight: 600 }}>
				{/* <Dropdown
					isOpen={badgesOpen}
					setOpen={(): void => setBadgesOpen(!badgesOpen)}
					header={
						<StyledText
							align='left'
							type='SubHeading'
							style={{ width: STANDARD_WIDTH }}
						>
							Badges
						</StyledText>
					}
				>
					<View />
				</Dropdown> */}

				<Dropdown
					isOpen={achievementsOpen}
					setOpen={(): void => setAchievementsOpen(!achievementsOpen)}
					header={
						<StyledText
							align='left'
							type='SubHeading'
							color={theme.lightGrey}
							style={{ width: STANDARD_WIDTH, paddingBottom: 8 }}
						>
							Achievements
						</StyledText>
					}
				>
					{games.map(game => (
						<AchievementView
							title={t(`common:categories.${game}.title`)}
							items={mockAchievements}
						/>
					))}
				</Dropdown>

				<Dropdown
					isOpen={progressOpen}
					setOpen={(): void => setProgressOpen(!progressOpen)}
					header={
						<StyledText
							align='left'
							type='SubHeading'
							style={{ width: STANDARD_WIDTH }}
						>
							Progress
						</StyledText>
					}
				>
					<View />
				</Dropdown>
			</ScrollableList>
		</StandardLayout>
	);
};

export default Achievements;