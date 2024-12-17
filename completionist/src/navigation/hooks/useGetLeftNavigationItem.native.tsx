import React, { useEffect } from 'react';
import { Alert, Animated, Keyboard } from 'react-native';
import { useTranslation } from 'react-i18next';
import { NavigationHeaderLeftActionTypes } from '@utils/CustomTypes';
import {
  styles,
  NavigationHeaderMenuButton,
  NavigationHeaderMenuButtonBg,
  NavigationHeaderMenuIcon,
  NavigationEmptyContainer,
} from '@navigation/NavigationStyledComponents.native';
import { IconTypeEnum, AuthScreenEnum } from '@utils/CustomEnums';
import useReactNavigation, { DrawerActions } from './useReactNavigation.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import IconButton from '@components/general/Icon/IconButton.native';
import useRotateMenuButton from './useRotateMenuButton.native';
import useSafeDrawerStatus from './useSafeDrawerStatus.native';

const useGetLeftNavigationItem = (
  leftAction: NavigationHeaderLeftActionTypes,
  hasDrawer: boolean = false,
  isForm: boolean,
): JSX.Element => {
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
          style={{ ...styles.iconButton, top: 2 }}
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
        <Animated.View style={[animatedStyles]}>
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
    case 'achievements':
      return (
        <IconButton
          style={{ ...styles.iconButton, top: 2 }}
          name="progress-star"
          type={IconTypeEnum.MaterialCommunityIcons}
          color={theme.lightPurple}
          size={40}
          onPress={(): void => {
            dismissKeyboard();
            navigation.navigate(AuthScreenEnum.GlobalAchievements);
          }}
        />
      );
    default:
      return <NavigationEmptyContainer />;
  }
};

export default useGetLeftNavigationItem;
