import React from 'react';
import {
  navigationStyles,
  NavigationEmptyContainer,
} from '@navigation/navigation-styled-components';
import {
  IconTypeEnum,
  AuthScreenEnum,
  NavigationHeaderRightActionTypes,
} from '@utils/index';
import useGetTheme from '@styles/hooks/use-get-theme';
import { IconButton } from '@components/general';
import { useGetLoginMethods } from '@components/custom/login-form/hooks';
import { useReactNavigation } from './';

export const useGetRightNavigationItem = (
  rightAction: NavigationHeaderRightActionTypes,
): JSX.Element => {
  const theme = useGetTheme();
  const navigation = useReactNavigation();
  const { signOut } = useGetLoginMethods();

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
          onPress={(): void =>
            navigation.navigate(AuthScreenEnum.GlobalSettings)
          }
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
          onPress={() => {
            console.log('SHOW FILTER');
          }}
        />
      );
    case 'logout':
      return (
        <IconButton
          style={navigationStyles.iconButton}
          name="logout"
          color={theme.lightGrey}
          size={30}
          onPress={signOut}
        />
      );
    default:
      return <NavigationEmptyContainer />;
  }
};
