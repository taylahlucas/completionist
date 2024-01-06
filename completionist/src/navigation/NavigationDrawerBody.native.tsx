import React from 'react';
import {
  NavigationDrawerBodyContainer,
  NavigationHeaderTitleContainer,
  NavigationHeaderSubTitle,
  NavigationDrawerFooter
} from './NavigationStyledComponents.native';
import useReactNavigation from './hooks/useReactNavigation.native';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useGetNavigationDrawerItems from './hooks/useGetNavigationDrawerItems.native';
import StyledText from '@components/general/Text/StyledText.native';
import useGetLoginMethods from '@components/custom/LoginForm/hooks/useGetLoginMethods';
import { Pressable } from 'react-native';
import { ScreenEnum } from '@utils/CustomEnums';
import { setSelectedGame } from '@redux/MainState';
import useGetTheme from '@styles/hooks/useGetTheme';
import useMainState from '@redux/hooks/useMainState';

const NavigationDrawerBody: React.FunctionComponent = () => {
  const navigation = useReactNavigation();
  const theme = useGetTheme();
  const { reset } = useMainDispatch();
  const { currentScreen } = useMainState();
  const drawerItems = useGetNavigationDrawerItems();
  const { signOut } = useGetLoginMethods();

  return (
    <NavigationDrawerBodyContainer>
      {drawerItems.map(item => {
        const isActive = currentScreen === item.id;
        return (
          <NavigationHeaderTitleContainer
            key={item.id}
            disabled={!item.isEnabled}
            onPress={(): void => {
              navigation.navigate(item.id)
              reset();
            }}
          >
            <StyledText color={isActive ? theme.primaryPurple : theme.midGrey} align={'left'}>{item.title}</StyledText>
            <NavigationHeaderSubTitle color={isActive ? theme.primaryPurple : theme.midGrey} type={'ListItemSubTitle'} align={'right'}>
              {item.subTitle}
            </NavigationHeaderSubTitle>
          </NavigationHeaderTitleContainer>
        )
      })}
      <NavigationDrawerFooter>
        <Pressable onPress={(): void => {
          setSelectedGame(null);
          navigation.navigate(ScreenEnum.Home);
        }}>
          <StyledText align={'left'}>Game Selection</StyledText>
        </Pressable>
        <Pressable onPress={(): void => navigation.navigate(ScreenEnum.RequestGame)}>
          <StyledText align={'left'}>Send Request</StyledText>
        </Pressable>
        <Pressable onPress={(): void => navigation.navigate(ScreenEnum.Settings)}>
          <StyledText align={'left'}>Settings</StyledText>
        </Pressable>
        <Pressable onPress={signOut}>
          <StyledText align={'left'}>Logout</StyledText>
        </Pressable>
      </NavigationDrawerFooter>
    </NavigationDrawerBodyContainer>
  );
};

export default NavigationDrawerBody;
