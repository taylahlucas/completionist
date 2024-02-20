import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SelectableItem from '@components/general/SelectableItem/SelectableItem';
import StyledText from '@components/general/Text/StyledText.native';
import useSubscriptionState from '../SubscriptionContent/hooks/useContentState';
import useGetTheme from '@styles/hooks/useGetTheme';
import SubscriptionOptionDescription from '../SubscriptionContent/SubscriptionOptionDescription.native';
import PriceItem from '@components/general/PriceItem/PriceItem.native';
import { PaymentPriceItem, PaymentPricesContainer, PaymentPlanSubtitle } from './PaymentsContentStyledComponents.native';
import { ScreenEnum } from '@utils/CustomEnums';
import Button from '@components/general/Button/Button.native';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import useEndpoints from '@data/api/hooks/useEndpoints.native';
import useMainState from '@redux/hooks/useMainState';
import useEditUserData from '@data/hooks/useEditUserData.native';

const PaymentsContent = () => {
	const { t } = useTranslation();
	const theme = useGetTheme();
	const navigation = useReactNavigation();
	const { selectedSubscription } = useSubscriptionState();
	const [selectedPrice, setSelectedPrice] = useState(selectedSubscription.prices[0]);
	const { user } = useMainState();
	const { saveUserAndCache } = useEditUserData();

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

			<PaymentPlanSubtitle align={'left'} color={theme.midGrey}>
				{t('common:payments:selectType')}
			</PaymentPlanSubtitle>

			{/* // TODO: Add paypal and apple pay */}

			<Button
				style={{ marginTop: 64, alignSelf: 'center' }}
				title={t('common:payments.confirm')}
				onPress={(): void => {
					const updatedUser = {
						...user,
						subscription: {
							...user.subscription,
							tier: selectedSubscription.id
						}
					};
					saveUserAndCache(updatedUser);
					navigation.navigate(ScreenEnum.GameSelection);
				}}
				color={theme.primaryPurple}
			/>
		</ScrollableList>
	);
};

export default PaymentsContent;