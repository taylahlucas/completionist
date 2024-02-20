import React from 'react';
import { useTranslation } from 'react-i18next';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import SubscriptionFeatureList from './SubscriptionFeatureList.native';
import Button from '@components/general/Button/Button.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import SubscriptionPriceList from './SubscriptionOptionsList.native';
import StyledText from '@components/general/Text/StyledText.native';
import { styles } from './SubscriptionContentStyledComponents.native';
import useMainState from '@redux/hooks/useMainState';
import useSubscriptionState from './hooks/useContentState';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import { ScreenEnum } from '@utils/CustomEnums';

const SubscriptionContent = () => {
	const { t } = useTranslation();
	const theme = useGetTheme();
	const navigation = useReactNavigation();
	const { user } = useMainState();
	const { selectedSubscription } = useSubscriptionState();

	// TODO: Add more Bold title
	return (
		<ScrollableList contentContainerStyle={styles.scrollContent}>
			<StyledText>
				{t('common:subscriptions.subscriptionDesc')}
			</StyledText>
			<SubscriptionFeatureList />
			<SubscriptionPriceList />
			<Button
				title={t('common:subscriptions.purchaseSubscription')}
				onPress={(): void => navigation.navigate(ScreenEnum.Payments)}
				disabled={selectedSubscription.id === user.subscription.tier}
				color={theme.primaryPurple}
			/>
		</ScrollableList>
	)
};

export default SubscriptionContent;