import React from 'react';
import { Pressable, ViewStyle } from 'react-native';
import { Icon, IconProps } from '.';

export interface IconButtonProps extends IconProps {
  testID?: string;
  onPress: () => void;
  style?: ViewStyle;
}

export const IconButton = ({
  testID,
  onPress,
  style,
  ...props
}: IconButtonProps) => {
  return (
    <Pressable testID={testID} style={style} onPress={onPress}>
      <Icon {...props} />
    </Pressable>
  );
};
