import React, { useRef } from 'react';
import LottieView from 'lottie-react-native';
import useGetTheme from '@styles/hooks/useGetTheme';
import { StandardLayoutContainer } from '@components/general/Layouts/StandardLayoutStyledComponents.native';
import LoadingAnimation from '@components/animations/LoadingAnimation.native';

const Landing = () => {
	const theme = useGetTheme();
	const animationRef = useRef<LottieView>(null);

	return (
		<StandardLayoutContainer color={theme.black}>
			<LoadingAnimation ref={animationRef} source={''} />
		</StandardLayoutContainer>
	);
};

export default Landing;