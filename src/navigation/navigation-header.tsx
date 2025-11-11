import React from 'react';
import useGetTheme from '@styles/hooks/use-get-theme';
import { NavigationHeaderContainer, NavigationHeaderText } from './';
import {
  NavigationHeaderLeftActionTypes,
  NavigationHeaderRightActionTypes,
  ScreenEnumType,
  DrawerScreenEnum,
  UnauthorizedScreenEnum,
} from '@utils/index';
import { useGetLeftNavigationItem, useGetRightNavigationItem } from './hooks';

interface NavigationHeaderProps {
  id: ScreenEnumType;
  title: string;
  isForm?: boolean;
  leftAction?: NavigationHeaderLeftActionTypes;
  rightAction?: NavigationHeaderRightActionTypes;
  rightCallback?: () => void;
}

export const NavigationHeader = ({
  id = UnauthorizedScreenEnum.Login,
  title,
  isForm = false,
  leftAction = 'menu',
  rightAction = 'none',
  rightCallback,
}: NavigationHeaderProps) => {
  const theme = useGetTheme();
  const checkAuthScreen = (screen: ScreenEnumType) =>
    screen in DrawerScreenEnum;
  const rightItem = useGetRightNavigationItem(rightAction, rightCallback);
  const leftItem = useGetLeftNavigationItem(
    leftAction,
    checkAuthScreen(id),
    isForm,
  );

  return (
    <NavigationHeaderContainer>
      {leftItem}
      <NavigationHeaderText type="Heading" color={theme.lightGrey}>
        {title}
      </NavigationHeaderText>
      {rightItem}
    </NavigationHeaderContainer>
  );
};
