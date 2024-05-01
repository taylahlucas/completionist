import React from 'react';
import { View } from 'react-native';
import useGetTheme from '@styles/hooks/useGetTheme';
import { StandardLayoutContainer } from './StandardLayoutStyledComponents.native';

interface StandardLayoutProps {
	children: any;
}

const StandardLayout = ({ children }: StandardLayoutProps) => {
	const theme = useGetTheme();

	return (
		<StandardLayoutContainer color={theme.black}>
			{children}
		</StandardLayoutContainer>
	);
};

export default StandardLayout;