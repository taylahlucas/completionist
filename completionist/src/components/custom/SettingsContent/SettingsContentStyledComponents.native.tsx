import { Dimensions, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import StyledText from '@components/general/Text/StyledText.native';
import { DEFAULT_BORDER_RADIUS } from '@styles/global';

interface SettingsContentMainItemProps {
  color: string;
}

export const style = StyleSheet.create({
  scrollView: {
    position: 'absolute',
    marginTop: 108,
    maxHeight: 180,
    borderWidth: 1,
    borderRadius: DEFAULT_BORDER_RADIUS,
    alignSelf: 'center',
    zIndex: -1
  },
  scrollContent: {
    width: Dimensions.get('window').width - 96,
  }
});

export const SettingsContentMainItem = styled.View<SettingsContentMainItemProps>`
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  height: 40px;
  padding: 8px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props): string => props.color};
`;

export const SettingsContentMainItemTitle = styled(StyledText)`
  width: ${Dimensions.get('window').width - 144}px;
  justify-content: center;
`;