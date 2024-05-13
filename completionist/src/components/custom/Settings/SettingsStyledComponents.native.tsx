import { StyleSheet, Animated } from 'react-native';
import styled from 'styled-components/native';
import StyledText from '@components/general/Text/StyledText.native';
import { DEFAULT_BORDER_RADIUS, SMALL_WIDTH, STANDARD_WIDTH, SMALL_PADDING, MID_PADDING, windowWidth } from '@styles/global.native';
import ScrollableList from '@components/general/Lists/ScrollableList.native';

interface SettingsMainItemProps {
  color: string;
}

export const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 16
  }
});

export const SettingsAvatarContainer = styled.Image`
	width: 115px;
	height: 115px;
	border-radius: 100px;
	align-self: center;
	margin-bottom: ${MID_PADDING}px;
`;

export const SettingsEmail = styled(StyledText)`
	margin: ${MID_PADDING}px 0px 16px 0px;
`;

export const SettingsDescription = styled(StyledText)`
  width: ${STANDARD_WIDTH}px;
  padding-top: ${MID_PADDING}px;
`;

export const SettingsCollectionList = styled(Animated.View)`
  width: ${STANDARD_WIDTH}px;
  margin-top: ${MID_PADDING}px;
  border-width: 1px;
  border-radius: ${DEFAULT_BORDER_RADIUS}px;
  border-color: grey;
  align-self: center;
  zIndex: -1;
  overflow: scroll;
`;

export const SettingsMainItem = styled.View<SettingsMainItemProps>`
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  height: 40px;
  padding: ${SMALL_PADDING}px;
  margin-right: ${SMALL_PADDING}px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props): string => props.color};
`;

export const SettingsMainItemTitle = styled(StyledText)`
  width: ${SMALL_WIDTH}px;
  justify-content: center;
`;

export const SettingsSubDropdownContainer = styled.View`
  height: 120px;
  width: ${SMALL_WIDTH}px;
  margin-left: 50px;
  overflow: scroll;
`;

export const SettingsSubItemContainer = styled.View<SettingsMainItemProps>`
  padding: 12px;
  width: ${windowWidth - 108}px;
  margin-left: 24px;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: ${(props): string => props.color};
`;

export const SettingsScrollView = styled(ScrollableList)`
  background-color: #1d1f24;
  height: 120px;
`;

export const SettingsTitle = styled(StyledText)`
  margin-right: 16px;
`;

export const AccountDetailsFieldTitle = styled(StyledText)`
	width: 100%;
	margin-left: 16px;
	margin-bottom: -8px;
`;