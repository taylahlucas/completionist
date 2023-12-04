import React from 'react';
import { Pressable } from 'react-native';
import { NavigationDrawerBodyContainer } from './NavigationStyledComponents.native';
import StyledText from '@components/general/Text/StyledText.native';
import useReactNavigation from './hooks/useReactNavigation.native';
import { ScreenEnum } from '@utils/CustomEnums';

const NavigationDrawerBody: React.FunctionComponent = () => {
  const navigation = useReactNavigation();

  return (
    <NavigationDrawerBodyContainer>
      <Pressable onPress={(): void => navigation.navigate(ScreenEnum.Quests)}>
        <StyledText>Quests</StyledText>
      </Pressable>
      <Pressable onPress={(): void => navigation.navigate(ScreenEnum.Collectables)}>
        <StyledText>Collectables</StyledText>
      </Pressable>
      <Pressable onPress={(): void => navigation.navigate(ScreenEnum.Books)}>
        <StyledText>Books</StyledText>
      </Pressable>
      <Pressable onPress={(): void => navigation.navigate(ScreenEnum.Locations)}>
        <StyledText>Locations</StyledText>
      </Pressable>
    </NavigationDrawerBodyContainer>
  );
};

export default NavigationDrawerBody;
