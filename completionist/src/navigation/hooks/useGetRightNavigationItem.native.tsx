import React from 'react';
import { NavigationHeaderRightActionTypes } from '@utils/CustomTypes';
import {
  styles,
  NavigationEmptyContainer,
} from '@navigation/NavigationStyledComponents.native';
import { IconTypeEnum, AuthScreenEnum } from '@utils/CustomEnums';
import useGetTheme from '@styles/hooks/useGetTheme';
import IconButton from '@components/general/Icon/IconButton.native';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import useGetLoginMethods from '@components/custom/LoginForm/hooks/useGetLoginMethods';

const useGetRightNavigationItem = (
  rightAction: NavigationHeaderRightActionTypes,
): JSX.Element => {
  const theme = useGetTheme();
  const navigation = useReactNavigation();
  const { signOut } = useGetLoginMethods();

  switch (rightAction) {
    case 'back':
      return (
        <IconButton
          style={{ ...styles.iconButton, top: 2 }}
          name="arrow-forward"
          type={IconTypeEnum.Ionicons}
          color={theme.lightGrey}
          onPress={(): void => navigation.goBack()}
        />
      );
    case 'settings':
      return (
        <IconButton
          style={styles.iconButton}
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
          style={styles.iconButton}
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
          style={styles.iconButton}
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

export default useGetRightNavigationItem;
