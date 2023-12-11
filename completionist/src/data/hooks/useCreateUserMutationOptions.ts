import { GraphQLMutationOptions } from '@graphql/GraphQLInterfaces';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import { ScreenEnum } from '@utils/CustomEnums';

const useCreateUserMutationOptions = (): GraphQLMutationOptions => {
  const navigation = useReactNavigation();
  const { setLoggedIn } = useMainDispatch();

  return {
    onCompleted: (response): void => {
      console.log("useCreateUserMutationOptions COMPLETED: ", response)
      navigation.navigate(ScreenEnum.Quests);
      setLoggedIn(true);
    },
    onError: (error): void => {
      console.log("useCreateUserMutationOptions ERROR: ", error.message)
      console.log("useCreateUserMutationOptions details: ", error.networkError)
      console.log("useCreateUserMutationOptions client: ", error.clientErrors)
      console.log("useCreateUserMutationOptions extra: ", error.extraInfo)
    }
  };
};

export default useCreateUserMutationOptions;
