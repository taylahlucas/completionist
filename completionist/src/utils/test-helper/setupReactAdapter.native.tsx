import React from 'react';
import 'react-native-gesture-handler/jestSetup';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import { Image, NativeModules as RNNativeModules } from 'react-native';
import * as reactNativeLocalizeMock from './reactNativeLocalizeMock.native';


interface TransProps {
	i18nKey: string;
	components: any[]
}

RNNativeModules.CameraView = {
  getConstants: jest.fn()
};

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('react-i18next', () => ({
  initReactI18next: { type: '3rdParty', init: jest.fn() },
  useTranslation: (): any => ({
    t: (key: string): string => key,
    i18n: jest.fn()
  }),
  withTranslation: () => {
    return (Component: JSX.Element): any => {
      Component.props = {
        ...Component.props,
        t: (key: string): string => key,
        i18n: jest.fn(),
        tReady: true
      };
      return Component;
    };
  },
  Trans: ({ i18nKey, components }: TransProps): React.ReactElement | string => (components?.length ? components[0] : i18nKey)
}));
// jest.spyOn(i18next, 't').mockImplementation((key: string) => key);
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
      setOptions: jest.fn()
    }),
    useNavigationState: (): any => jest.fn(),
		useFocusEffect: jest.fn()
  };
});
jest.mock('react-native-localize', () => reactNativeLocalizeMock);
