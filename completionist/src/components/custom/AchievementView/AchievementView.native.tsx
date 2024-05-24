import React, { useState } from 'react';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import StyledText from '@components/general/Text/StyledText.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import { AchievementItem } from '@utils/CustomInterfaces'
import { AchievementViewContainer } from './AchievementViewStyledComponents.native';
import Seperator from '@components/general/Seperator.native';
import Condition from '@components/general/Condition.native';
import { SMALL_WIDTH } from '@styles/global.native';

interface AchievementViewProps {
	title: string;
	items: AchievementItem[];
}

const AchievementView = ({ title, items }: AchievementViewProps) => {
	const theme = useGetTheme();
	const [isOpen, setIsOpen] = useState<boolean>(true);

	return (
		<Dropdown
			isOpen={isOpen}
			setOpen={(): void => setIsOpen(!isOpen)}
			header={
				<>
					<StyledText
						align='left'
						type='ListItemTitleBold'
						style={{ paddingTop: 8 }}
					>
						{title}
					</StyledText>
					<Seperator />
				</>
			}
		>
			<ScrollableList style={{ maxHeight: 200 }}>
				{items.map((item) => (
					<AchievementViewContainer style={{
						backgroundColor: theme.darkGrey,
						borderColor: theme.midGrey
					}}>
						<StyledText
							align='left'
							type='ListItemTitleBold'
							style={{
								paddingTop: 8,
								paddingLeft: 12,
								paddingRight: 12,
								paddingBottom: item.description ? 8 : 0
							}}
						>
							{item.title}
						</StyledText>

						<Condition condition={!!item.description}>
							<StyledText
								align='left'
								numberOfLines={2}
								style={{
									width: SMALL_WIDTH,
									paddingLeft: 12,
									paddingRight: 12,
									paddingBottom: 8
								}}
							>
								{item.description}
							</StyledText>
						</Condition>
					</AchievementViewContainer>
				))}
			</ScrollableList>
		</Dropdown>
	);
};

export default AchievementView;