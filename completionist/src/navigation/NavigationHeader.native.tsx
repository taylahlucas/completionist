import React from 'react';
import useGetTheme from '@styles/hooks/useGetTheme';
import {
  styles,
  NavigationHeaderContainer,
  NavigationHeaderText,
  NavigationEmptyContainer
} from './NavigationStyledComponents.native';
import Condition from '@components/general/Condition.native';
import { NavigationHeaderLeftActionTypes, NavigationHeaderRightActionTypes } from '@utils/CustomTypes';
import useGetLeftNavigationItem from './hooks/useGetLeftNavigationItem.native';
import IconButton from '@components/general/Icon/IconButton.native';
import useGetLoginMethods from '@components/custom/LoginForm/hooks/useGetLoginMethods';

interface NavigationHeaderProps {
  title: string;
  leftAction?: NavigationHeaderLeftActionTypes;
  rightAction?: NavigationHeaderRightActionTypes;
}

const NavigationHeader = ({ title, leftAction = 'menu', rightAction = 'none' }: NavigationHeaderProps) => {
  const theme = useGetTheme();
  const leftItem = useGetLeftNavigationItem(leftAction);
  const { googleSignOut } = useGetLoginMethods();

  return (
    <NavigationHeaderContainer>
      {leftItem}
      <NavigationHeaderText type={'Heading'} color={theme.lightGrey}>{title}</NavigationHeaderText>
      <Condition
        condition={rightAction === 'logout'}
        conditionalElement={
          <NavigationEmptyContainer />
        }
      >
        <IconButton
          style={styles.iconButton}
          name={'logout'}
          color={theme.lightGrey}
          size={30}
          onPress={googleSignOut}
        />
      </Condition>
    </NavigationHeaderContainer>
  );
};

export default NavigationHeader;