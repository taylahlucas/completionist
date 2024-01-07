import React from 'react';
import { NavigationDrawerItemData } from '@utils/CustomInterfaces';
import useReactNavigation from './hooks/useReactNavigation.native';
import { 
  NavigationHeaderSubTitle, 
  NavigationHeaderTitleContainer, 
  NavigationDrawerTitle 
} from './NavigationStyledComponents.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import useMainDispatch from '@redux/hooks/useMainDispatch';

interface NavigationDrawerItemProps {
  item: NavigationDrawerItemData;
  isActive: boolean;
}

const NavigationDrawerItem = ({ item, isActive }: NavigationDrawerItemProps) => {
  const theme = useGetTheme();
  const navigation = useReactNavigation();
  const { reset } = useMainDispatch();

  return (
    <NavigationHeaderTitleContainer
      key={item.id}
      disabled={!item.isEnabled}
      onPress={(): void => {
        navigation.navigate(item.id)
        reset();
      }}
    >
      <NavigationDrawerTitle 
        type={'ListItemTitle'} 
        color={isActive ? theme.lightGrey : theme.midGrey}
        align={'left'}
      >
        {item.title}
      </NavigationDrawerTitle>
      <NavigationHeaderSubTitle 
        color={isActive ? theme.lightGrey : theme.midGrey} 
        type={'ListItemSubTitle'} 
        align={'right'}
      >
        {item.subTitle}
      </NavigationHeaderSubTitle>
    </NavigationHeaderTitleContainer>
  );
};

export default NavigationDrawerItem;