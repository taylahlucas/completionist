import React from 'react';
import useGetTheme from '@styles/hooks/useGetTheme';
import {
  NavigationHeaderContainer,
  NavigationHeaderText
} from './NavigationStyledComponents.native';
import { 
	NavigationHeaderLeftActionTypes, 
	NavigationHeaderRightActionTypes 
} from '@utils/CustomTypes';
import useGetLeftNavigationItem from './hooks/useGetLeftNavigationItem.native';
import useGetRightNavigationItem from './hooks/useGetRightNavigationItem.native';
import { ScreenEnum, AuthScreenEnum, UnauthorizedScreenEnum } from '@utils/CustomEnums';

interface NavigationHeaderProps {
	id: ScreenEnum;
  title: string;
  leftAction?: NavigationHeaderLeftActionTypes;
  rightAction?: NavigationHeaderRightActionTypes;
}

const NavigationHeader = ({
	id = UnauthorizedScreenEnum.Login,
	title, 
	leftAction = 'menu', 
	rightAction = 'none'
}: NavigationHeaderProps) => {
  const theme = useGetTheme();
	const checkAuthScreen = (screen: ScreenEnum) => screen in AuthScreenEnum;
  const leftItem = useGetLeftNavigationItem(leftAction, checkAuthScreen(id));
	const rightItem = useGetRightNavigationItem(rightAction);

  return (
    <NavigationHeaderContainer>
      {leftItem}
      <NavigationHeaderText type='Heading' color={theme.lightGrey}>{title}</NavigationHeaderText>
			{rightItem}
    </NavigationHeaderContainer>
  );
};

export default NavigationHeader;