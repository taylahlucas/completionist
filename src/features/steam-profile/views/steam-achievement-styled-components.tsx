import styled from 'styled-components/native';
import {
  STANDARD_WIDTH,
  SMALL_PADDING,
  MID_PADDING,
  MID_WIDTH,
  LARGE_WIDTH,
  DEFAULT_BORDER_RADIUS,
} from '@styles/global';
import { StyledText } from '@components/general';
import { StyleSheet } from 'react-native';

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

export const SteamAchievementDropdownShadow = styled.View`
  height: 1px;
  width: ${STANDARD_WIDTH}px;
  shadow-color: black;
  shadowopacity: 0.4;
  shadow-radius: 4px;
  shadow-offset-width: -3px;
  shadow-offset-height: 3px;
  elevation: 4;
`;

export const SteamAchievementViewContainer = styled.View`
  flex-direction: row;
  border-radius: 10px;
  border-width: 2px;
  margin-vertical: ${SMALL_PADDING}px;
  padding-left: ${MID_PADDING}px;
  align-items: center;
`;

export const SteamAchievementIcon = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 2px;
`;

export const SteamAchievementIconContainerCol = styled.View`
  flex-direction: column;
`;

interface SteamItemTitleProps {
  hasBottomPadding: boolean;
}

export const SteamItemTitle = styled(StyledText)<SteamItemTitleProps>`
  width: ${MID_WIDTH}px;
  padding-top: ${SMALL_PADDING}px;
  padding-horizontal: ${MID_PADDING}px;
  padding-bottom: ${props => (props.hasBottomPadding ? 2 : 0)}px;
`;

export const SteamItemDescription = styled(StyledText)`
  width: ${MID_WIDTH}px;
  padding-horizontal: ${MID_PADDING}px;
  padding-bottom: ${SMALL_PADDING}px;
`;
