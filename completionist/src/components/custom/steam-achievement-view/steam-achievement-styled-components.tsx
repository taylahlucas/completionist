import styled from 'styled-components/native';
import {
  STANDARD_WIDTH,
  SMALL_PADDING,
  MID_PADDING,
  MID_WIDTH,
  LARGE_PADDING,
} from '@styles/global.native';
import StyledText from '@components/general/Text/StyledText.native';

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

export const SteamAchievementIconContainer = styled.View`
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
