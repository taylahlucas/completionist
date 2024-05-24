import React from 'react';
import { Text, TextProps, View } from 'react-native';
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

const StyledText = React.forwardRef<Text, StyledTextProps>(({
  children, 
  type = 'ListItemSubTitle',
  color,
  style,
  align = 'center',
  ...props
}: StyledTextProps, ref) => {
	const theme = useGetTheme();
	const { testID, numberOfLines } = props;
  
  return (
		<Text
			ref={ref}
			testID={testID}
			numberOfLines={numberOfLines} 
			ellipsizeMode='tail' 
			style={{ 
				...defaultStyle[type], 
				...defaultStyle[align], 
				...style, 
				color: color ?? theme.midGrey }}
		>
			{children}
		</Text>
  );
});

export default StyledText;