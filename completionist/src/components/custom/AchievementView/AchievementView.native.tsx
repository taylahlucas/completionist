import React, { useState } from 'react';
import { View } from 'react-native';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import StyledText from '@components/general/Text/StyledText.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import { AchievementItem } from '@utils/CustomInterfaces'
import { AchievementViewContainer } from './AchievementViewStyledComponents.native';
import Seperator from '@components/general/Seperator.native';
import { SMALL_WIDTH, STANDARD_WIDTH } from '@styles/global.native';
import Condition from '@components/general/Condition.native';
import Icon from '@components/general/Icon/Icon.native';
import { DropdownTitleContainer } from '@components/general/Dropdown/DropdownStyledComponents.native';
import { IconTypeEnum } from '@utils/CustomEnums';

interface AchievementViewProps {
	id: string;
	title: string;
	items: AchievementItem[];
	currentOpen: string;
	setCurrentOpen: (value: string) => void;
}

const AchievementView = ({ id, title, items, currentOpen, setCurrentOpen }: AchievementViewProps) => {
	const theme = useGetTheme();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const open = isOpen && id === currentOpen

	return (
		<>
			<Dropdown
				isOpen={open}
				setOpen={(): void => {
					setIsOpen(!isOpen);
					setCurrentOpen(id);
				}}
				header={
					<>
						<DropdownTitleContainer>
							<StyledText
								align='left'
								type='ListItemTitleBold'
								style={{ paddingTop: 8, paddingLeft: 8 }}
							>
								{title}
							</StyledText>
							<Icon 
								name={open ? 'arrow-drop-down' : 'arrow-right'} 
								type={IconTypeEnum.MaterialIcons}
								style={{ top: 6 }}
								color={theme.midGrey}
							/>
						</DropdownTitleContainer>
						<Seperator />
					</>
				}
			>
				<ScrollableList
					style={{ maxHeight: 200 }}
					contentContainerStyle={{ paddingBottom: 10 }}
				>
					{items.map((item) => (
						<AchievementViewContainer
							key={item.id}
							style={{
								backgroundColor: theme.darkGrey,
								borderColor: theme.midGrey
							}}
						>
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

							{item.description ?
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
								: null
							}
						</AchievementViewContainer>
					))}
				</ScrollableList>
			</Dropdown>
			<Condition condition={open}>
				<View
					style={{
						height: 1,
						width: STANDARD_WIDTH,
						backgroundColor: theme.black,
						shadowColor: 'black',
						shadowOpacity: 0.4,
						shadowRadius: 4,
						shadowOffset: {
							height: -3,
							width: 3
						}
					}} />
			</Condition>
		</>
	);
};

export default AchievementView;