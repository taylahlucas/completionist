import { useRef } from 'react';
import { DrawerActions as RNDrawerActions, ParamListBase } from '@react-navigation/routers';
import { NavigationAction, NavigationState, useNavigation, useNavigationState } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/src/types';
import { NativeNavigation } from '@utils/CustomTypes';
import { ScreenEnum } from '@utils/CustomEnums';

export const DrawerActions = RNDrawerActions;

export const useReactNavigation = (): NativeNavigation => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const screenName = useNavigationState((state) => state?.routes[state?.index].name);

  return useRef({
    navigate: (page: ScreenEnum, params?: any): void => navigation.navigate(page, params),
    dispatch: (action: NavigationAction | ((state: NavigationState) => NavigationAction)): void => navigation.dispatch(action),
    getCurrentScreenName: (): ScreenEnum | null => {
      return screenName as ScreenEnum;
    },
    goBack: (): void => navigation.goBack(),
    setOptions: (options: any): void => navigation.setOptions(options)
  }).current;
};

export default useReactNavigation;