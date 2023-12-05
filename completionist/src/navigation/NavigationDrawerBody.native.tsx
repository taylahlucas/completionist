import React from 'react';
import { Pressable } from 'react-native';
import { mappedQuests, mappedCollectables } from '@data/functions';
import books from '../../backend/database/skyrim_books.json';
import locations from '../../backend/database/skyrim_locations.json';
import { 
  NavigationDrawerBodyContainer, 
  NavigationHeaderTitleContainer,
  NavigationHeaderSubTitle
} from './NavigationStyledComponents.native';
import StyledText from '@components/general/Text/StyledText.native';
import useReactNavigation from './hooks/useReactNavigation.native';
import { ScreenEnum } from '@utils/CustomEnums';
import useMainDispatch from 'src/redux/hooks/useMainDispatch.native';
import useMainState from 'src/redux/hooks/useMainState.native';

const NavigationDrawerBody: React.FunctionComponent = () => {
  const navigation = useReactNavigation();
  const { completedQuestIds, completedCollectableIds, completedBookIds, completedLocationIds } = useMainState();
  const { reset, setSearchValue, triggerShowSearchResults } = useMainDispatch();

  // TODO: Convert to list from custom hook
  return (
    <NavigationDrawerBodyContainer>
      <NavigationHeaderTitleContainer
        onPress={(): void => {
          navigation.navigate(ScreenEnum.Quests)
          reset();
        }}
      >
        <StyledText align={'left'}>Quests</StyledText>
        <NavigationHeaderSubTitle type={'ListItemSubTitle'} align={'right'}>
          {`${completedQuestIds.length}/${mappedQuests.length}`}
        </NavigationHeaderSubTitle>
      </NavigationHeaderTitleContainer>

      <NavigationHeaderTitleContainer onPress={(): void => {
        navigation.navigate(ScreenEnum.Collectables)
        reset();
      }}>
        <StyledText align={'left'}>Collectables</StyledText>
        <NavigationHeaderSubTitle type={'ListItemSubTitle'} align={'right'}>
          {`${completedCollectableIds.length}/${mappedCollectables.length}`}
        </NavigationHeaderSubTitle>
      </NavigationHeaderTitleContainer>

      <NavigationHeaderTitleContainer onPress={(): void => {
        navigation.navigate(ScreenEnum.Books)
        reset();
      }}>
        <StyledText align={'left'}>Books</StyledText>
        <NavigationHeaderSubTitle type={'ListItemSubTitle'} align={'right'}>
          {`${completedBookIds.length}/${books.length}`}
        </NavigationHeaderSubTitle>
      </NavigationHeaderTitleContainer>

      <NavigationHeaderTitleContainer onPress={(): void => {
        navigation.navigate(ScreenEnum.Locations)
        reset();
      }}>
        <StyledText align={'left'}>Locations</StyledText>
        <NavigationHeaderSubTitle type={'ListItemSubTitle'} align={'right'}>
          {`${completedLocationIds.length}/${locations.length}`}
        </NavigationHeaderSubTitle>
      </NavigationHeaderTitleContainer>
    </NavigationDrawerBodyContainer>
  );
};

export default NavigationDrawerBody;
