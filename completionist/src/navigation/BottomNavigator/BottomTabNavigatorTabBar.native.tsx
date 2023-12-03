import React from 'react';
import { Pressable } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import useGetTheme from '@styles/hooks/useGetTheme';
// import Icon from '@components/general/Icon/Icon.native';
import Condition from '@components/general/Condition.native';
import { TabNavigatorContainer, BottomTabNavigatorIconBackground } from './BottomTabNavigatorStyledComponents.native'; 

const BottomTabNavigatorTabBar = ({ state, descriptors, navigation }: BottomTabBarProps): JSX.Element => {
  const theme = useGetTheme();
  
  return (
    <TabNavigatorContainer color={theme.darkGrey}>
      {state.routes.map((route: any, index: number) => {
        return (
          <Pressable
            key={route.params.id}
            style={{ justifyContent: 'center' }}
            onPress={(): void =>  navigation.navigate(route.name)}
          >
          <>
            {/* <Icon
              name={route.params.icon}
              type={route.params.iconType}
              color={theme.primaryPurple}
              size={55}
            /> */}
            <BottomTabNavigatorIconBackground color={theme.lightestGrey} />
          </>
          </Pressable>
        )
      })}
    </TabNavigatorContainer>
  )
};

export default BottomTabNavigatorTabBar;