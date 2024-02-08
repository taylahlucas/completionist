import ScrollableList from '@components/general/Lists/ScrollableList.native';
import SubscriptionFeatureList from './SubscriptionFeatureList.native';
import Button from '@components/general/Button/Button.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import SubscriptionPriceList from './SubscriptionOptionsList.native';
import StyledText from '@components/general/Text/StyledText.native';
import { styles } from './SubscriptionContentStyledComponents.native';
import { useEffect } from 'react';
import useSubscriptionDispatch from './hooks/useContentDispatch';
import useMainState from '@redux/hooks/useMainState';
import useSubscriptionState from './hooks/useContentState';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import { ScreenEnum } from '@utils/CustomEnums';

const SubscriptionContent = () => {
    const theme = useGetTheme();
	const navigation = useReactNavigation();
	const { user } = useMainState();
	const { selectedSubscription } = useSubscriptionState();
	
    // TODO: Add translations
    // TODO: Add more Bold title
    return (
        <ScrollableList contentContainerStyle={styles.scrollContent}>
            <StyledText>
                {"With a Silver or Gold subscription,\nyou will gain access to Premium Features such as:"}
            </StyledText>
            <SubscriptionFeatureList />
            <SubscriptionPriceList />
            <Button
                title={'Purchase Subscription'}
                onPress={(): void => navigation.navigate(ScreenEnum.Payments)}
				disabled={selectedSubscription.id === user.subscription.tier}
                color={theme.primaryPurple}
            />
        </ScrollableList>
    )
};

export default SubscriptionContent;