import React from 'react';
import { KeyboardAvoidingView } from 'react-native';

interface KeyboardAvoidingScrollViewProps {
	children: JSX.Element;
}

const KeyboardAvoidingScrollView = ({ children }: KeyboardAvoidingScrollViewProps) => {
	return (
		<KeyboardAvoidingView 
			style={{ flex: 1, alignItems: 'center' }}
			behavior="height"
			keyboardVerticalOffset={10}
		>
			{children}
		</KeyboardAvoidingView>
	);
};

export default KeyboardAvoidingScrollView;