import React from 'react';
import useGetTheme from '@styles/hooks/useGetTheme';
import {
  NavigationHeaderContainer,
  NavigationHeaderText
} from './NavigationStyledComponents.native';
import { 
	NavigationHeaderLeftActionTypes,
	NavigationHeaderRightActionTypes,
	ScreenEnumType,
	DrawerScreenEnum, 
	UnauthorizedScreenEnum
} from '@utils/index';
import useGetLeftNavigationItem from './hooks/useGetLeftNavigationItem.native';
import useGetRightNavigationItem from './hooks/useGetRightNavigationItem.native';

interface NavigationHeaderProps {
	id: ScreenEnumType;
  title: string;
	isForm?: boolean;
  leftAction?: NavigationHeaderLeftActionTypes;
  rightAction?: NavigationHeaderRightActionTypes;
}

const NavigationHeader = ({
	id = UnauthorizedScreenEnum.Login,
	title, 
	isForm = false,
	leftAction = 'menu',
	rightAction = 'none'
}: NavigationHeaderProps) => {
  const theme = useGetTheme();
	const checkAuthScreen = (screen: ScreenEnumType) => screen in DrawerScreenEnum;
	const rightItem = useGetRightNavigationItem(rightAction);
	const leftItem = useGetLeftNavigationItem(leftAction, checkAuthScreen(id), isForm);

  return (
    <NavigationHeaderContainer>
      {leftItem}
      <NavigationHeaderText type='Heading' color={theme.lightGrey}>{title}</NavigationHeaderText>
			{rightItem}
    </NavigationHeaderContainer>
  );
};

export default NavigationHeader;