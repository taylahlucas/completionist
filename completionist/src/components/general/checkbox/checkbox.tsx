import React from 'react';
import { ViewStyle } from 'react-native';
import { IconButton } from '../';
import { IconTypeEnum } from '@utils/index';
import useGetTheme from '@styles/hooks/use-get-theme';

interface CheckBoxProps {
  isActive: boolean;
  onPress: () => void;
  style?: ViewStyle;
}

export const CheckBox = ({ isActive, onPress, style }: CheckBoxProps) => {
  const theme = useGetTheme();

  return (
    <IconButton
      style={style}
      name={isActive ? 'checkbox-outline' : 'square-outline'}
      type={IconTypeEnum.Ionicons}
      color={theme.lightGrey}
      size={22}
      onPress={onPress}
    />
  );
};
