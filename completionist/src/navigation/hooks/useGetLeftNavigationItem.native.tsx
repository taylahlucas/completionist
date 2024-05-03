import React, { useState, useEffect } from 'react';
import { Animated, Easing} from 'react-native';
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


const useGetLeftNavigationItem = (leftAction: NavigationHeaderLeftActionTypes): JSX.Element => {
  const theme = useGetTheme();
  const navigation = useReactNavigation();
	const [rotation] = useState(new Animated.Value(0));
	const isDrawerOpen = useDrawerStatus() === 'open';

	const rotateButton = () => {
    Animated.timing(rotation, {
      toValue: isDrawerOpen ? 1 : 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      // Reset rotation to 0 when animation completes
      rotation.setValue(isDrawerOpen ? 1 : 0);
    });
  };

  const rotateInterpolation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  const animatedStyles = {
    transform: [{ rotate: rotateInterpolation }],
  };

	useEffect(() => {
		rotateButton();
	}, [isDrawerOpen]);

  switch (leftAction) {
    case 'back':
		// TODO: Fix back action, not going to correct screen 
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
				<Animated.View style={[animatedStyles]}>
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
          onPress={(): void => navigation.navigate(ScreenEnum.Subscriptions)}
        />
      );
    default:
      return (
        <NavigationEmptyContainer />
      );
  }
};

export default useGetLeftNavigationItem;