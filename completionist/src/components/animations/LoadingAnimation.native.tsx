import React from 'react';
import { View} from 'react-native';
import LottieView, { LottieViewProps } from 'lottie-react-native';

const LoadingAnimation = React.forwardRef<LottieView, LottieViewProps>((_, ref) => {
	return (
		<View style={{
			height: '90%',
			justifyContent: 'center',
			alignSelf: 'center'
		}}>
			<LottieView
				ref={ref}
				style={{ width: 150, height: 150 }}
				source={require('../../styles/animations/tick.json')}
				autoPlay
				loop
			/>
		</View>
	);
});

export default LoadingAnimation;