import useGetSubscriptionOptionsList from './hooks/useGetSubscriptionOptionsList';
import StyledText from '@components/general/Text/StyledText.native';
import { SubscriptionOptionsContainer, SubscriptionOptionsItemContainer } from './SubscriptionContentStyledComponents.native';
import SubscriptionOptionDescription from './SubscriptionOptionDescription.native';
import SubscriptionPriceList from './SubscriptionPriceList.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import useSubscriptionState from './hooks/useContentState';
import useSubscriptionDispatch from './hooks/useContentDispatch';

const SubscriptionOptionsList = () => {
    const theme = useGetTheme();
    const optionsList = useGetSubscriptionOptionsList();
    const { setSelectedSubscription } = useSubscriptionDispatch();
    const { selectedSubscription } = useSubscriptionState();

    return (
        <SubscriptionOptionsContainer>
            {optionsList.map(item => (
                <SubscriptionOptionsItemContainer
                    key={item.id}
                    borderColor={selectedSubscription === item.id ? theme.primaryPurple : theme.lightGrey}
                    onPress={(): void => setSelectedSubscription(item.id)}
                >
                    <StyledText
                        type={'Heading'}
                        color={theme.lightGrey}
                    >
                        {item.title}
                    </StyledText>

                    <SubscriptionPriceList items={item.prices} />
                    <SubscriptionOptionDescription items={item.description} />
                </SubscriptionOptionsItemContainer>
            ))}
        </SubscriptionOptionsContainer>
    )
};

export default SubscriptionOptionsList;