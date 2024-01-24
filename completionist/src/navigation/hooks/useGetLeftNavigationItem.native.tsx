import React from 'react';
import { NavigationHeaderLeftActionTypes } from '@utils/CustomTypes';
import {
  styles,
  NavigationHeaderMenuButton,
  NavigationHeaderMenuButtonBg,
  NavigationHeaderMenuIcon,
  NavigationEmptyContainer
} from '@navigation/NavigationStyledComponents.native';
import { IconTypeEnum } from '@utils/CustomEnums';
import useReactNavigation, { DrawerActions } from './useReactNavigation.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import IconButton from '@components/general/Icon/IconButton.native';

const useGetLeftNavigationItem = (leftAction: NavigationHeaderLeftActionTypes): JSX.Element => {
  const theme = useGetTheme();
  const navigation = useReactNavigation();

  switch (leftAction) {
    case 'back':
      return (
        <IconButton
          style={styles.iconButton}
          name={'arrow-back'}
          type={IconTypeEnum.Ionicons}
          color={theme.lightGrey}
          onPress={(): void => navigation.goBack()}
        />
      );
    case 'menu':
      return (
        <NavigationHeaderMenuButton
          onPress={(): void => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <NavigationHeaderMenuIcon
            name={'menu-sharp'}
            type={IconTypeEnum.Ionicons}
            size={35}
          />
          <NavigationHeaderMenuButtonBg color={theme.primaryPurple} />
        </NavigationHeaderMenuButton>
      );
    case 'subscriptions':
      return (
        <IconButton
          style={styles.iconButton}
          name={'wallet-outline'}
          type={IconTypeEnum.Ionicons}
          color={theme.lightGrey}
          size={35}
          onPress={(): void => { }}
        />
      );
    default:
      return (
        <NavigationEmptyContainer />
      );
  }
};

export default useGetLeftNavigationItem;