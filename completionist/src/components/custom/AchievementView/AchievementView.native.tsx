import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import StyledText from '@components/general/Text/StyledText.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import { AchievementItem } from '@utils/CustomInterfaces'
import Seperator from '@components/general/Seperator.native';
import { SMALL_WIDTH, STANDARD_WIDTH, SMALL_PADDING, MID_PADDING, MID_WIDTH } from '@styles/global.native';
import Condition from '@components/general/Condition.native';
import Icon from '@components/general/Icon/Icon.native';
import { DropdownTitleContainer } from '@components/general/Dropdown/DropdownStyledComponents.native';
import { IconTypeEnum } from '@utils/CustomEnums';
import useEndpoints from '@data/api/hooks/useEndpoints.native';

interface AchievementViewProps {
	gameId: string;
	steamId: string
	title: string;
	currentOpen: string;
	setCurrentOpen: (value: string) => void;
}

const AchievementView = ({ gameId, steamId, title, currentOpen, setCurrentOpen }: AchievementViewProps) => {
	const theme = useGetTheme();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { getSteamPlayerAchievements } = useEndpoints();
	const open = isOpen && gameId === currentOpen;
	const [items, setItems] = useState<AchievementItem[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await getSteamPlayerAchievements({ steamId: steamId, gameId: gameId });
			setItems(response);
		}

		fetchData();
	}, [])

	return (
		<>
			<Dropdown
				isOpen={open}
				setOpen={(): void => {
					setIsOpen(!isOpen);
					setCurrentOpen(gameId);
				}}
				header={
					<>
						<DropdownTitleContainer>
							<StyledText
								align='left'
								numberOfLines={1}
								type='ListItemTitleBold'
								style={styles.dropdownTitle}
							>
								{title}
							</StyledText>
							<StyledText style={styles.amountTitle}>{
								`${items.filter(item => item.unlocked).length} / ${items.length}`
								}</StyledText>
							<Icon
								name={open ? 'arrow-drop-down' : 'arrow-right'}
								type={IconTypeEnum.MaterialIcons}
								style={{ top: 4 }}
								color={theme.midGrey}
							/>
						</DropdownTitleContainer>
						<Seperator />
					</>
				}
			>
				<ScrollableList
					style={{ maxHeight: 300 }}
					contentContainerStyle={{ paddingBottom: 10 }}
				>
					{items?.map((item, index) => (
						<View
							key={index}
							style={{
								...styles.container,
								backgroundColor: theme.darkGrey,
								borderColor: item.unlocked ? theme.lightPurple : theme.midGrey
							}}
						>
							<Image style={styles.icon} source={{ uri: item.icon }} />
							<View style={styles.iconContainer}>
								<StyledText
									align='left'
									type='ListItemTitleBold'
									color={item.unlocked ? theme.lightGrey : theme.midGrey}
									style={{
										...styles.itemTitle,
										paddingBottom: item.description ? SMALL_PADDING : 0
									}}
								>
									{item.name}
								</StyledText>

								{item.description ?
									<StyledText
										align='left'
										numberOfLines={2}
										style={styles.itemDescription}
									>
										{item.description}
									</StyledText>
									: null
								}
							</View>
						</View>
					))}
				</ScrollableList>
			</Dropdown>
			<Condition condition={open}>
				<View style={{
					...styles.shadowContainer,
					backgroundColor: theme.black
				}} />
			</Condition>
		</>
	);
};

export default AchievementView;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		width: '100%',
		borderRadius: 10,
		borderWidth: 2,
		marginBottom: SMALL_PADDING,
		marginTop: SMALL_PADDING,
		paddingLeft: 12,
		alignItems: 'center',
	},
	dropdownTitle: {
		paddingTop: SMALL_PADDING,
		paddingLeft: MID_PADDING,
		maxWidth: MID_WIDTH
	},
	amountTitle: {
		top: 4,
	},
	itemTitle: {
		paddingTop: SMALL_PADDING,
		paddingLeft: 12,
		paddingRight: 12,
	},
	itemDescription: {
		width: SMALL_WIDTH,
		paddingLeft: 12,
		paddingRight: 12,
		paddingBottom: SMALL_PADDING
	},
	iconContainer: {
		flexDirection: 'column'
	},
	icon: {
		width: 40,
		height: 40,
		borderRadius: 2
	},
	shadowContainer: {
		height: 1,
		width: STANDARD_WIDTH,
		shadowColor: 'black',
		shadowOpacity: 0.4,
		shadowRadius: 4,
		shadowOffset: {
			height: -3,
			width: 3
		}
	}
})