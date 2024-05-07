import React, { useEffect } from 'react';
import { Animated, Keyboard } from 'react-native';
import { NavigationHeaderLeftActionTypes } from '@utils/CustomTypes';
import {
  styles,
  NavigationHeaderMenuButton,
  NavigationHeaderMenuButtonBg,
  NavigationHeaderMenuIcon,
  NavigationEmptyContainer
} from '@navigation/NavigationStyledComponents.native';
import { IconTypeEnum, ScreenEnum } from '@utils/CustomEnums';
import useReactNavigation, { DrawerActions } from './useReactNavigation.native';
import { useDrawerStatus } from '@react-navigation/drawer';
import useGetTheme from '@styles/hooks/useGetTheme';
import IconButton from '@components/general/Icon/IconButton.native';
import useRotateMenuButton from './useRotateMenuButton.native';

const useGetLeftNavigationItem = (leftAction: NavigationHeaderLeftActionTypes): JSX.Element => {
  const theme = useGetTheme();
  const navigation = useReactNavigation();
	const isDrawerOpen = useDrawerStatus() === 'open';
	const { rotateButton, animatedStyles } = useRotateMenuButton();

	useEffect(() => {
		rotateButton(isDrawerOpen);
	}, [isDrawerOpen]);

	const dismissKeyboard = () => {
		Keyboard.dismiss();
	};

  switch (leftAction) {
    case 'back':
      return (
        <IconButton
          style={styles.iconButton}
          name={'arrow-back'}
          type={IconTypeEnum.Ionicons}
          color={theme.lightGrey}
          onPress={(): void => {
						dismissKeyboard();
						navigation.goBack();
					}}
        />
      );
    case 'menu':
      return (
				<Animated.View style={[animatedStyles]}>
					<NavigationHeaderMenuButton
						onPress={(): void => {
							dismissKeyboard();
							navigation.dispatch(DrawerActions.openDrawer())
						}}
					>
						<NavigationHeaderMenuIcon
							name={'menu-sharp'}
							type={IconTypeEnum.Ionicons}
							size={35}
						/>
						<NavigationHeaderMenuButtonBg color={theme.primaryPurple} />
					</NavigationHeaderMenuButton>
				</Animated.View>
      );
    case 'subscriptions':
      return (
        <IconButton
          style={styles.iconButton}
          name={'wallet-outline'}
          type={IconTypeEnum.Ionicons}
          color={theme.lightGrey}
          size={35}
          onPress={(): void => {
						dismissKeyboard();
						navigation.navigate(ScreenEnum.Subscriptions);
					}}
        />
      );
    default:
      return (
        <NavigationEmptyContainer />
      );
  }
};

export default useGetLeftNavigationItem;