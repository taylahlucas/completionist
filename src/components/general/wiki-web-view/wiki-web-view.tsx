import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { IconTypeEnum } from '@utils/index';
import useGetTheme from '@styles/hooks/use-get-theme';
import { WikiWebViewContainer, WikiWebViewCloseButton } from './';
import { IconButton } from '../icon';

interface WikiWebViewProps {
  currentHref: string;
  setClose: () => void;
}

export const WikiWebView = ({ currentHref, setClose }: WikiWebViewProps) => {
  const webViewRef = useRef<WebView>(null);
  const theme = useGetTheme();

  const [canGoBack, setCanGoBack] = useState<boolean>(false);
  const [url, setUrl] = useState<string>('https://example.com');

  const onNavigationStateChange = (navState: WebViewNavigation) => {
    setCanGoBack(navState.canGoBack);
    if (navState.url !== url) {
      setUrl(navState.url);
    }
  };

  const onShouldStartLoadWithRequest = (request: WebViewNavigation) => {
    const { url } = request;
    if (url.includes('ads') || url.includes('tracking')) {
      return false;
    }
    return true;
  };

  const goBack = () => {
    if (webViewRef.current && canGoBack) {
      webViewRef.current.goBack();
    }
  };

  if (!currentHref) return null;
  return (
    <WikiWebViewContainer style={{ backgroundColor: theme.darkGrey }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <IconButton
          style={{ top: 12, left: 16 }}
          name="arrow-back"
          type={IconTypeEnum.Ionicons}
          color={canGoBack ? theme.lightGrey : theme.black}
          onPress={goBack}
        />
        <WikiWebViewCloseButton
          name={'cancel'}
          type={IconTypeEnum.MaterialIcons}
          color={theme.lightGrey}
          size={32}
          onPress={setClose}
        />
      </View>
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{
          uri: currentHref,
        }}
        mediaPlaybackRequiresUserAction={true}
        onNavigationStateChange={onNavigationStateChange}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
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
