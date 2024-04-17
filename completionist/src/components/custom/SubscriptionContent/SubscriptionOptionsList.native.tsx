import React, { useEffect } from 'react';
import useGetSubscriptionOptionsList, { SubscriptionOptionsListProps } from './hooks/useGetSubscriptionOptionsList';
import StyledText from '@components/general/Text/StyledText.native';
import { SubscriptionOptionsContainer } from './SubscriptionContentStyledComponents.native';
import SubscriptionOptionDescription from './SubscriptionOptionDescription.native';
import SubscriptionPriceList from './SubscriptionPriceList.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import useSubscriptionState from './hooks/useContentState';
import SubscriptionSelectableItem from '../../general/SelectableItem/SelectableItem';
import useSubscriptionDispatch from './hooks/useContentDispatch';

const SubscriptionOptionsList = () => {
	const theme = useGetTheme();
	const optionsList = useGetSubscriptionOptionsList();
	const { setSelectedSubscription } = useSubscriptionDispatch();
	const { selectedSubscription } = useSubscriptionState();

	useEffect(() => {
		setSelectedSubscription(optionsList[0]);
	}, [])

	return (
		<SubscriptionOptionsContainer>
			{optionsList.map((item: SubscriptionOptionsListProps) => (
				<SubscriptionSelectableItem
					key={item.id}
					item={item}
					isSelected={selectedSubscription.id === item.id}
					onPress={(): void => setSelectedSubscription(item)}
				>
					<StyledText
						type={'Heading'}
						color={theme.lightGrey}
					>
						{item.title}
					</StyledText>
					<SubscriptionPriceList items={item.prices} />
					<SubscriptionOptionDescription items={item.description} />
				</SubscriptionSelectableItem>
			))}
		</SubscriptionOptionsContainer>
	)
};

export default SubscriptionOptionsList;