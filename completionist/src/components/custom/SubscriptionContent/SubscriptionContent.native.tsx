import { useTranslation } from 'react-i18next';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import SubscriptionFeatureList from './SubscriptionFeatureList.native';
import Button from '@components/general/Button/Button.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import SubscriptionPriceList from './SubscriptionOptionsList.native';
import StyledText from '@components/general/Text/StyledText.native';


const SubscriptionContent = () => {
    const { t } = useTranslation();
    const theme = useGetTheme();

    // TODO: Move to scroll styles
    // TODO: Add translations
    // TODO: Add more Bold title
    return (
        <ScrollableList contentContainerStyle={{ paddingBottom: 64, alignItems: 'center' }}>
            <StyledText>
                {"With a Silver or Gold subscription,\nyou will gain access to Premium Features such as:"}
            </StyledText>
            <SubscriptionFeatureList />
            <SubscriptionPriceList />
            <Button
                title={'Purchase Subscription'}
                onPress={(): void => {}}
                color={theme.primaryPurple}
            />
        </ScrollableList>
    )
};

export default SubscriptionContent;