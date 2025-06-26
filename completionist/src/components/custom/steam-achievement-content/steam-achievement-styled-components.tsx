import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import {
  LARGE_WIDTH,
  DEFAULT_BORDER_RADIUS,
  SMALL_PADDING,
  MID_PADDING,
} from '@styles/global';

export const steamAchievementStyles = StyleSheet.create({
  scrollStyle: {
    paddingRight: MID_PADDING,
    paddingLeft: MID_PADDING,
  },
  contentScrollStyle: {
    alignItems: 'center',
    paddingBottom: 64,
  },
});

interface SteamAchievementProps {
  color: string;
}

export const SteamAchievementItemContainer = styled.View<SteamAchievementProps>`
  width: ${LARGE_WIDTH}px;
  border-width: 2px;
  border-color: ${props => props.color};
  border-radius: ${DEFAULT_BORDER_RADIUS}px;
  margin-bottom: ${MID_PADDING}px;
  padding: ${SMALL_PADDING}px;
`;

export const SteamAchievementIconContainer = styled.View`
  flex-direction: row;
`;

export const SteamAchievementContentContainer = styled.View`
  flex-direction: column;
  padding-left: ${MID_PADDING}px;
  padding-right: ${MID_PADDING}px;
  max-width: ${LARGE_WIDTH - 52}px;
`;
