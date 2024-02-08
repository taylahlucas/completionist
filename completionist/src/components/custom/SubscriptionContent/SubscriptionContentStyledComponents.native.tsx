import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import StyledText from '@components/general/Text/StyledText.native';
import { DEFAULT_BORDER_RADIUS, STANDARD_WIDTH } from '@styles/global.native';

interface PriceProps {
    borderColor: string;
}

export const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: 64,
        alignItems: 'center'
    }
})

export const SubscriptionFeatureListContainer = styled.View`
    width: ${STANDARD_WIDTH}px;
    padding-top: 16px;
    padding-bottom: 16px;
`;

export const SubscriptionFeatureListItemContainer = styled.View`
    flex-direction: row;
`;

export const SubscriptionFeatureListInnerContainer = styled.View`
    flex-direction: column;
`;

export const SubscriptionFeatureListTitle = styled(StyledText)`
    padding-left: 16px;
    padding-right: 32px;
    align-self: center;
`;

export const SubscriptionOptionsContainer = styled.View`
    margin-bottom: 16px;
`;

export const SubscriptionOptionsItemContainer = styled.Pressable<PriceProps>`
    border-width: 6px;
    border-color: ${props => props.borderColor};
    border-radius: ${DEFAULT_BORDER_RADIUS}px;
    margin-bottom: 8px;
`;

export const SubscriptionOptionDescriptionContainer = styled.View`
    padding-right: 16px;
    padding-left: 16px;
    padding-bottom: 16px;
`;

export const SubscriptionOptionTitle = styled(StyledText)`
    padding: 4px;
`;

export const SubscriptionPriceContainer = styled.View`
    flex-direction: row;
    justify-content: space-evenly;
    padding-bottom: 16px;
`;

export const SubscriptionPriceItemContainer = styled.View`
    flex-direction: column;
`;