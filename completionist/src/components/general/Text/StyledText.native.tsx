import React from 'react';
import { Text, TextProps } from 'react-native';
import { FontType, AlignmentType } from '@styles/Font/FontType';
import defaultStyle from '@styles/Font/FontStyle';
import useGetTheme from '@styles/hooks/useGetTheme';

interface StyledTextProps extends TextProps {
  children: string;
  type?: FontType;
  color?: string;
  style?: any;
  align?: AlignmentType;
}

const StyledText: React.FunctionComponent<StyledTextProps> = ({ 
  children, 
  type = 'ListItemSubTitle',
  color,
  style,
  align = 'center',
  ...props
}) => {
  const theme = useGetTheme();
  
  return (
    <Text 
      numberOfLines={props.numberOfLines} 
      ellipsizeMode='tail' 
      style={{ ...defaultStyle[type], ...defaultStyle[align], ...style, color: color ?? theme.midGrey }}
    >
      {children}
    </Text>
  );
};

export default StyledText;