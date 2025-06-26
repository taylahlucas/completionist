import React from 'react';
import IconButton from '@components/general/icon/icon-button';
import { IconTypeEnum } from '@utils/index';
import useGetTheme from '@styles/hooks/use-get-theme';
import { ViewStyle } from 'react-native';

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
