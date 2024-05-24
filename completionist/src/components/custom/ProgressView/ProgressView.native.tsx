import React from 'react';
import { View } from 'react-native'; 
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import StyledText from '@components/general/Text/StyledText.native';
import useGetTheme from '@styles/hooks/useGetTheme';

interface ProgressContentItem {
	current: number;
	total: number;
}

interface ProgressItem {
	quests: ProgressContentItem;
	collectables: ProgressContentItem;
	locations: ProgressContentItem;
	miscellaneous: ProgressContentItem;
}

interface ProgressViewProps {
	title: string;
	items: ProgressItem[];
}

const ProgressView = ({ title, items }: ProgressViewProps) => {
	const theme = useGetTheme();
	
	return (
		<Dropdown
		isOpen={true}
		setOpen={(): void => {}}
		header = {
			<StyledText>{title}</StyledText>
		}
	>
		<ScrollableList>
			{items.map((item) => (
				<View style={{ backgroundColor: theme.darkGrey }}>

				</View>
			))}
		</ScrollableList>
	</Dropdown>
	);
};

export default ProgressView;