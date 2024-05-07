import React from 'react';
import useGetTheme from '@styles/hooks/useGetTheme';
import useSubscriptionDispatch from '../../custom/SubscriptionContent/hooks/useContentDispatch';
import { SubscriptionOptionsListProps } from '../../custom/SubscriptionContent/hooks/useGetSubscriptionOptionsList';
import Condition from '@components/general/Condition.native';
import { IconTypeEnum } from '@utils/CustomEnums';
import { SelectedItemContainer, SelectedItemIconContainer, SubscriptionOptionsItemContainerIcon } from './SelectableItemStyledComponents.native';

interface SubscriptionSelectableItemProps {
	item: SubscriptionOptionsListProps;
	isSelected: boolean;
	onPress?: () => void;
	children: JSX.Element | JSX.Element[];
}

const SelectableItem = ({ item, onPress, isSelected, children }: SubscriptionSelectableItemProps) => {
	const theme = useGetTheme();
	const { setSelectedSubscription } = useSubscriptionDispatch();

	return (
		<SelectedItemContainer
			key={item.id}
			color={isSelected ? theme.lightPurple : theme.darkGrey}
			onPress={onPress}
		>
			<Condition condition={isSelected}>
				<SelectedItemIconContainer color={theme.lightPurple}>
					<SubscriptionOptionsItemContainerIcon
						name='checkmark-sharp'
						type={IconTypeEnum.Ionicons}
						size={24}
					/>
				</SelectedItemIconContainer>
			</Condition>
			{children}
		</SelectedItemContainer>
	);
};

export default SelectableItem;