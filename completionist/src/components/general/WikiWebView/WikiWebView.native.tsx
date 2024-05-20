import React, { useState, useRef } from 'react';
import { WebView } from 'react-native-webview';
import LottieView from 'lottie-react-native';
import { IconTypeEnum } from '@utils/CustomEnums';
import useGetTheme from '@styles/hooks/useGetTheme';
import { WikiWebViewContainer, WikiWebViewCloseButton } from './WikiWebViewStyledComponents.native';
import Condition from '../Condition.native';
import LoadingAnimation from '@components/animations/LoadingAnimation.native';

interface WikiWebViewProps {
	currentHref: string;
	setClose: () => void;
}

const WikiWebView = ({ currentHref, setClose }: WikiWebViewProps) => {
	const theme = useGetTheme();
	const animationRef = useRef<LottieView>(null);
	const [showLoading, setShowLoading] = useState<boolean>(true);

	if (!currentHref) return null;
	return (
		<WikiWebViewContainer style={{ backgroundColor: theme.darkGrey }}>
			<WikiWebViewCloseButton
				name={'cancel'}
				type={IconTypeEnum.MaterialIcons}
				color={theme.lightGrey}
				size={32}
				onPress={setClose}
			/>
			<WebView
				source={{ uri: currentHref }}
				style={{
					backgroundColor: theme.black,
					margin: 12,
					borderRadius: 20
				}}
				onLoadEnd={() => setShowLoading(false)}
			/>
			<Condition condition={showLoading}>
				<LoadingAnimation ref={animationRef} source={''} />
			</Condition>
		</WikiWebViewContainer>
	);
};

export default WikiWebView;