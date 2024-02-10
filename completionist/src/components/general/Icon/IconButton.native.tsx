import React from 'react';
import { Pressable, ViewStyle } from 'react-native';
import Icon, { IconProps } from './Icon.native';

export interface IconButtonProps extends IconProps {
	testID?: string;
  onPress: () => void;
  style?: ViewStyle;
}

const IconButton = ({ testID, onPress, style, ...props }: IconButtonProps) => {
  return (
    <Pressable testID={testID} style={style} onPress={onPress}>
      <Icon {...props} />
    </Pressable>
  );
};

export default IconButton;