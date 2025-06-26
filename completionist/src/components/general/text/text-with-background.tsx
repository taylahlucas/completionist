import React from 'react';
import { View } from 'react-native';
import useGetTheme from '@styles/hooks/use-get-theme';
import {
  DEFAULT_BORDER_RADIUS,
  SMALL_PADDING,
  MID_PADDING,
} from '@styles/global';
import { StyledText } from '../';

interface TextWithBackgroundProps {
  value: string;
  textColor?: string;
  backgroundColor?: string;
}

export const TextWithBackground = ({
  value,
  textColor,
  backgroundColor,
}: TextWithBackgroundProps) => {
  const theme = useGetTheme();

  return (
    <View
      style={{
        margin: SMALL_PADDING,
        paddingVertical: SMALL_PADDING,
        paddingHorizontal: MID_PADDING,
        backgroundColor: backgroundColor ?? theme.darkGrey,
        borderRadius: DEFAULT_BORDER_RADIUS,
      }}>
      <StyledText align="left" color={textColor ?? theme.lightGrey}>
        {value}
      </StyledText>
    </View>
  );
};
