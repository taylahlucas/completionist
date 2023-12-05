import React from 'react';
import useGetTheme from '../../../styles/hooks/useGetTheme';
import { IconTypeEnum } from '@utils/CustomEnums';
import Icon from '../Icon/Icon.native';
import { StyledCheckBox } from './CheckBoxStyledComponents.native';

interface CheckBoxProps {
  isToggled: boolean;
  action: () => void;
}

const CheckBox = ({ isToggled, action }: CheckBoxProps) => {
  const theme = useGetTheme();

  return (
    <StyledCheckBox onPress={action}>
      <Icon
        name={isToggled ? 'check-circle' : 'circle-thin'}
        type={IconTypeEnum.FontAwesome}
        size={35}
        color={isToggled ? theme.lightGreen : theme.lightGrey}
      />
    </StyledCheckBox>
  );
};

export default CheckBox;