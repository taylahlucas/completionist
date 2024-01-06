import React from 'react';
import { ViewStyle } from 'react-native';
import StyledText from '../Text/StyledText.native';
import { StyledButtonDefault, StyledButtonText } from './ButtonStyledComponents.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import { ButtonType } from '@utils/CustomTypes';

interface ButtonProps {
  title: string;
  type?: ButtonType;
  onPress: () => void;
  style?: ViewStyle;
  disabled?: boolean;
}

const Button = ({ title, type = 'default', onPress, style, disabled = false }: ButtonProps) => {
  const theme = useGetTheme();

  switch (type) {
    case 'text':
      return (
        <StyledButtonText style={{ ...style }} onPress={onPress} color={theme.darkGrey} disabled={disabled}>
          <StyledText type={'ListItemSubTitle'}>{title}</StyledText>
        </StyledButtonText>
      );
    default:
      return (
        <StyledButtonDefault style={{ ...style }} onPress={onPress} color={theme.darkGrey} disabled={disabled}>
          <StyledText>{title}</StyledText>
        </StyledButtonDefault>
      );
  }
};

export default Button;