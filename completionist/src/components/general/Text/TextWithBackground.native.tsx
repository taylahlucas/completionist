import React from 'react';
import { View } from 'react-native';
import useGetTheme from '@styles/hooks/useGetTheme';
import {
  DEFAULT_BORDER_RADIUS,
  SMALL_PADDING,
  MID_PADDING,
} from '@styles/global.native';
import StyledText from '@components/general/Text/StyledText.native';

interface TextWithBackgroundProps {
  value: string;
  textColor?: string;
  backgroundColor?: string;
}

const TextWithBackground = ({
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

export default TextWithBackground;
