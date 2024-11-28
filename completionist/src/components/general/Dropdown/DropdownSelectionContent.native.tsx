import React from 'react';
import useGetTheme from '@styles/hooks/useGetTheme';
import { DropdownSelectionItemTitle, DropdownSelectionContentItem } from './DropdownStyledComponents.native';
import ScrollableList from '@components/general/Lists/ScrollableList.native';

interface DropdownSelectionProps {
	id: string;
	title: string;
}

interface DropdownSelectionContentProps {
	content: DropdownSelectionProps[];
	onPress: (value: string) => void;
}

export const DropdownSelectionContent = ({ content, onPress }: DropdownSelectionContentProps) => {
	const theme = useGetTheme();

	return (
		<ScrollableList
			bounces={false}
			alignItems={true}
			style={{ maxHeight: content.length * 45 }}
		>
			{content.map((item, index) => (
				<DropdownSelectionContentItem
					key={index}
					last={index === content.length - 1}
					color={theme.darkGrey}
					onPress={() => onPress(item.id)}
				>
					<DropdownSelectionItemTitle type='ListItemSubTitleBold' align='left'>{item.title}</DropdownSelectionItemTitle>
				</DropdownSelectionContentItem>
			))}
		</ScrollableList>
	);
};