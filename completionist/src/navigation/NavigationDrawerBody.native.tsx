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

const NavigationDrawerBody: React.FunctionComponent = () => {
  const navigation = useReactNavigation();
  const { reset } = useMainDispatch();
  const drawerItems = useGetNavigationDrawerItems();
  const { signOut } = useGetLoginMethods();

  return (
    <NavigationDrawerBodyContainer>
      {drawerItems.map(item => (
        <NavigationHeaderTitleContainer
          key={item.id}
          onPress={(): void => {
            navigation.navigate(item.id)
            reset();
          }}
        >
          <StyledText align={'left'}>{item.title}</StyledText>
          <NavigationHeaderSubTitle type={'ListItemSubTitle'} align={'right'}>
            {item.subTitle}
          </NavigationHeaderSubTitle>
        </NavigationHeaderTitleContainer>
      ))}
      <NavigationDrawerFooter>
        <Pressable onPress={(): void => navigation.navigate(ScreenEnum.Home)}>
          <StyledText align={'left'}>Game Selection</StyledText>
        </Pressable>
        <Pressable onPress={signOut}>
          <StyledText align={'left'}>Logout</StyledText>
        </Pressable>
      </NavigationDrawerFooter>
    </NavigationDrawerBodyContainer>
  );
};

export default NavigationDrawerBody;
