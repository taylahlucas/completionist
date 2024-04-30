import { Dimensions, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import StyledText from '@components/general/Text/StyledText.native';
import { DEFAULT_BORDER_RADIUS, SMALL_WIDTH, STANDARD_WIDTH } from '@styles/global.native';
import ScrollableList from '@components/general/Lists/ScrollableList.native';

interface SettingsContentMainItemProps {
  color: string;
}

export const styles = StyleSheet.create({
  scrollContent: {
    width: STANDARD_WIDTH,
    paddingBottom: 16
  }
});

export const SettingsContentAvatarContainer = styled.Image`
	width: 115px;
	height: 115px;
	border-radius: 100px;
	align-self: center;
	margin-bottom: 16px;
`;

export const SettingsContentEmail = styled(StyledText)`
	margin: 16px 0px 16px 0px;
`;

export const SettingsContentDescription = styled(StyledText)`
  width: ${STANDARD_WIDTH}px;
  padding: 8px;
  padding-top: 16px;
`;

export const SettingsContentInputContainer = styled.View`
	align-self: center;
`;

export const SettingsContentDropdownContainer = styled.View`
  width: ${STANDARD_WIDTH}px;
  margin-top: 16px;
  border-width: 1px;
  border-radius: ${DEFAULT_BORDER_RADIUS}px;
  border-color: grey;
  align-self: center;
  zIndex: -1;
  overflow: scroll;
`;

export const SettingsContentMainItem = styled.View<SettingsContentMainItemProps>`
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  height: 40px;
  padding: 8px;
  margin-right: 24px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props): string => props.color};
`;

export const SettingsContentMainItemTitle = styled(StyledText)`
  width: ${SMALL_WIDTH}px;
  justify-content: center;
`;

export const SettingsContentSubDropdownContainer = styled.View`
  height: 120px;
  width: ${SMALL_WIDTH}px;
  margin-left: 50px;
  overflow: scroll;
`;

export const SettingsContentSubItemContainer = styled.View<SettingsContentMainItemProps>`
  padding: 12px;
  width: ${Dimensions.get('window').width - 108}px;
  margin-left: 24px;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: ${(props): string => props.color};
`;

export const SettingsContentScrollView = styled(ScrollableList)`
  background-color: #1d1f24;
  width: ${STANDARD_WIDTH}px;
  height: 120px;
`;

export const SettingsContentTitle = styled(StyledText)`
  margin-right: 16px;
`;