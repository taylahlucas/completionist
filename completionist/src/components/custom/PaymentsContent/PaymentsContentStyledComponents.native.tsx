import styled from 'styled-components/native';
import { LARGE_WIDTH, STANDARD_WIDTH } from '@styles/global.native';
import StyledText from '@components/general/Text/StyledText.native';

export const PaymentPricesContainer = styled.View`
	width: ${LARGE_WIDTH}px;
	flex-direction: row;
	justify-content: space-around;
	margin-top: 16px;
	padding: 16px;
`;

export const PaymentPriceItem = styled.View`
	padding: 8px;
	width: 120px;
	height: 100px;
`;

export const PaymentPlanSubtitle = styled(StyledText)`
	width: ${STANDARD_WIDTH}px;
`;