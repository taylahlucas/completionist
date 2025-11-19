import { User, UnAuthorizedScreenEnum } from '@utils/index';
import { useReactNavigation } from './';

export const useGetNavigationPath = () => {
  const navigation = useReactNavigation();

  const getNavigationPath = (user: User) => {
    if (!user.signup.verification) {
      navigation.navigate(UnAuthorizedScreenEnum.VerifyAccount);
    } else if (!user.signup.setUsername) {
      navigation.navigate(UnAuthorizedScreenEnum.SetUsername);
    } else if (!user.signup.selectGame) {
      navigation.navigate(UnAuthorizedScreenEnum.SelectFirstGame);
    }
  };

  return getNavigationPath;
};
