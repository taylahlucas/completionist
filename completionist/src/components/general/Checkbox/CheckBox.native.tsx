import React, { useEffect, useRef } from 'react';
import LottieView from 'lottie-react-native';
import useGetTheme from '@styles/hooks/useGetTheme';
import { IconTypeEnum } from '@utils/CustomEnums';
import Icon from '../Icon/Icon.native';
import { StyledCheckBox, StyledAnimation } from './CheckBoxStyledComponents.native';
import Condition from '../Condition.native';

interface CheckBoxProps {
  isToggled: boolean;
  action: () => void;
}

const CheckBox = ({ isToggled, action }: CheckBoxProps) => {
  const theme = useGetTheme();
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    if (animationRef.current && isToggled) {
      animationRef.current.play();
    }
  }, [isToggled])

  return (
    <StyledCheckBox onPress={() => {
      if (animationRef.current && isToggled) {
        animationRef.current.play();
      }
      action();
    }}>
      <Condition 
        condition={isToggled}
        conditionalElement={
          <Icon
            name={'circle-thin'}
            type={IconTypeEnum.FontAwesome}
            size={34}
            color={theme.midGrey}
          />
        }
      >
      <StyledAnimation
        ref={animationRef}
        source={require('../../../assets/animations/tick.json')}
        autoPlay={false}
        loop={false}
      />
      </Condition>
    </StyledCheckBox>
  );
};

export default CheckBox;