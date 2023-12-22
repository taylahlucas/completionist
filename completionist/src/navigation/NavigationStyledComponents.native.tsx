import { StyleSheet, Dimensions } from 'react-native';
import Icon from '@components/general/Icon/Icon.native';
import StyledText from '@components/general/Text/StyledText.native';
import { DEFAULT_BORDER_RADIUS } from '@styles/global';
import styled from 'styled-components/native';

export default StyleSheet.create({
  drawerContainer: {
    width: 230
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
  padding-bottom: 16px;
`;

interface NavigationHeaderTitleContainerProps {
  disabled: boolean;
}

export const NavigationHeaderTitleContainer = styled.Pressable<NavigationHeaderTitleContainerProps>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-right: 16px;
  opacity: ${(props): number => props.disabled ? 0.5 : 1}
`;

export const NavigationHeaderSubTitle = styled(StyledText)`
  margin-top: 4px;
`;

export const NavigationHeaderMenuButton = styled.Pressable`
  position: absolute;
  align-items: center;
  justfy-content: center;
  margin-left: 16px;
  z-index: 2;
`;

export const NavigationHeaderMenuIcon = styled(Icon)`
  position: absolute;
  z-index: 1;
  margin-top: 2px;
`;

export const NavigationHeaderMenuButtonBg = styled.View<NavigationHeaderProps>`
  width: 40px;
  height: 40px;
  border-radius: ${DEFAULT_BORDER_RADIUS}px;
  background-color: ${(props): string => props.color};
`;

export const NavigationHeaderText = styled(StyledText)`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const NavigationDrawerContainer = styled.View`
  margin-top: 84px;
  flex-direction: column;
`;

export const NavigationDrawerBodyContainer = styled.View`
  height: ${Dimensions.get('window').height - 64}px;
  align-content: center;
  margin-top: 16px;
  margin-left: 16px;
`;

export const NavigationDrawerFooter = styled.Pressable`
  position: absolute;
  bottom: 100px;
`;