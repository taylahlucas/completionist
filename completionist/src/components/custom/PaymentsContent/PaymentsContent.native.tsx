import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SelectableItem from '@components/general/SelectableItem/SelectableItem.native';
import StyledText from '@components/general/Text/StyledText.native';
import useSubscriptionState from '../SubscriptionContent/hooks/useContentState';
import useGetTheme from '@styles/hooks/useGetTheme';
import SubscriptionOptionDescription from '../SubscriptionContent/SubscriptionOptionDescription.native';
import PriceItem from '@components/general/PriceItem/PriceItem.native';
import { PaymentPriceItem, PaymentPricesContainer, PaymentPlanSubtitle } from './PaymentsContentStyledComponents.native';
import Button from '@components/general/Button/Button.native';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import useMainState from '@redux/hooks/useMainState';
import Spacing from '@components/general/Spacing.native';

const PaymentsContent = () => {
	const { t } = useTranslation();
	const theme = useGetTheme();
	const { selectedSubscription } = useSubscriptionState();
	const [selectedPrice, setSelectedPrice] = useState(selectedSubscription.prices[0]);
	const { user } = useMainState();
	// const { saveUserAndCache } = useEditUserData();

	return (
		<>
			<ScrollableList style={{ paddingTop: 16 }}>
				<SelectableItem
					item={selectedSubscription}
					isSelected
				>
					<StyledText type='Heading' color={theme.lightGrey}>
						{selectedSubscription.title}
					</StyledText>
					<SubscriptionOptionDescription items={selectedSubscription.description} />
				</SelectableItem>

				<PaymentPlanSubtitle align='left' color={theme.midGrey}>
					{t('common:payments:selectPlan')}
				</PaymentPlanSubtitle>

				<PaymentPricesContainer>
					{selectedSubscription.prices.map((item, index) => (
						<SelectableItem
							key={index}
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

				<PaymentPlanSubtitle align='left' color={theme.midGrey}>
					{t('common:payments:selectType')}
				</PaymentPlanSubtitle>

				{/* // TODO: Add paypal and apple pay */}
				<Spacing />
			</ScrollableList>
			<Button
				title={t('common:payments.confirm')}
				type='footer'
				onPress={(): void => {
					const updatedUser = {
						...user,
						subscription: {
							...user.subscription,
							tier: selectedSubscription.id
						}
					};
					console.log("HERE")
					// saveUser(updatedUser);
					// navigation.navigate(AuthScreenEnum.GameSelection);
				}}
				color={theme.primaryPurple}
			/>
		</>
	);
};

export default PaymentsContent;