import React from 'react';
import {
  NavigationDrawerBodyContainer,
  NavigationDrawerFooter,
  NavigationDrawerFooterItem,
  NavigationDrawerFooterIcon,
  NavigationDrawerFooterTitle,
} from './NavigationStyledComponents.native';
import useReactNavigation from './hooks/useReactNavigation.native';
import useGetNavigationDrawerItems from './hooks/useGetNavigationDrawerItems.native';
import useGetLoginMethods from '@components/custom/LoginForm/hooks/useGetLoginMethods';
import { AuthScreenEnum } from '@utils/CustomEnums';
import useGetTheme from '@styles/hooks/useGetTheme';
import useMainState from '@redux/hooks/use-main-state';
import useGetNavigationFooterDrawerItems from './hooks/useGetNavigationFooterDrawerItems.native';
import NavigationDrawerItem from './NavigationDrawerItem.native';
import { useTranslation } from 'react-i18next';
import useMainDispatch from '@redux/hooks/use-main-dispatch';

const NavigationDrawerBody: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const navigation = useReactNavigation();
  const theme = useGetTheme();
  const { setSelectedGame } = useMainDispatch();
  const { currentScreen } = useMainState();
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
                setSelectedGame(undefined);
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

export default NavigationDrawerBody;
