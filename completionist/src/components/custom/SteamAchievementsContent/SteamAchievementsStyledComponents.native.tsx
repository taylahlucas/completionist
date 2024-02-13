import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { LARGE_WIDTH, DEFAULT_BORDER_RADIUS } from '@styles/global.native';

export const styles = StyleSheet.create({
	scrollStyle: {
		paddingRight: 16,
		paddingLeft: 16
	},
	contentScrollStyle: {
		alignItems: 'center',
		paddingBottom: 64
	}
});

interface SteamAchievementProps {
	color: string;
}

export const SteamAchievementItemContainer = styled.View<SteamAchievementProps>`
	width: ${LARGE_WIDTH}px;
	border-width: 2px;
	border-color: ${props => props.color};
	border-radius: ${DEFAULT_BORDER_RADIUS}px;
	margin-bottom: 16px;
	padding: 8px;
`;

export const SteamAchievementIconContainer = styled.View`
	flex-direction: row;
`;

export const SteamAchievementContentContainer = styled.View`
	flex-direction: column;
	padding-left: 16px;
	padding-right: 16px;
	max-width: ${LARGE_WIDTH - 52}px;
`;