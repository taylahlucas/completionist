import React from 'react';
import {
  navigationStyles,
  NavigationEmptyContainer,
} from '@navigation/navigation-styled-components';
import { IconTypeEnum, NavigationHeaderRightActionTypes } from '@utils/index';
import useGetTheme from '@styles/hooks/use-get-theme';
import { IconButton } from '@components/general';
import { useReactNavigation } from './';

export const useGetRightNavigationItem = (
  rightAction: NavigationHeaderRightActionTypes,
  rightCallback?: () => void,
): JSX.Element => {
  const theme = useGetTheme();
  const navigation = useReactNavigation();

  switch (rightAction) {
    case 'back':
      return (
        <IconButton
          style={{ ...navigationStyles.iconButton, top: 2 }}
          name="arrow-forward"
          type={IconTypeEnum.Ionicons}
          color={theme.lightGrey}
          onPress={(): void => navigation.goBack()}
        />
      );
    case 'settings':
      return (
        <IconButton
          style={navigationStyles.iconButton}
          name="settings-outline"
          type={IconTypeEnum.Ionicons}
          color={theme.lightGrey}
          size={34}
          onPress={(): void => rightCallback?.()}
        />
      );
    case 'filter':
      return (
        <IconButton
          style={navigationStyles.iconButton}
          name="filter-outline"
          type={IconTypeEnum.MaterialCommunityIcons}
          color={theme.lightGrey}
          size={40}
          onPress={(): void => rightCallback?.()}
        />
      );
    case 'logout':
      return (
        <IconButton
          style={navigationStyles.iconButton}
          name="logout"
          color={theme.lightGrey}
          size={30}
          onPress={(): void => rightCallback?.()}
        />
      );
    default:
      return <NavigationEmptyContainer />;
  }
};
