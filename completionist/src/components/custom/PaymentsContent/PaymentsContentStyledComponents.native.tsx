import styled from 'styled-components/native';
import { LARGE_WIDTH, SMALL_PADDING, STANDARD_WIDTH, MID_PADDING } from '@styles/global.native';
import StyledText from '@components/general/Text/StyledText.native';

export const PaymentPricesContainer = styled.View`
	width: ${LARGE_WIDTH}px;
	flex-direction: row;
	justify-content: space-around;
	margin-top: ${MID_PADDING}px;
	padding: ${MID_PADDING}px;
`;

export const PaymentPriceItem = styled.View`
	padding: ${SMALL_PADDING}px;
	width: 120px;
	height: 100px;
`;

export const PaymentPlanSubtitle = styled(StyledText)`
	width: ${STANDARD_WIDTH}px;
`;