import SelectableItem from '@components/general/SelectableItem/SelectableItem';
import StyledText from '@components/general/Text/StyledText.native';
import useSubscriptionState from '../SubscriptionContent/hooks/useContentState';
import useGetTheme from '@styles/hooks/useGetTheme';
import SubscriptionOptionDescription from '../SubscriptionContent/SubscriptionOptionDescription.native';
import PriceItem from '@components/general/PriceItem/PriceItem.native';
import { PaymentPriceItem, PaymentPricesContainer, PaymentPlanSubtitle } from './PaymentsContentStyledComponents.native';
import { useState } from 'react';

const PaymentsContent = () => {
	const theme = useGetTheme();
	const { selectedSubscription } = useSubscriptionState();
	const [selectedPrice, setSelectedPrice] = useState(selectedSubscription.prices[0]);

	return (
		<>
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
						isSelected={item === selectedPrice}
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
		</>
	);
};

export default PaymentsContent;