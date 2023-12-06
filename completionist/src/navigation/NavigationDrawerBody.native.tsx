import React from 'react';
import {
  NavigationDrawerBodyContainer,
  NavigationHeaderTitleContainer,
  NavigationHeaderSubTitle
} from './NavigationStyledComponents.native';
import useReactNavigation from './hooks/useReactNavigation.native';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useGetNavigationDrawerItems from './hooks/useGetNavigationDrawerItems.native';
import StyledText from '@components/general/Text/StyledText.native';

const NavigationDrawerBody: React.FunctionComponent = () => {
  const navigation = useReactNavigation();
  const { reset } = useMainDispatch();
  const drawerItems = useGetNavigationDrawerItems();

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
    </NavigationDrawerBodyContainer>
  );
};

export default NavigationDrawerBody;
