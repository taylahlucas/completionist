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
import { ScreenEnum, SubscriptionTypeEnum } from '@utils/CustomEnums';
import useEditUserData from '@data/hooks/useEditUserData.native';
import KeyboardAvoidingScrollView from '@components/general/Lists/KeyboardAvoidingScrollView.native';

const SubscriptionContent = () => {
	const { t } = useTranslation();
	const theme = useGetTheme();
	const navigation = useReactNavigation();
	const { user } = useMainState();
	const { selectedSubscription } = useSubscriptionState();
	const { updateUserData } = useEditUserData();
	const isSigningUp = user && !user.signup.complete;

	const renderAwareView = () => (
		<Button
			title={t('common:subscriptions.purchaseSubscription')}
			type='footer'
			onPress={(): void => {
				if (isSigningUp && selectedSubscription.id === SubscriptionTypeEnum.FREE) {
					updateUserData({
						...user,
						signup: {
							...user.signup,
							steps: {
								...user.signup.steps,
								selectPlan: true
							}
						}
					}, true);
				}
				else if (selectedSubscription.id === SubscriptionTypeEnum.FREE) {
					// TODO: Add change success page
				}
				else {
					navigation.navigate(ScreenEnum.Payments);
				}
			}}
			disabled={!isSigningUp && selectedSubscription.id === user.subscription.tier}
			color={theme.primaryPurple}
		/>
	);

	// TODO: Change from purchase subscription to select subscription
	// Handle case for free
	// TODO: For signup, go to selectGame next, based on prev sub choice (free only)
	return (
		<KeyboardAvoidingScrollView
			awareView={renderAwareView()}
		>
			<StyledText>
				{t('common:subscriptions.subscriptionDesc')}
			</StyledText>
			<SubscriptionFeatureList />
			<SubscriptionPriceList />
		</KeyboardAvoidingScrollView>
	)
};

export default SubscriptionContent;

// <ScrollableList contentContainerStyle={styles.scrollContent}>
// </ScrollableList>