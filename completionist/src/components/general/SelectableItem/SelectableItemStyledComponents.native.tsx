import styled from 'styled-components/native';
import { DEFAULT_BORDER_RADIUS, LARGE_PADDING } from '@styles/global.native';
import Icon from '../Icon/Icon.native';

interface SelectedItemProps {
    color: string;
}

export const SelectedItemContainer = styled.Pressable<SelectedItemProps>`
    border-width: 6px;
    border-color: ${props => props.color};
    border-radius: ${DEFAULT_BORDER_RADIUS}px;
    margin-bottom: 16px;
`;

export const SelectedItemIconContainer = styled.View<SelectedItemProps>`
	width: ${LARGE_PADDING}px;
	height: ${LARGE_PADDING}px;
	position: absolute;
	background-color: ${props => props.color};
	border-radius: 25px;
	right: -16px;
	top: -16px;
`;

export const SubscriptionOptionsItemContainerIcon = styled(Icon)`
    align-self: center;
	top: 4px;
`;