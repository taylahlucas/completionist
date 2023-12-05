import Icon from '@components/general/Icon/Icon.native';
import StyledText from '@components/general/Text/StyledText.native';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export default StyleSheet.create({
  drawerContainer: {
    width: 200
  },
  contentContainer: {
    minHeight: '100%'
  }
});

interface NavigationHeaderProps {
  color: string;
}

export const NavigationHeaderContainer = styled.View`
  width: 100%;
  flex-direction: row;
  margin-top: 32px;
`;

export const NavigationHeaderMenuButton = styled.Pressable`
  position: absolute;
  align-items: center;
  margin-left: 16px;
  z-index: 2;
`;

export const NavigationHeaderMenuIcon = styled(Icon)`
  position: absolute;
  z-index: 1;
`;

export const NavigationHeaderMenuButtonBg = styled.View<NavigationHeaderProps>`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background-color: ${(props): string => props.color};
`;

export const NavigationHeaderText = styled(StyledText)`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const NavigationDrawerContainer = styled.View`
  margin-top: 60px;
  flex-direction: column;
`;

export const NavigationDrawerBodyContainer = styled.View`
  align-content: center;
  margin-top: 16px;
`;