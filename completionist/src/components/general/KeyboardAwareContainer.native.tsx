import React, { useMemo } from 'react';
import { StatusBar, View, StyleProp, ViewStyle } from 'react-native';
import { isIos } from '@utils/device';
import useKeyboardHeight from '@utils/hooks/useKeyboardHeight.native';

interface KeyboardAwareContainerProps {
	children?: React.ReactElement;
	style?: StyleProp<ViewStyle>
	keyboardShownPadding?: number;
	keyboardHidePadding?: number;
}

export const KeyboardAwareContainer = ({
	children,
	style,
	keyboardShownPadding = 0,
	keyboardHidePadding = 0
}: KeyboardAwareContainerProps) => {
	const keyboardHeight = useKeyboardHeight();
	const offset = useMemo(
		() => (isIos() ? 0 : StatusBar.currentHeight || 0),
		[],
	);

	const paddingBottom = keyboardHeight
		? keyboardShownPadding + offset
		: keyboardHidePadding;

	return (
		<View style={[ 
			style, 
			{ paddingBottom }
		]}>
			{children}
		</View>
	);
};