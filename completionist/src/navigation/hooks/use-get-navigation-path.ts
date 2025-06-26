import { UnauthorizedScreenEnum } from '@utils/custom-enums';
import { User } from '@utils/index';
import { useReactNavigation } from '.';

export const useGetNavigationPath = () => {
  const navigation = useReactNavigation();

  const getAuthNavigationPath = (user: User) => {
    if (!user.signup.verification) {
      navigation.navigate(UnauthorizedScreenEnum.VerifyAccount);
    } else if (!user.signup.setUsername) {
      navigation.navigate(UnauthorizedScreenEnum.SetUsername);
    } else if (!user.signup.selectGame) {
      navigation.navigate(UnauthorizedScreenEnum.SelectFirstGame);
    }
  };

  return getAuthNavigationPath;
};
