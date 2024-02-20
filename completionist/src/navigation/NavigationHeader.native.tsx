import React from 'react';
import useGetTheme from '@styles/hooks/useGetTheme';
import {
  NavigationHeaderContainer,
  NavigationHeaderText
} from './NavigationStyledComponents.native';
import { NavigationHeaderLeftActionTypes, NavigationHeaderRightActionTypes } from '@utils/CustomTypes';
import useGetLeftNavigationItem from './hooks/useGetLeftNavigationItem.native';
import useGetRightNavigationItem from './hooks/useGetRightNavigationItem.native';

interface NavigationHeaderProps {
  title: string;
  leftAction?: NavigationHeaderLeftActionTypes;
  rightAction?: NavigationHeaderRightActionTypes;
}

const NavigationHeader = ({ title, leftAction = 'menu', rightAction = 'none' }: NavigationHeaderProps) => {
  const theme = useGetTheme();
  const leftItem = useGetLeftNavigationItem(leftAction);
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