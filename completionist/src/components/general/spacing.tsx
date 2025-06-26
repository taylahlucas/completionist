import React from 'react';
import { View } from 'react-native';

interface SpacingProps {
	height?: number;
};

export const Spacing = ({ height = 16 }: SpacingProps) => {
	return (
		<View style={{ height: height }} />
	);
};