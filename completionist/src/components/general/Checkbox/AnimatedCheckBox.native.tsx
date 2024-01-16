import React, { useState, useRef, useEffect } from 'react';
import LottieView from 'lottie-react-native';
import useGetTheme from '@styles/hooks/useGetTheme';
import { IconTypeEnum } from '@utils/CustomEnums';
import Icon from '../Icon/Icon.native';
import { StyledAnimatedCheckBox, StyledAnimation } from './CheckBoxStyledComponents.native';
import Condition from '../Condition.native';

interface AnimatedCheckBoxProps {
  isToggled: boolean;
  action: () => void;
}

const AnimatedCheckBox = ({ isToggled, action }: AnimatedCheckBoxProps) => {
  const theme = useGetTheme();
  const [trigger, setTrigger] = useState(false);
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    if (trigger) {
      animationRef?.current?.play();
    }
  }, [trigger]);

  return (
    <StyledAnimatedCheckBox onPress={() => {
      setTrigger(!isToggled);
      action();
    }}>
      <Condition
        condition={isToggled}
        conditionalElement={
          <Icon
            name={'circle-thin'}
            type={IconTypeEnum.FontAwesome}
            size={33}
            color={theme.lightGrey}
          />
        }
      >
        <StyledAnimation
          ref={animationRef}
          source={require('../../../styles/animations/tick.json')}
          progress={trigger ? 0 : 1}
          loop={false}
          onAnimationFinish={() => animationRef?.current?.render()}
        />
      </Condition>
    </StyledAnimatedCheckBox>
  );
};

export default AnimatedCheckBox;