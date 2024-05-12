import React from 'react';
import useGetTheme from '@styles/hooks/useGetTheme';
import { StandardLayoutContainer } from './StandardLayoutStyledComponents.native';
import Loading from '@components/general/Loading.native';

interface StandardLayoutProps {
	children: any;
	isLoading?: boolean;
}

const StandardLayout = ({ children, isLoading = false }: StandardLayoutProps) => {
	const theme = useGetTheme();

	return (
		<StandardLayoutContainer color={theme.black}>
			{children}
			{isLoading ? <Loading /> : <></>}
		</StandardLayoutContainer>
	);
};

export default StandardLayout;