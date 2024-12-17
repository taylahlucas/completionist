import React, { useRef, useState, useEffect } from 'react';
import { Animated } from 'react-native';
import useGetTheme from '@styles/hooks/useGetTheme';
import {
  ListItemContainer,
  ListItemTitle,
  ListItemContentContainer,
  ListItemLocationContainer,
} from '@components/general/Lists/index';
import AnimatedCheckBox from '../Checkbox/AnimatedCheckBox.native';
import { Condition } from '@components/general/index';
import useGetLocationString from '@utils/hooks/useGetLocationString';
import StyledText from '../Text/StyledText.native';
import { capitalize } from '@utils/hooks/index';
import useContentDispatch from '@components/custom/ContentList/provider/useContentDispatch';

interface ListItemProps {
  id: string;
  title: string;
  location?: string;
  hold?: string;
  href?: string;
  isComplete?: boolean;
  action: () => void;
}

export const ListItem = ({
  title,
  location,
  hold,
  href,
  isComplete = false,
  action,
}: ListItemProps) => {
  const theme = useGetTheme();
  const locationString = useGetLocationString({ hold, location });
  const { setWebViewHref } = useContentDispatch();
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
        onLongPress={(): void => setWebViewHref(href)}>
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
              {locationString}
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
