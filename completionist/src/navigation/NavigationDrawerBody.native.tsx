import React from 'react';
import {
  NavigationDrawerBodyContainer,
  NavigationDrawerFooter,
  NavigationDrawerTitle
} from './NavigationStyledComponents.native';
import useReactNavigation from './hooks/useReactNavigation.native';
import useGetNavigationDrawerItems from './hooks/useGetNavigationDrawerItems.native';
import useGetLoginMethods from '@components/custom/LoginForm/hooks/useGetLoginMethods';
import { Pressable } from 'react-native';
import { ScreenEnum } from '@utils/CustomEnums';
import useGetTheme from '@styles/hooks/useGetTheme';
import useMainState from '@redux/hooks/useMainState';
import useGetNavigationFooterDrawerItems from './hooks/useGetFooterNavigationDrawerItems.native';
import NavigationDrawerItem from './NavigationDrawerItem.native';
import { useTranslation } from 'react-i18next';

const NavigationDrawerBody: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const navigation = useReactNavigation();
  const theme = useGetTheme();
  const { currentScreen } = useMainState();
  const drawerItems = useGetNavigationDrawerItems();
  const footerItems = useGetNavigationFooterDrawerItems();
  const { signOut } = useGetLoginMethods();
  
  return (
    <NavigationDrawerBodyContainer>
      {drawerItems.map((item, index) => (
        <NavigationDrawerItem key={index} item={item} isActive={currentScreen === item.id} />
      ))}
      <NavigationDrawerFooter>
        {footerItems.map((item, index) => (
          <Pressable key={index} onPress={(): void => navigation.navigate(item.id)}>
            <NavigationDrawerTitle
              type={'ListItemTitle'}
              color={currentScreen === item.id ? theme.lightGrey : theme.midGrey}
              align={'left'}
            >
              {item.title}
            </NavigationDrawerTitle>
          </Pressable>
        ))}
        <Pressable onPress={signOut}>
          <NavigationDrawerTitle
            type={'ListItemTitle'}
            color={currentScreen === ScreenEnum.Login ? theme.lightGrey : theme.midGrey}
            align={'left'}
          >
            {t('common:auth.logout')}
          </NavigationDrawerTitle>
        </Pressable>
      </NavigationDrawerFooter>
    </NavigationDrawerBodyContainer>
  );
};

export default NavigationDrawerBody;
