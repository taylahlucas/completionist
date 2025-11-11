import React from 'react';
import {
  NavigationDrawerBodyContainer,
  NavigationDrawerFooter,
  NavigationDrawerFooterItem,
  NavigationDrawerFooterIcon,
  NavigationDrawerFooterTitle,
} from './navigation-styled-components';
import {
  useGetNavigationDrawerItems,
  useReactNavigation,
  useGetNavigationFooterDrawerItems,
} from './hooks';
import { AuthScreenEnum } from '@utils/index';
import useGetTheme from '@styles/hooks/use-get-theme';
import { useMainState, useMainDispatch } from '@redux/hooks';
import { NavigationDrawerItem } from './';
import { useTranslation } from 'react-i18next';
import { useGetLoginMethods } from '@features/login/login-form/hooks';

export const NavigationDrawerBody: React.FunctionComponent = () => {
  const { t, i18n } = useTranslation();
  const navigation = useReactNavigation();
  const theme = useGetTheme();
  const { setSelectedGameData } = useMainDispatch();
  const { user, currentScreen } = useMainState();
  const drawerItems = useGetNavigationDrawerItems();
  const footerItems = useGetNavigationFooterDrawerItems();
  const { signOut } = useGetLoginMethods();

  return (
    <NavigationDrawerBodyContainer contentContainerStyle={{ height: '100%' }}>
      {/* Main items */}
      {drawerItems.map((item, index) => (
        <NavigationDrawerItem
          key={index}
          item={item}
          isActive={currentScreen === item.id}
        />
      ))}
      {/* Footer items */}
      <NavigationDrawerFooter>
        {footerItems.map((item, index) => (
          <NavigationDrawerFooterItem
            key={index}
            onPress={(): void => {
              if (item.id === AuthScreenEnum.GameSelection) {
                i18n.changeLanguage(user.settings.lang);
                setSelectedGameData(undefined);
              }
              navigation.navigate(item.id);
            }}>
            <NavigationDrawerFooterIcon
              name={item.icon}
              type={item.iconType}
              color={theme.lightGrey}
              size={24}
            />
            <NavigationDrawerFooterTitle
              type="ListItemTitle"
              color={
                currentScreen === item.id ? theme.lightGrey : theme.midGrey
              }
              numberOfLines={1}
              align="left">
              {item.title}
            </NavigationDrawerFooterTitle>
          </NavigationDrawerFooterItem>
        ))}
        <NavigationDrawerFooterItem onPress={signOut}>
          <NavigationDrawerFooterIcon
            style={{ marginLeft: 4 }}
            name="logout"
            color={theme.lightGrey}
            size={24}
          />
          <NavigationDrawerFooterTitle
            type="ListItemTitle"
            color={theme.midGrey}
            align="left">
            {t('common:auth.logout')}
          </NavigationDrawerFooterTitle>
        </NavigationDrawerFooterItem>
      </NavigationDrawerFooter>
    </NavigationDrawerBodyContainer>
  );
};
