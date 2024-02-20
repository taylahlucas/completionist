import { StyleSheet, Dimensions } from 'react-native';
import Icon from '@components/general/Icon/Icon.native';
import StyledText from '@components/general/Text/StyledText.native';
import { DEFAULT_BORDER_RADIUS } from '@styles/global.native';
import styled from 'styled-components/native';

const drawerWidth = 250;
export const styles = StyleSheet.create({
	drawerContainer: {
		width: drawerWidth
	},
	contentContainer: {
		minHeight: '100%'
	},
	iconButton: {
		marginRight: 16,
		marginLeft: 16,
		zIndex: 2
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
  justify-content: space-between;
  align-items: center;
`;

interface NavigationHeaderTitleContainerProps {
	disabled: boolean;
}

export const NavigationHeaderTitleContainer = styled.Pressable<NavigationHeaderTitleContainerProps>`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	opacity: ${(props): number => props.disabled ? 0.5 : 1};
`;

export const NavigationDrawerFooterItem = styled.Pressable`
	flex-direction: row;
	align-items: center;
	margin-top: 4px;
`;

export const NavigationDrawerFooterIcon = styled(Icon)`
	padding-right: 8px;
`;

export const NavigationDrawerTitle = styled(StyledText)`
	padding-top: 8px;
	padding-bottom: 8px;
`;

export const NavigationDrawerFooterTitle = styled(StyledText)`
	padding-top: 8px;
	padding-bottom: 8px;
	width: ${drawerWidth - 70}px;
`;

export const NavigationHeaderSubTitle = styled(StyledText)`
  margin-top: 4px;
	margin-right: 8px;
	max-width: 80px;
`;

export const NavigationHeaderMenuButton = styled.Pressable`
  width: 50px;
  height: 50px;
  align-items: center;
  justfy-content: center;
  margin-right: 16px;
  margin-left: 16px;
  z-index: 2;
`;

export const NavigationEmptyContainer = styled.View`
  width: 35px;
  height: 35px;
  margin-right: 16px;
  margin-left: 16px;
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
  max-width: 200px;
  justify-content: center;
  align-items: center;
`;

export const NavigationDrawerContainer = styled.View`
  margin-top: 56px;
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
	bottom: 96px;
`;