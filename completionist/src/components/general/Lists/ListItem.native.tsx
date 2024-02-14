import React, { useRef } from 'react';
import { Animated } from 'react-native';
import useGetTheme from '@styles/hooks/useGetTheme';
import { ListItemContainer, ListItemTitle, ListItemContentContainer, ListItemLocationContainer } from './ListStyledComponents.native';
import AnimatedCheckBox from '../Checkbox/AnimatedCheckBox.native';
import Condition from '../Condition.native';
import useGetLocationString from '@utils/hooks/useGetLocationString';
import StyledText from '../Text/StyledText.native';

interface ListItemProps {
  id: string;
  title: string;
  location?: string;
  hold?: string;
  isComplete?: boolean;
  action: () => void;
}

const ListItem = ({ title, location, hold, isComplete = false, action }: ListItemProps) => {
  const theme = useGetTheme();
  const locationString = useGetLocationString({ hold, location });
	const fadeValue = useRef(new Animated.Value(isComplete ? 0 : 1)).current;

	const fadeAnimation = (fadeOut: boolean) => {
		Animated.timing(fadeValue, {
			toValue: fadeOut ? 1 : 0,
			duration: 500,
			useNativeDriver: true
		}).start();
	}

	const interpolatedBackgroundColor = fadeValue.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.darkGrey, theme.midGrey],
  });
	
  return (
    <ListItemContainer 
			color={isComplete ? theme.darkGrey : theme.midGrey} 
			style={{ backgroundColor: interpolatedBackgroundColor }}
		>
      <ListItemContentContainer>
        <ListItemTitle
          align={'left'}
          ellipsizeMode={'tail'}
          color={isComplete ? theme.midGrey : theme.lightestGrey}
        >
          {title}
        </ListItemTitle>
        <Condition condition={!!location || !!hold}>
          <ListItemLocationContainer>
            <StyledText
              type={'ListItemSubDescription'} 
              color={isComplete ? theme.midGrey : theme.darkGrey}
              ellipsizeMode={'tail'}
              numberOfLines={1}
            >
              {locationString}
            </StyledText>
          </ListItemLocationContainer>
        </Condition>
      </ListItemContentContainer>
      <AnimatedCheckBox isToggled={isComplete} action={() => {
					action();
					fadeAnimation(isComplete);
				}} />
    </ListItemContainer>
  );
};

export default ListItem;


