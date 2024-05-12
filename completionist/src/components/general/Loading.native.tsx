import React, { useRef } from 'react';
import LottieView from 'lottie-react-native';
import LoadingAnimation from '@components/animations/LoadingAnimation.native';
import Overlay from './Layouts/Overlay.native';

const Loading = () => {
	const animationRef = useRef<LottieView>(null);

	return (
		<Overlay>
			<LoadingAnimation ref={animationRef} source={''} />
		</Overlay>
	);
};

export default Loading;