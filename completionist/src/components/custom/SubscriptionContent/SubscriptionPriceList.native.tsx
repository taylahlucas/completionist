import { PriceProps } from '@utils/CustomInterfaces';
import { SubscriptionPriceContainer, SubscriptionPriceItemContainer } from './SubscriptionContentStyledComponents.native';
import StyledText from '@components/general/Text/StyledText.native';
import useGetTheme from '@styles/hooks/useGetTheme';

interface SubscriptionPriceListProps {
    items: PriceProps[];
}

const SubscriptionPriceList = ({ items }: SubscriptionPriceListProps) => {
    const theme = useGetTheme();
    
    // TODO: Add currency converter
    return (
        <SubscriptionPriceContainer>
            {items.map(item => (
                <SubscriptionPriceItemContainer>
                    <StyledText type={'Heading'} color={theme.lightGrey}>{`£${item.value.toString()}`}</StyledText>
                    <StyledText type={'ListItemSubTitleItalic'}>{item.title}</StyledText>
                </SubscriptionPriceItemContainer>
            ))}
        </SubscriptionPriceContainer>
    )
};

export default SubscriptionPriceList;