import React from 'react';
import { Pressable, ViewStyle } from 'react-native';
import Icon, { IconProps } from './Icon.native';

export interface IconButtonProps extends IconProps {
  onPress: () => void;
  style?: ViewStyle;
}

const IconButton = ({ onPress, style, ...props }: IconButtonProps) => {
  return (
    <Pressable style={style} onPress={onPress}>
      <Icon {...props} />
    </Pressable>
  );
};

export default IconButton;