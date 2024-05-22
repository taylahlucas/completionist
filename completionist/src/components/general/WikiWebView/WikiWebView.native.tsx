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
				originWhitelist={['*']}
				source={{ 
					uri: currentHref
				 }}
				mediaPlaybackRequiresUserAction={true}
				style={{
					backgroundColor: theme.black,
					margin: 12,
					marginTop: -4,
					borderRadius: 20,
				}}
			/>
		</WikiWebViewContainer>
	);
};

export default WikiWebView;