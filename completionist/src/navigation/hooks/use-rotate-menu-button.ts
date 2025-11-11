import { useState } from 'react';
import { Animated, Easing } from 'react-native';

export const useRotateMenuButton = () => {
  const [rotation] = useState(new Animated.Value(0));
  const rotateInterpolation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  const animatedStyles = {
    transform: [{ rotate: rotateInterpolation }],
  };

  const rotateButton = (open: boolean) => {
    Animated.timing(rotation, {
      toValue: open ? 1 : 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => rotation.setValue(open ? 1 : 0));
  };

  return { rotateButton, animatedStyles };
};
