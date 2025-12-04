import React, { useRef, useState, useEffect } from 'react';
import { Animated } from 'react-native';
import useGetTheme from '@styles/hooks/use-get-theme';
import {
  ListItemContainer,
  ListItemTitle,
  ListItemContentContainer,
  ListItemLocationContainer,
  AnimatedCheckBox,
  Condition,
  StyledText,
} from '..';
import { getLocationString, capitalize } from '@utils/helpers/index';

interface ListItemProps {
  id: string;
  title: string;
  location?: string;
  hold?: string;
  href?: string;
  isComplete?: boolean;
  onLongPress?: () => void;
  action: () => void;
}

export const ListItem = ({
  title,
  location,
  hold,
  isComplete = false,
  onLongPress,
  action,
}: ListItemProps) => {
  const theme = useGetTheme();
  const fadeValue = useRef(new Animated.Value(isComplete ? 0 : 1)).current;
  const [isPressed, setPressed] = useState<boolean>(false);

  const fadeAnimation = (fadeOut: boolean, duration: number) => {
    Animated.timing(fadeValue, {
      toValue: fadeOut ? 1 : 0,
      duration: duration,
      useNativeDriver: true,
    }).start();
  };

  const interpolatedBackgroundColor = fadeValue.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.darkGrey, theme.midGrey],
  });

  useEffect(() => {
    if (isPressed) {
      fadeAnimation(isComplete, 100);
    } else {
      fadeAnimation(!isComplete, 100);
    }
  }, [isPressed]);

  const getTitleColor = () => {
    if (isComplete && isPressed) {
      return theme.darkGrey;
    } else if (isComplete) {
      return theme.midGrey;
    } else {
      return theme.lightestGrey;
    }
  };

  return (
    <ListItemContainer style={{ backgroundColor: interpolatedBackgroundColor }}>
      <ListItemContentContainer
        onTouchStart={(): void => setPressed(true)}
        onTouchEnd={(): void => setPressed(false)}
        onLongPress={onLongPress}>
        <ListItemTitle
          align="left"
          ellipsizeMode={'tail'}
          color={getTitleColor()}>
          {capitalize(title)}
        </ListItemTitle>
        <Condition condition={!!location || !!hold}>
          <ListItemLocationContainer>
            <StyledText
              type={'ListItemSubDescription'}
              color={isComplete ? theme.midGrey : theme.darkGrey}
              ellipsizeMode={'tail'}
              numberOfLines={1}>
              {getLocationString({ hold, location })}
            </StyledText>
          </ListItemLocationContainer>
        </Condition>
      </ListItemContentContainer>
      <AnimatedCheckBox
        isToggled={isComplete}
        action={() => {
          action();
          fadeAnimation(isComplete, 500);
        }}
      />
    </ListItemContainer>
  );
};
