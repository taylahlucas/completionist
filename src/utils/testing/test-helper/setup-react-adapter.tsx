import React from 'react';
import 'react-native-gesture-handler/jestSetup';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import { Image, NativeModules as RNNativeModules } from 'react-native';
import * as reactNativeLocalizeMock from './react-native-localize-mock';
import common from '../../../../translations/en/common.json';

RNNativeModules.CameraView = {
  getConstants: jest.fn(),
};

jest.useFakeTimers();
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
// Translations
jest.mock('react-i18next', () => {
  const t = (key: string): string => {
    const keys = key.replace('common:', '').split('.');

    const translations: any = common;
    let translation;
    for (const k of keys) {
      translation = translations?.[k];
      if (!translation) return key;
    }

    return translation;
  };

  return {
    useTranslation: () => ({
      t,
      i18n: {
        changeLanguage: jest.fn(),
      },
    }),
    Trans: ({ i18nKey }: { i18nKey: string }) => t(i18nKey),
    initReactI18next: {
      type: '3rdParty',
      init: jest.fn(),
    },
    withTranslation: () => (Component: any) => {
      Component.defaultProps = {
        ...(Component.defaultProps || {}),
        t,
        i18n: { changeLanguage: jest.fn() },
      };
      return Component;
    },
  };
});
jest
  .spyOn(Image, 'resolveAssetSource')
  .mockImplementation(jest.fn())
  .mockReturnValue({ uri: '' } as any);
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: (): any => ({
      navigate: jest.fn(),
      replace: jest.fn(),
      getParent: jest.fn(),
      dispatch: jest.fn(),
      goBack: jest.fn(),
      backToFirstScreen: jest.fn(),
      getCurrentPageName: jest.fn(),
      setOptions: jest.fn(),
    }),
    useNavigationState: (): any => jest.fn(),
    useFocusEffect: jest.fn(),
  };
});
jest.mock('react-native-localize', () => reactNativeLocalizeMock);
jest.mock('react-native-webview', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { View } = require('react-native');
  return {
    WebView: (props: any) => <View {...props} />,
  };
});
jest.mock('@stripe/stripe-react-native', () => {
  return {
    StripeProvider: ({ children }: { children: React.ReactNode }) => children,
    useStripe: () => ({
      initPaymentSheet: jest.fn(),
      presentPaymentSheet: jest.fn(),
    }),
  };
});
