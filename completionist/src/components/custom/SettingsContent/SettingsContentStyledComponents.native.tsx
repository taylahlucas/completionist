import { Dimensions, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import StyledText from '@components/general/Text/StyledText.native';
import { DEFAULT_BORDER_RADIUS } from '@styles/global';
import ScrollableList from '@components/general/Lists/ScrollableList.native';

interface SettingsContentMainItemProps {
  color: string;
}

export const style = StyleSheet.create({
  scrollView: {
    width: Dimensions.get('window').width - 64,
    height: 160
  },
  scrollContent: {
    width: Dimensions.get('window').width - 64
  }
});

export const SettingsContentDropdownContainer = styled.View`
  width: ${Dimensions.get('window').width - 64}px;
  position: absolute;
  margin-top: 108px;
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
  width: ${Dimensions.get('window').width - 144}px;
  justify-content: center;
`;

export const SettingsContentSubDropdownContainer = styled.View`
  height: 120px;
  width: ${Dimensions.get('window').width - 144}px;
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
  width: ${Dimensions.get('window').width - 64}px;
  height: 120px;
`;