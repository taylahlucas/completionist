import React from 'react';
import useReactNavigation, { DrawerActions } from '@navigation/hooks/useReactNavigation.native';
import { IconTypeEnum } from '@utils/CustomEnums';
import useGetTheme from '@styles/hooks/useGetTheme';
import {
  NavigationHeaderContainer,
  NavigationHeaderMenuButton,
  NavigationHeaderMenuIcon,
  NavigationHeaderMenuButtonBg,
  NavigationHeaderText
} from './NavigationStyledComponents.native';
import Condition from '@components/general/Condition.native';
import Icon from '@components/general/Icon/Icon.native';

type NavigationHeaderLeftActionTypes = 'back' | 'menu';

interface NavigationHeaderProps {
  title: string;
  leftAction?: NavigationHeaderLeftActionTypes;
}

const NavigationHeader = ({ title, leftAction = 'menu' }: NavigationHeaderProps) => {
  const theme = useGetTheme();
  const navigation = useReactNavigation();

  return (
    <NavigationHeaderContainer>
      <Condition
        condition={leftAction === 'menu'}
        conditionalElement={
          <NavigationHeaderMenuButton onPress={(): void => navigation.goBack()}>
            <Icon name={'arrow-back'} type={IconTypeEnum.Ionicons} color={theme.lightGrey} />
          </NavigationHeaderMenuButton>
        }
      >
        <NavigationHeaderMenuButton
          onPress={(): void => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <NavigationHeaderMenuIcon
            name={'menu-sharp'}
            type={IconTypeEnum.Ionicons}
            size={35}
          />
          <NavigationHeaderMenuButtonBg color={theme.primaryPurple} />
        </NavigationHeaderMenuButton>
      </Condition>
      <NavigationHeaderText>{title}</NavigationHeaderText>
    </NavigationHeaderContainer>
  );
};

export default NavigationHeader;