import React from 'react';
import { View } from 'react-native';

interface SpacingProps {
	height?: number;
};

const Spacing = ({ height = 16 }: SpacingProps) => {
	return (
		<View style={{ height: height }} />
	);
};

export default Spacing;