import { GraphQLMutationOptions } from '@graphql/GraphQLInterfaces';

const useCreateUserMutationOptions = (): GraphQLMutationOptions => {
  return {
    onCompleted: (response): void => {
      console.log("useCreateUserMutationOptions COMPLETED: ", response)
    },
    onError: (error): void => {
      console.log("useCreateUserMutationOptions ERROR: ", error)
    }
  };
};

export default useCreateUserMutationOptions;
