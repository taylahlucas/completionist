import React from 'react';
import IconButton from '@components/general/Icon/IconButton.native';
import { IconTypeEnum } from '@utils/CustomEnums';
import useGetTheme from '@styles/hooks/useGetTheme';
import { ViewStyle } from 'react-native';

interface CheckBoxProps {
  isActive: boolean;
  onPress: () => void;
	style?: ViewStyle;
}

const CheckBox = ({ isActive, onPress, style }: CheckBoxProps) => {
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

export default CheckBox;