import React, { useEffect } from 'react';
import { Alert, Animated, Keyboard } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  navigationStyles,
  NavigationHeaderMenuButton,
  NavigationHeaderMenuButtonBg,
  NavigationHeaderMenuIcon,
  NavigationEmptyContainer,
} from '@navigation/navigation-styled-components';
import { IconTypeEnum, NavigationHeaderLeftActionTypes } from '@utils/index';
import useGetTheme from '@styles/hooks/use-get-theme';
import { IconButton } from '@components/general';
import {
  useRotateMenuButton,
  useSafeDrawerStatus,
  useReactNavigation,
  DrawerActions,
} from './';

export const useGetLeftNavigationItem = (
  leftAction: NavigationHeaderLeftActionTypes,
  hasDrawer: boolean = false,
  isForm: boolean,
): React.JSX.Element => {
  const { t } = useTranslation();
  const theme = useGetTheme();
  const navigation = useReactNavigation();
  const drawerStatus = useSafeDrawerStatus();
  const isDrawerOpen = hasDrawer && drawerStatus === 'open';
  const { rotateButton, animatedStyles } = useRotateMenuButton();

  useEffect(() => {
    if (hasDrawer) {
      rotateButton(isDrawerOpen);
    }
  }, [isDrawerOpen]);

  const dismissKeyboard = () => Keyboard.dismiss();

  switch (leftAction) {
    case 'back':
      return (
        <IconButton
          testID="back-button"
          style={{ ...navigationStyles.iconButton, top: 2 }}
          name="arrow-back"
          type={IconTypeEnum.Ionicons}
          color={theme.lightGrey}
          onPress={(): void => {
            dismissKeyboard();
            if (isForm) {
              Alert.alert(
                t('common:alerts.unsavedChanges'),
                t('common:alerts.unsavedChangesMessage'),
                [
                  {
                    text: t('common:alerts.cta.ok'),
                    // Update user with password
                    onPress: (): void => navigation.goBack(),
                  },
                  {
                    text: t('common:alerts.cta.cancel'),
                  },
                ],
              );
            } else {
              navigation.goBack();
            }
          }}
        />
      );
    case 'menu':
      return !hasDrawer ? (
        <></>
      ) : (
        <Animated.View testID="menu-button" style={[animatedStyles]}>
          <NavigationHeaderMenuButton
            onPress={(): void => {
              dismissKeyboard();
              navigation.dispatch(DrawerActions.openDrawer());
            }}>
            <NavigationHeaderMenuIcon
              name="menu-sharp"
              type={IconTypeEnum.Ionicons}
              size={35}
            />
            <NavigationHeaderMenuButtonBg color={theme.primaryPurple} />
          </NavigationHeaderMenuButton>
        </Animated.View>
      );
    // TOOD: Add this back in with global achievements feature
    // case 'achievements':
    //   return (
    // TOOD: Add this back in with global achievements feature
    // <IconButton
    //   style={{ ...styles.iconButton, top: 2 }}
    //   name="progress-star"
    //   type={IconTypeEnum.MaterialCommunityIcons}
    //   color={theme.lightPurple}
    //   size={40}
    //   onPress={(): void => {
    //     dismissKeyboard();
    //     navigation.navigate(AuthScreenEnum.GlobalAchievements);
    //   }}
    // />
    // );
    default:
      return <NavigationEmptyContainer />;
  }
};
