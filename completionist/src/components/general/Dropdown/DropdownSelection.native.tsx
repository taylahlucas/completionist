import React from 'react';
import useGetTheme from '@styles/hooks/useGetTheme';
import { DropdownSelectionContainer, DropdownSelectionInnerContainer, DropdownSelectionTitle } from './DropdownStyledComponents.native';
import IconButton from '../Icon/IconButton.native';

interface DropdownSelectionProps {
	title: string;
	isSelected: boolean;
	onPress: () => void;
}

export const DropdownSelection = ({ title, isSelected = false, onPress }: DropdownSelectionProps) => {
	const theme = useGetTheme();

	return (
		<DropdownSelectionContainer color={theme.darkGrey} onPress={onPress}>
			<DropdownSelectionInnerContainer>
				<DropdownSelectionTitle
					type={'ListItemSubTitleBold'}
					color={theme.lightGrey}
					align='left'
					ellipsizeMode='tail'
					numberOfLines={1}
				>
					{title}
				</DropdownSelectionTitle>
				<IconButton
					name={isSelected ? 'arrow-drop-down' : 'arrow-right'}
					onPress={onPress}
					size={30}
					color={theme.lightGrey}
				/>
			</DropdownSelectionInnerContainer>
		</DropdownSelectionContainer>
	);
};