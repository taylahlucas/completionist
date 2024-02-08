import SelectableItem from '@components/general/SelectableItem/SelectableItem';
import StyledText from '@components/general/Text/StyledText.native';
import useSubscriptionState from '../SubscriptionContent/hooks/useContentState';
import useGetTheme from '@styles/hooks/useGetTheme';
import SubscriptionOptionDescription from '../SubscriptionContent/SubscriptionOptionDescription.native';
import PriceItem from '@components/general/PriceItem/PriceItem.native';
import { PaymentPriceItem, PaymentPricesContainer, PaymentPlanSubtitle } from './PaymentsContentStyledComponents.native';
import { useState } from 'react';
import { ScreenEnum } from '@utils/CustomEnums';
import Button from '@components/general/Button/Button.native';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import ScrollableList from '@components/general/Lists/ScrollableList.native';

const PaymentsContent = () => {
	const theme = useGetTheme();
	const navigation = useReactNavigation();
	const { selectedSubscription } = useSubscriptionState();
	const [selectedPrice, setSelectedPrice] = useState(selectedSubscription.prices[0]);

	return (
		<ScrollableList>
			<SelectableItem
				item={selectedSubscription}
				isSelected={true}
			>
				<StyledText type={'Heading'} color={theme.lightGrey}>
					{selectedSubscription.title}
				</StyledText>
				<SubscriptionOptionDescription items={selectedSubscription.description} />
			</SelectableItem>

			<PaymentPlanSubtitle align={'left'} color={theme.midGrey}>
				Select payment plan:
			</PaymentPlanSubtitle>

			<PaymentPricesContainer>
				{selectedSubscription.prices.map((item) => (
					<SelectableItem
						item={selectedSubscription} 
						isSelected={item.type === selectedPrice.type}
						onPress={(): void => setSelectedPrice(item)}
					>
						<PaymentPriceItem>
							<PriceItem item={item} />
						</PaymentPriceItem>
					</SelectableItem>
				))}
			</PaymentPricesContainer>

			<PaymentPlanSubtitle align={'left'} color={theme.midGrey}>
				Select payment type:
			</PaymentPlanSubtitle>

			{/* // TODO: Add paypal and apple pay */}

			<Button
				style={{ marginTop: 64, alignSelf: 'center' }}
                title={'Confirm Purchase'}
                onPress={(): void => navigation.navigate(ScreenEnum.GameSelection)}
                color={theme.primaryPurple}
            />
		</ScrollableList>
	);
};

export default PaymentsContent;