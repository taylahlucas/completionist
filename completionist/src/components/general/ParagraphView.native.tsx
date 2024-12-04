import React from 'react';
import { View } from 'react-native';

interface ParagraphViewProps {
	children: any;
};

export const ParagraphView = ({ children }: ParagraphViewProps) => {
	return (
		<View style={{ paddingRight: 8, paddingLeft: 8 }}>
			{children}
		</View>
	);
};