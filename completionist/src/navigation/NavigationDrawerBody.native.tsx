import React from 'react';
import { Pressable } from 'react-native';
import { NavigationDrawerBodyContainer } from './NavigationStyledComponents.native';
import StyledText from '@components/general/Text/StyledText.native';
import useReactNavigation from './hooks/useReactNavigation.native';
import { ScreenEnum } from '@utils/CustomEnums';
import useMainDispatch from 'src/redux/hooks/useMainDispatch.native';

const NavigationDrawerBody: React.FunctionComponent = () => {
  const navigation = useReactNavigation();
  const { reset, setSearchValue, triggerShowSearchResults } = useMainDispatch();

  return (
    <NavigationDrawerBodyContainer>
      <Pressable onPress={(): void => {
        navigation.navigate(ScreenEnum.Quests)
        reset();
      }}>
        <StyledText align={'left'}>Quests</StyledText>
      </Pressable>
      <Pressable onPress={(): void => {
        navigation.navigate(ScreenEnum.Collectables)
        reset();
      }}>
        <StyledText align={'left'}>Collectables</StyledText>
      </Pressable>
      <Pressable onPress={(): void => {
        navigation.navigate(ScreenEnum.Books)
        reset();
      }}>
        <StyledText align={'left'}>Books</StyledText>
      </Pressable>
      <Pressable onPress={(): void => {
        navigation.navigate(ScreenEnum.Locations)
        reset();
      }}>
        <StyledText align={'left'}>Locations</StyledText>
      </Pressable>
    </NavigationDrawerBodyContainer>
  );
};

export default NavigationDrawerBody;
