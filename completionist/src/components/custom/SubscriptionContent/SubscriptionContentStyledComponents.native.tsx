import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import StyledText from '@components/general/Text/StyledText.native';
import { STANDARD_WIDTH, LARGE_PADDING, MID_PADDING, SMALL_PADDING } from '@styles/global.native';

export const styles = StyleSheet.create({
	scrollContent: {
		paddingBottom: 160,
		alignItems: 'center'
	}
})

export const SubscriptionFeatureListContainer = styled.View`
    width: ${STANDARD_WIDTH}px;
    padding-top: ${MID_PADDING}px;
    padding-bottom: ${MID_PADDING}px;
`;

export const SubscriptionFeatureListItemContainer = styled.View`
    flex-direction: row;
`;

export const SubscriptionFeatureListInnerContainer = styled.View`
    flex-direction: column;
`;

export const SubscriptionFeatureListTitle = styled(StyledText)`
    padding-left: ${MID_PADDING}px;
    padding-right: ${LARGE_PADDING}px;
    align-self: center;
`;

export const SubscriptionOptionsContainer = styled.View`
    margin-bottom: ${MID_PADDING}px;
		padding-left: ${SMALL_PADDING}px;
		padding-right: ${SMALL_PADDING}px;
`;

export const SubscriptionOptionDescriptionContainer = styled.View`
    padding-right: ${MID_PADDING}px;
    padding-left: ${MID_PADDING}px;
    padding-bottom: ${MID_PADDING}px;
`;

export const SubscriptionOptionTitle = styled(StyledText)`
    padding: 4px;
`;

export const SubscriptionPriceContainer = styled.View`
    flex-direction: row;
    justify-content: space-evenly;
    padding-bottom: ${MID_PADDING}px;
`;