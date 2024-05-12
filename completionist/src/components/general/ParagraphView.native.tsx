import React from 'react';
import { View } from 'react-native';

interface ParagraphViewProps {
	children: any;
};

const ParagraphView = ({ children }: ParagraphViewProps) => {
	return (
		<View style={{ paddingRight: 8, paddingLeft: 8 }}>
			{children}
		</View>
	);
};

export default ParagraphView;