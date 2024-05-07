import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@components/general/Button/Button.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import StyledText from '@components/general/Text/StyledText.native';
import useMainState from '@redux/hooks/useMainState';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import { ScreenEnum, SubscriptionTypeEnum } from '@utils/CustomEnums';
import useEditUserData from '@data/hooks/useEditUserData.native';
import KeyboardAvoidingScrollView from '@components/general/Lists/KeyboardAvoidingScrollView.native';
import useLoginState from '../LoginForm/hooks/useLoginState';
import useGetSubscriptionOptionsList from './hooks/useGetSubscriptionOptionsList';
import {
	SubscriptionFeatureListContainer,
	SubscriptionFeatureListInnerContainer,
	SubscriptionFeatureListItemContainer,
	SubscriptionFeatureListTitle
} from './SubscriptionContentStyledComponents.native';
import useGetSubscriptionFeatureList from './hooks/useGetSubscriptionFeatureList';
import Seperator from '@components/general/Seperator.native';
import Icon from '@components/general/Icon/Icon.native';
import SubscriptionOptionsList from './SubscriptionOptionsList.native';
import useSubscriptionState from './hooks/useContentState';

const initialState = {
	id: SubscriptionTypeEnum.FREE,
	prices: [],
	title: '',
	description: []
};

const SubscriptionContent = () => {
	const { t } = useTranslation();
	const theme = useGetTheme();
	const navigation = useReactNavigation();
	const { selectedSubscription } = useSubscriptionState();
	const { user } = useMainState();
	const { isSigningUp } = useLoginState();
	const { updateUserData } = useEditUserData();
	const featureList = useGetSubscriptionFeatureList();
	const options = useGetSubscriptionOptionsList();
	const isFree: boolean = selectedSubscription.id === SubscriptionTypeEnum.FREE;

	const renderAwareView = () => (
		<Button
			title={isFree ? 'Continue' : t('common:subscriptions.purchaseSubscription')}
			type='footer'
			onPress={(): void => {
				// TODO: Need to figure out how to check if in login flow?
				if (isFree) {
					updateUserData({
						...user,
						signup: {
							...user.signup,
							selectPlan: true
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
			color={theme.primaryPurple} />
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
			<SubscriptionFeatureListContainer>
				{featureList.map(item => (
					<SubscriptionFeatureListInnerContainer key={item.id}>
						<SubscriptionFeatureListItemContainer>
							<Icon
								style={{ alignSelf: 'center' }}
								name={item.icon}
								type={item.iconType}
								size={30}
								color={item.color}
							/>
							<SubscriptionFeatureListTitle align='left'>{item.title}</SubscriptionFeatureListTitle>
						</SubscriptionFeatureListItemContainer>
						<Seperator />
					</SubscriptionFeatureListInnerContainer>
				))}
			</SubscriptionFeatureListContainer>
			<SubscriptionOptionsList />
		</KeyboardAvoidingScrollView>
	);
};

export default SubscriptionContent;