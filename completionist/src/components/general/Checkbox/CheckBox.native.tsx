import React from 'react';
import IconButton from '@components/general/Icon/IconButton.native';
import { IconTypeEnum } from '@utils/CustomEnums';
import useGetTheme from '@styles/hooks/useGetTheme';

interface CheckBoxProps {
  isActive: boolean;
  onPress: () => void;
}

const CheckBox = ({ isActive, onPress }: CheckBoxProps) => {
  const theme = useGetTheme();

  return (
    <IconButton
      name={isActive ? 'checkbox-outline' : 'square-outline'}
      type={IconTypeEnum.Ionicons}
      color={theme.lightGrey}
      size={22}
      onPress={onPress}
    />
  );
};

export default CheckBox;